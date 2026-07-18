"use client";

import { Mail, MessageSquare, Clock, MapPin, Shield, Star } from "lucide-react";
import HeaderPage from "../header/page";
import FooterPage from "../footer/page";
import EnquiryForm from "@/components/EnquiryForm";

export default function ContactUsPage() {
  const CONTACT_INFO = [
    {
      icon: Mail,
      title: "Direct Email support",
      value: "st7groupofcompanies@gmail.com",
      description: "For customized collegiate proposals, bulk corporate licenses, or custom syllabus requirements.",
      link: "mailto:st7groupofcompanies@gmail.com",
    },
    {
      icon: MessageSquare,
      title: "WhatsApp Security Desk",
      value: "+91 80190 02701",
      description: "Open for general query resolutions, registration confirmations, and technical assistance.",
      link: "https://wa.me/918019002701",
    },
    {
      icon: Clock,
      title: "Operational Hours",
      value: "Mon - Sat: 9:00 AM - 6:30 PM",
      description: "Our security mentors and support staffs are actively responsive during standard operating hours.",
    },
    {
      icon: MapPin,
      title: "Corporate Headquarters",
      value: "ST7 Group, Vadodara, Gujarat, India",
      description: "Driving digital resilience, products, and authorized educational seminars.",
    },
    {
      icon: MapPin,
      title: "South Headquarters",
      value: "ST7 Group, Hyderabad, Telangana, India",
      description: "Driving digital products, and authorized educational seminars.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#050816] text-[#E2E8F0] overflow-x-hidden">
      {/* Header */}
      <HeaderPage />

      {/* Main Content */}
      <main className="flex-grow pt-10 pb-24">
        
        {/* Page title / Hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/20 text-[#00E5FF] text-xs font-semibold uppercase tracking-widest">
            <Shield className="w-3.5 h-3.5" />
            Security Response Desk
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold tracking-tight text-white">
            Connect With Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#2563EB] to-[#8B5CF6]">Security Coordinators</span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#94A3B8] font-medium leading-relaxed">
            Have questions about upcoming academic bootcamps, corporate training, or physical hacking labs? Get in touch with our team powered by St7 Group.
          </p>
        </div>

        {/* Two-Column Form & Info Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
          
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#00E5FF]/5 blur-[120px] pointer-events-none" />

          {/* Left Column: Info cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Star className="w-5 h-5 text-[#00E5FF] fill-[#00E5FF]/10" />
                Trustworthy Communications
              </h2>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                As a subsidiary of St7 Group, we uphold the highest standards of data integrity and transparency. Your information is strictly used to process your requested cybersecurity training details.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              {CONTACT_INFO.map((item, idx) => {
                const IconComponent = item.icon;
                const CardWrapper = item.link ? "a" : "div";

                return (
                  <CardWrapper
                    key={idx}
                    href={item.link}
                    target={item.link ? "_blank" : undefined}
                    rel={item.link ? "noopener noreferrer" : undefined}
                    className={`block p-5 rounded-xl border border-white/[0.04] bg-[#0A0D1E]/40 ${
                      item.link 
                        ? "hover:border-[#00E5FF]/30 hover:bg-[#0A0D1E]/80 transition-all duration-300 cursor-pointer" 
                        : ""
                    }`}
                  >
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-center text-[#00E5FF] shrink-0">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm font-bold text-white">{item.title}</h3>
                        <p className={`text-sm font-semibold ${item.link ? "text-[#00E5FF]" : "text-[#E2E8F0]"}`}>
                          {item.value}
                        </p>
                        <p className="text-xs text-[#94A3B8] leading-relaxed pt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </CardWrapper>
                );
              })}
            </div>
          </div>

          {/* Right Column: Direct Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl bg-gradient-to-b from-[#0F172A]/90 to-[#0A0D1E]/95 border border-white/[0.08] shadow-2xl relative overflow-hidden flex flex-col justify-between h-full">
              {/* Corner ambient glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#00E5FF]/5 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-6">
                <div className="w-12 h-12 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/20 flex items-center justify-center text-[#00E5FF]">
                  <MessageSquare className="w-6 h-6" />
                </div>

                <div className="space-y-3">
                  <h2 className="text-2xl font-bold text-white tracking-tight">Interactive Secure Enquiry</h2>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    Our digital coordinator is ready to assist you. Submit your info directly below to compile your request and instantly launch formatted WhatsApp support.
                  </p>
                </div>

                <div className="pt-2">
                  <EnquiryForm />
                </div>
              </div>
            </div>
          </div>

        </div>

      </main>

      {/* Footer */}
      <FooterPage />
    </div>
  );
}
