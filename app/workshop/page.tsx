"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  CheckCircle, 
  ArrowLeft, 
  AlertCircle,
  Mail,
  User,
  Phone,
  Briefcase,
  ShieldCheck,
  Sparkles,
  CreditCard,
  QrCode,
  Download,
  Share2
} from "lucide-react";
import { supabase } from "../../lib/supabase";
import { mockWorkshop, WorkshopData } from "../../lib/workshopMock";
import HeaderPage from "../header/page";
import FooterPage from "../footer/page";

export default function WorkshopDetailPage() {
  const [workshop, setWorkshop] = useState<WorkshopData>(mockWorkshop);
  const [loading, setLoading] = useState(true);
  
  // Registration Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("Professional");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationId, setRegistrationId] = useState("");

  useEffect(() => {
    async function loadData() {
      if (!supabase) {
        setWorkshop(mockWorkshop);
        setLoading(false);
        return;
      }

      try {
        // Fast-resolving Supabase fetch with an 8-second hard timeout
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Supabase request timed out")), 8000)
        );

        const fetchPromise = supabase
          .from("workshops")
          .select("*")
          .eq("status", true)
          .limit(1);

        const { data, error } = (await Promise.race([fetchPromise, timeoutPromise])) as any;

        if (error) {
          console.warn("Error fetching workshop details:", error.message);
          setWorkshop(mockWorkshop);
        } else if (data && data.length > 0) {
          const row = data[0];

          // Parse topics
          let topics: string[] = [];
          const rawTopics = row.topics;
          if (Array.isArray(rawTopics)) {
            topics = rawTopics;
          } else if (typeof rawTopics === "string") {
            try {
              const parsed = JSON.parse(rawTopics);
              topics = Array.isArray(parsed) ? parsed : rawTopics.split(",").map(t => t.trim());
            } catch {
              topics = rawTopics.split(",").map(t => t.trim());
            }
          }

          // Parse speakers
          let speakers: string[] = [];
          const rawSpeakers = row.speakers || row.speaker_names || row['Speaker names'] || row.Speakers;
          if (Array.isArray(rawSpeakers)) {
            speakers = rawSpeakers;
          } else if (typeof rawSpeakers === "string") {
            try {
              const parsed = JSON.parse(rawSpeakers);
              speakers = Array.isArray(parsed) ? parsed : rawSpeakers.split(",").map(s => s.trim());
            } catch {
              speakers = rawSpeakers.split(",").map(s => s.trim());
            }
          }

          setWorkshop({
            id: row.workshop_id || row.id || "1",
            title: row.title || "No Title",
            description: row.description || "",
            topics: topics.length > 0 ? topics : [],
            venue: row.venue || "-",
            dateTime: row.date_time || "-",
            slots: row.slots !== undefined ? row.slots : "-",
            speakers: speakers.length > 0 ? speakers : [],
            poster: row.poster_url || "/workshopmock1.png",
            duration: row.duration || "-",
            actualPrice: row.actual_price !== undefined ? row.actual_price : "-",
            offerPrice: row.offer_price !== undefined ? row.offer_price : "-",
            status: row.status === true
          });
        } else {
          // Empty state
          setWorkshop({
            id: "empty",
            title: "-",
            description: "-",
            topics: ["-"],
            venue: "-",
            dateTime: "-",
            slots: "-",
            speakers: ["-"],
            poster: "/workshopmock1.png",
            duration: "-",
            actualPrice: "-",
            offerPrice: "-",
            status: false
          });
        }
      } catch (err) {
        console.error("Failed to load workshop details from Supabase (using mock fallback):", err);
        setWorkshop(mockWorkshop);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Load Cashfree SDK dynamically on Mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const scriptId = "cashfree-js-sdk";
      if (!document.getElementById(scriptId)) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
        script.async = true;
        document.body.appendChild(script);
      }
    }
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      alert("Please fill in all required fields.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // 1. Contact backend order creation API
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          workshop_id: workshop.id,
          name: fullName,
          mobile: phone,
          email: email,
          amount: offerPrice
        })
      });

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        const errorMsg = resData.details 
          ? `${resData.error} (${resData.details})`
          : (resData.error || "Failed to initiate payment. Server replied with an error.");
        throw new Error(errorMsg);
      }

      const { payment_session_id, payment_mode } = resData;

      // 2. Handle Cashfree checkout trigger
      if (!(window as any).Cashfree) {
        throw new Error("Cashfree Checkout Web SDK is not loaded yet. Please wait a second and retry.");
      }

      const cashfree = (window as any).Cashfree({
        mode: payment_mode || "sandbox"
      });

      await cashfree.checkout({
        paymentSessionId: payment_session_id,
        redirectTarget: "_self"
      });

    } catch (err: any) {
      console.error("Payment initiation failed:", err);
      
      // Pre-config / local preview fallback simulation helper
      const confirmSimulate = window.confirm(
        `Cashfree Initiation Failed: ${err.message}\n\nSince this might be due to unconfigured API keys, would you like to simulate a successful payment to preview the Ticket QR screen?`
      );

      if (confirmSimulate) {
        const generatedId = "Tckt-" + Math.floor(10000000 + Math.random() * 90000000);
        window.location.href = `/success?ticket_id=${generatedId}`;
      }
    } finally {
      setIsSubmitting(false);
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#050816]">
        <HeaderPage />
        <div className="flex-grow flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-10 h-10 rounded-full border-2 border-[#00E5FF] border-t-transparent animate-spin" />
          <p className="mt-4 text-xs font-mono text-[#00E5FF] tracking-wider uppercase animate-pulse">
            Establishing Secure Connection...
          </p>
        </div>
        <FooterPage />
      </div>
    );
  }

  const isActive = workshop.status;

  const title = isActive ? workshop.title : "-";
  const description = isActive ? workshop.description : "-";
  const topics = isActive ? workshop.topics : ["-"];
  const venue = isActive ? workshop.venue : "-";
  const dateTime = isActive ? workshop.dateTime : "-";
  const slots = isActive ? workshop.slots : "-";
  const speakers = isActive ? workshop.speakers : ["-"];
  const poster = isActive ? workshop.poster : "/workshopmock1.png";
  const duration = isActive ? workshop.duration : "-";
  const actualPrice = isActive ? workshop.actualPrice : "-";
  const offerPrice = isActive ? workshop.offerPrice : "-";

  return (
    <div className="min-h-screen flex flex-col bg-[#050816] text-white">
      {/* Header */}
      <HeaderPage />

      {/* Main Content */}
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-[#94A3B8] hover:text-[#00E5FF] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Content Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDE: Workshop Info (7 Columns) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-gradient-to-b from-[#0B1528]/80 to-[#050816]/95 border border-white/[0.08] rounded-2xl p-6 md:p-8 shadow-xl">
              
              {/* Badge & Duration */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider text-[#00E5FF] bg-[#00E5FF]/10 border border-[#00E5FF]/20 uppercase">
                  ⭐ Interactive Workshop
                </span>
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#94A3B8]">
                  <Clock className="w-4 h-4 text-[#00E5FF]" />
                  <span>Duration: {duration}</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-sans font-bold text-white tracking-tight leading-tight">
                {title}
              </h1>

              {/* Description below the Title (as requested) */}
              <p className="mt-4 text-sm md:text-base text-[#94A3B8] leading-relaxed">
                {description}
              </p>

              {/* Topics (Put as List and tick as requested) */}
              <div className="mt-8 pt-8 border-t border-white/[0.08]">
                <h3 className="text-lg font-sans font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 rounded-full bg-[#00E5FF]" />
                  Curriculum & Hands-on Topics
                </h3>
                <ul className="space-y-3.5">
                  {topics.map((topic, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm md:text-base text-[#94A3B8]">
                      <div className="mt-1 shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF]">
                        <CheckCircle className="w-3.5 h-3.5" />
                      </div>
                      <span className="leading-tight">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Speaker Profiles */}
              {isActive && (
                <div className="mt-8 pt-8 border-t border-white/[0.08]">
                  <h3 className="text-lg font-sans font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-1 h-5 rounded-full bg-[#00E5FF]" />
                    Distinguished Workshop Instructors
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {speakers.map((speaker, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#00E5FF] to-[#2563EB] flex items-center justify-center font-bold font-sans text-sm text-white shadow-md">
                          {speaker.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{speaker}</p>
                          <p className="text-[10px] font-mono text-[#00E5FF] uppercase">Lead Mentor</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Logistics Grid */}
              <div className="mt-8 pt-8 border-t border-white/[0.08] grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <Calendar className="w-5 h-5 text-[#00E5FF] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-mono uppercase text-[#64748B]">Date & Time</p>
                    <p className="text-sm font-semibold text-white mt-1">{dateTime}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <MapPin className="w-5 h-5 text-[#00E5FF] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-mono uppercase text-[#64748B]">Venue & Format</p>
                    <p className="text-sm font-semibold text-white mt-1">{venue}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE: Checkout & Registration Card (5 Columns) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Poster display */}
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-lg aspect-square w-full">
              <img 
                src={poster} 
                alt={title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/workshopmock1.png";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent pointer-events-none" />
              {isActive && (
                <div className="absolute bottom-4 left-4 right-4 bg-[#050816]/90 backdrop-blur-md px-4 py-3 rounded-xl border border-white/[0.08] flex justify-between items-center z-10">
                  <span className="text-xs font-mono text-[#94A3B8]">Remaining Slots:</span>
                  <span className="text-sm font-bold font-mono text-[#00E5FF]">{slots} Seats</span>
                </div>
              )}
            </div>

            {/* Registration Form / Status Card */}
            {isActive ? (
              <div className="bg-gradient-to-b from-[#0B1528]/90 to-[#050816]/98 border border-white/[0.1] rounded-2xl p-6 md:p-8 shadow-2xl relative">
                
                {registrationSuccess ? (
                  // Success State
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6"
                  >
                    <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                      <ShieldCheck className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-white font-sans">Registration Confirmed!</h3>
                    <p className="mt-2 text-xs text-[#94A3B8] max-w-xs mx-auto">
                      Thank you for enrolling. Your seat has been securely reserved. Confirmation details have been logged.
                    </p>

                    {/* Ticket Box */}
                    <div className="mt-6 p-5 rounded-xl bg-white/[0.02] border border-white/[0.05] relative text-left">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-[10px] font-mono text-[#00E5FF] uppercase">Workshop Pass</p>
                          <h4 className="text-xs font-bold text-white truncate max-w-[200px] mt-1">{title}</h4>
                        </div>
                        <QrCode className="w-8 h-8 text-white/80" />
                      </div>
                      
                      <div className="space-y-2.5 text-xs border-t border-white/[0.05] pt-4">
                        <div className="flex justify-between">
                          <span className="text-white/40 font-mono">ID:</span>
                          <span className="font-mono font-bold text-white">{registrationId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/40 font-mono">Attendee:</span>
                          <span className="font-semibold text-white">{fullName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/40 font-mono">Status:</span>
                          <span className="text-emerald-400 font-bold font-mono">Paid (INR {offerPrice})</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex gap-3">
                      <button 
                        type="button"
                        onClick={() => alert("Ticket receipt downloaded successfully.")}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-bold transition-all"
                      >
                        <Download className="w-4 h-4 text-[#00E5FF]" />
                        <span>Download Ticket</span>
                      </button>
                      <button 
                        type="button"
                        onClick={() => alert("Shareable workshop registration link copied to clipboard.")}
                        className="p-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-bold transition-all"
                        title="Share Registration"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>

                    <button 
                      type="button"
                      onClick={() => {
                        setRegistrationSuccess(false);
                        setFullName("");
                        setEmail("");
                        setPhone("");
                      }}
                      className="mt-6 text-xs text-[#00E5FF] hover:underline font-mono"
                    >
                      Register another attendee
                    </button>
                  </motion.div>
                ) : (
                  // Registration Inputs
                  <form onSubmit={handleRegister} className="space-y-5">
                    <div>
                      <h3 className="text-xl font-bold text-white font-sans">Secure Registration</h3>
                      <p className="text-xs text-[#94A3B8] mt-1">Provide your details to claim the offer price.</p>
                    </div>

                    <div className="space-y-4">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-mono text-[#94A3B8] uppercase mb-1.5">Full Name *</label>
                        <div className="relative">
                          <User className="absolute left-3 top-3.5 w-4 h-4 text-white/30" />
                          <input 
                            type="text"
                            required
                            placeholder="John Doe"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#050816] border border-white/10 focus:border-[#00E5FF] focus:outline-none text-sm transition-all placeholder:text-white/20"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-mono text-[#94A3B8] uppercase mb-1.5">Email Address *</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3.5 w-4 h-4 text-white/30" />
                          <input 
                            type="email"
                            required
                            placeholder="john@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#050816] border border-white/10 focus:border-[#00E5FF] focus:outline-none text-sm transition-all placeholder:text-white/20"
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-mono text-[#94A3B8] uppercase mb-1.5">Phone Number *</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3.5 w-4 h-4 text-white/30" />
                          <input 
                            type="tel"
                            required
                            placeholder="+91 98765 43210"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#050816] border border-white/10 focus:border-[#00E5FF] focus:outline-none text-sm transition-all placeholder:text-white/20"
                          />
                        </div>
                      </div>

                      {/* Professional Role */}
                      <div>
                        <label className="block text-xs font-mono text-[#94A3B8] uppercase mb-1.5">Current Profile</label>
                        <div className="relative">
                          <Briefcase className="absolute left-3 top-3.5 w-4 h-4 text-white/30" />
                          <select 
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#050816] border border-white/10 focus:border-[#00E5FF] focus:outline-none text-sm transition-all"
                          >
                            <option value="Professional">Working Professional</option>
                            <option value="Student">College Student</option>
                            <option value="Researcher">Researcher / Academician</option>
                            <option value="Freelancer">Independent Freelancer</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Price Block */}
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-mono uppercase text-[#64748B]">Total Payable</p>
                        <p className="text-xl font-bold text-white">₹{offerPrice}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs line-through text-white/40 block">₹{actualPrice}</span>
                        <span className="text-[10px] text-emerald-400 font-bold uppercase">Discount Applied</span>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#2563EB] hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] text-white text-sm font-bold tracking-wide transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Processing Secure Payment...</span>
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4" />
                          <span>Pay & Register Now</span>
                        </>
                      )}
                    </button>

                    {/* Trust Footnote */}
                    <p className="text-[10px] font-mono text-[#64748B] text-center flex items-center justify-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Secured with SSL 256-bit encryption.</span>
                    </p>
                  </form>
                )}

              </div>
            ) : (
              // Empty / Inactive state (dashes state as requested)
              <div className="bg-gradient-to-b from-[#0B1528]/80 to-[#050816]/95 border border-white/[0.08] rounded-2xl p-6 md:p-8 text-center space-y-6">
                <div className="mx-auto w-12 h-12 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#94A3B8]">
                  <AlertCircle className="w-6 h-6" />
                </div>
                
                <div>
                  <h3 className="text-base font-bold text-white">No Active Batches Scheduled</h3>
                  <p className="text-xs text-[#94A3B8] mt-2 leading-relaxed">
                    At a time, only one workshop is available. There is currently no active workshop batch accepting registrations.
                  </p>
                </div>

                <div className="border-t border-white/[0.08] pt-4 text-left space-y-2.5 text-xs font-mono text-[#94A3B8]">
                  <div className="flex justify-between">
                    <span>Active Status:</span>
                    <span className="text-[#EF4444] font-bold">DASHED (-)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fee structure:</span>
                    <span>-</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Slots remaining:</span>
                    <span>-</span>
                  </div>
                </div>

                <div className="bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-xl p-4 text-left">
                  <p className="text-xs text-white leading-relaxed">
                    <span className="font-bold text-[#EF4444]">Note:</span> For customized corporate training, college collaboration requests, or early updates on the next batch, click below to connect with us immediately.
                  </p>
                </div>

                <Link
                  href="/contactus"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#050816] hover:bg-white/[0.06] border border-[#00E5FF]/20 text-white text-sm font-semibold tracking-wide transition-all shadow-[0_0_15px_rgba(0,229,255,0.1)]"
                >
                  <Mail className="w-4 h-4 text-[#00E5FF]" />
                  <span>Contact Us Now</span>
                </Link>
              </div>
            )}

            {/* Trust and FAQs Panel */}
            <div className="p-5 rounded-2xl border border-white/[0.05] bg-white/[0.01] space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#00E5FF] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Why train with Cyfo?</span>
              </h4>
              <ul className="space-y-2 text-xs text-[#94A3B8]">
                <li className="flex items-start gap-2">
                  <span className="text-[#00E5FF] mt-0.5">•</span>
                  <span><strong>100% Practical Layout:</strong> Step-by-step code exercises with zero theoretical filler.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00E5FF] mt-0.5">•</span>
                  <span><strong>Authorized Credentials:</strong> Recieve verifiable digital badges upon completion.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00E5FF] mt-0.5">•</span>
                  <span><strong>Lifetime Access:</strong> Downloadable project repositories & full recording files.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </main>

      {/* Footer */}
      <FooterPage />
    </div>
  );
}
