"use client";

import { Award, Calendar, Star, ShieldCheck, BadgeCheck, MessageSquare, ArrowRight, Sparkles, BookOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import HeaderPage from "../header/page";
import FooterPage from "../footer/page";
import { SPEAKERS_DATA } from "../../components/OurSpeakersSection";

export default function SpeakersPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#050816] text-[#E2E8F0] overflow-x-hidden">
      {/* Header */}
      <HeaderPage />

      {/* Main Content */}
      <main className="flex-grow">
        
        {/* Page Hero */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-white/[0.04]">
          {/* Ambient lighting spots */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[40rem] h-[30rem] rounded-full bg-gradient-to-tr from-[#00E5FF]/5 to-[#8B5CF6]/5 blur-[130px] pointer-events-none" />
          
          <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/20 text-[#00E5FF] text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 fill-[#00E5FF]/20 text-[#00E5FF]" />
              Industry Trailblazers
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-sans font-extrabold tracking-tight text-white leading-tight">
              Meet Our Eminent <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#2563EB] to-[#8B5CF6]">
                Cybersecurity Speakers
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-2xl mx-auto">
              Our live workshops and premium seminars are led by certified security practitioners, digital developers, and corporate educators who have solved real threats at enterprise scale.
            </p>
          </div>
        </section>

        {/* Highlight Speaker Row (Surya Teja) */}
        <section className="py-16 bg-[#0A0D1E]/40 border-b border-white/[0.04] relative">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-[#00E5FF] mb-8 text-center sm:text-left">Keynote & Executive Host</h2>
            
            {/* Spotlight Card */}
            <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-[#0F172A]/90 to-[#0A0D1E]/95 border border-[#00E5FF]/30 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#00E5FF]/10 via-transparent to-transparent pointer-events-none" />
              
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
                {/* Photo Container */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-[#00E5FF] via-[#2563EB] to-[#8B5CF6] p-0.5 shrink-0 shadow-[0_0_20px_rgba(0,229,255,0.25)]">
                  <div className="relative w-full h-full bg-[#050816] rounded-[14px] overflow-hidden">
                    <Image
                      src={SPEAKERS_DATA[0].image}
                      alt={SPEAKERS_DATA[0].name}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                <div className="space-y-4 flex-grow text-center md:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center justify-center md:justify-start gap-2">
                        <h3 className="text-2xl font-bold text-white">Surya Teja</h3>
                        <BadgeCheck className="w-5.5 h-5.5 text-[#00E5FF] fill-[#00E5FF]/10" />
                      </div>
                      <p className="text-sm font-semibold text-[#00E5FF]">{SPEAKERS_DATA[0].designation}</p>
                    </div>
                    {/* Badge */}
                    <div className="inline-flex self-center sm:self-auto items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Featured Keynote
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
                    {SPEAKERS_DATA[0].description}
                  </p>

                  <div className="pt-2 grid grid-cols-2 sm:flex sm:flex-wrap gap-6 text-sm">
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-white font-medium bg-white/[0.02] border border-white/[0.06] py-1.5 px-3.5 rounded-lg">
                      <Award className="w-4.5 h-4.5 text-[#00E5FF]" />
                      <span>{SPEAKERS_DATA[0].experience} Practice</span>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-white font-medium bg-white/[0.02] border border-white/[0.06] py-1.5 px-3.5 rounded-lg">
                      <Calendar className="w-4.5 h-4.5 text-[#2563EB]" />
                      <span>{SPEAKERS_DATA[0].sessionsConducted} Sessions Delivered</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* All Speakers Grid */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center space-y-3 mb-16">
            <h2 className="text-3xl font-bold text-white">Our Complete Roster</h2>
            <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl mx-auto">
              Dynamic mentors certified in practical cloud defenses, deep cryptography, reverse-engineering, and compliance regulations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SPEAKERS_DATA.map((speaker, index) => (
              <div 
                key={index}
                className="group relative p-6 rounded-2xl bg-gradient-to-b from-[#0F172A]/80 to-[#0A0D1E]/95 border border-white/[0.05] hover:border-[#00E5FF]/20 transition-all duration-300 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden p-[1px] bg-gradient-to-tr from-[#00E5FF] to-[#2563EB] shrink-0">
                      <div className="relative w-full h-full bg-[#050816] rounded-[11px] overflow-hidden">
                        <Image
                          src={speaker.image}
                          alt={speaker.name}
                          fill
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-sans font-bold text-base text-white group-hover:text-[#00E5FF] transition-colors duration-200">
                          {speaker.name}
                        </h3>
                        {index === 0 && (
                          <BadgeCheck className="w-4 h-4 text-[#00E5FF] fill-[#00E5FF]/10" />
                        )}
                      </div>
                      <p className="text-xs text-[#94A3B8] font-medium leading-tight mt-0.5">
                        {speaker.designation}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">
                    {speaker.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.04] grid grid-cols-2 gap-4">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#64748B] flex items-center gap-1">
                      <Award className="w-3 h-3 text-[#00E5FF]" />
                      Experience
                    </span>
                    <p className="text-sm font-bold text-white">
                      {speaker.experience}
                    </p>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#64748B] flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#2563EB]" />
                      Sessions
                    </span>
                    <p className="text-sm font-bold text-white">
                      {speaker.sessionsConducted}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to action section */}
        <section className="max-w-4xl mx-auto px-4 pb-24 text-center space-y-8">
          <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-b from-[#0F172A]/80 to-[#0A0D1E]/95 border border-white/[0.08] relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#00E5FF]/5 rounded-full blur-3xl pointer-events-none" />
            
            <h2 className="text-2xl font-bold text-white mb-3">Want to invite our speakers or enroll?</h2>
            <p className="text-[#94A3B8] text-sm md:text-base max-w-xl mx-auto mb-8">
              Engage our security team for custom institutional workshops, authorized technical compliance panels, or register for upcoming defense modules.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Primary Action */}
              <a
                href="/workshop"
                // target="_blank"
                // rel="noopener noreferrer"
                className="w-full sm:w-auto relative group p-[1px] rounded-xl bg-gradient-to-r from-[#00E5FF] via-[#2563EB] to-[#8B5CF6] text-white font-bold text-base tracking-wide shadow-[0_0_20px_rgba(0,229,255,0.25)] hover:shadow-[0_0_35px_rgba(0,229,255,0.5)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
              >
                <div className="px-8 py-3.5 bg-zinc-950/90 rounded-[11px] group-hover:bg-transparent transition-all duration-300 flex items-center justify-center gap-2">
                  <span className="relative z-10 flex items-center gap-2 text-white">
                    Register For Workshop <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </a>

              {/* Secondary Action */}
              <a
                href="https://wa.me/918341330784"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto relative group p-[1px] rounded-xl bg-white/[0.08] hover:bg-gradient-to-r hover:from-[#00E5FF]/50 hover:to-[#2563EB]/50 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
              >
                <div className="px-8 py-3.5 bg-[#050816]/95 hover:bg-[#050816]/60 rounded-[11px] flex items-center justify-center gap-2 text-white font-semibold text-base transition-all duration-300">
                  <MessageSquare className="w-5 h-5 text-[#22C55E] fill-[#22C55E]/10 group-hover:scale-110 transition-transform duration-300" />
                  <span>Enquiry</span>
                </div>
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <FooterPage />
    </div>
  );
}
