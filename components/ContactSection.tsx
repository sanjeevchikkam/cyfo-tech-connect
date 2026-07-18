"use client";

import { Mail, MessageSquare, Shield, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import EnquiryForm from "./EnquiryForm";

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-20 bg-[#050816] overflow-hidden border-t border-white/[0.04]">
      {/* Dynamic atmospheric grid & light glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[40rem] h-[30rem] rounded-full bg-gradient-to-t from-[#2563EB]/5 to-[#00E5FF]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Content column */}
          <div className="lg:col-span-5 flex flex-col justify-between py-2">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/20 text-[#00E5FF] text-xs font-semibold uppercase tracking-widest">
                <Shield className="w-3.5 h-3.5" />
                Get In Touch
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-white leading-tight">
                Secure Your Seat <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#2563EB] to-[#8B5CF6]">
                  With ST7 Coordinators
                </span>
              </h2>

              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed max-w-md">
                Have specific queries regarding university alignments, customized offline lab sessions, or product deployments? Submit your interest to instantly initiate a formatted WhatsApp dialogue.
              </p>

              {/* Directly helpful contact metadata card */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-4 max-w-md">
                <div className="flex gap-3 text-left">
                  <Mail className="w-5 h-5 text-[#00E5FF] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">Direct Support Email</h4>
                    <a href="mailto:st7groupofcompanies@gmail.com" className="text-sm text-[#00E5FF] font-semibold hover:underline">
                      st7groupofcompanies@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-3 text-left">
                  <Clock className="w-5 h-5 text-[#8B5CF6] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">Fast Response Window</h4>
                    <p className="text-xs text-[#94A3B8]">
                      Mon - Sat: 9:00 AM - 6:30 PM (IST)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Link to full contact page */}
            <div className="pt-8 lg:pt-0">
              <Link
                href="/contactus"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-[#00E5FF] hover:text-white transition-colors duration-300"
              >
                Go to Dedicated Contact Page
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Form column */}
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

      </div>
    </section>
  );
}
