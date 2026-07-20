"use client";

import { MessageSquare, ArrowRight, Compass, Calendar, Shield, Award, Sparkles } from "lucide-react";
import HeaderPage from "../header/page";
import FooterPage from "../footer/page";

const ROW_1 = [
  { src: "/gallery01.jpg", title: "University Lab Bootcamp", location: "Vadodara" },
  { src: "/gallery02.jpg", title: "Ai-ML Cyber Workshop", location: "Hyderabad" },
  { src: "/gallery03.jpg", title: "Collegiate Cyber-Range CTF", location: "Vadodara" },
  { src: "/gallery04.jpg", title: "CTF Victory & Certification", location: "Vadodara" },
  { src: "/gallery05.jpg", title: "Live Threat Intel Seminar", location: "Hyderabad" },
  { src: "/gallery11.jpg", title: "College Workshop", location: "Vadodara" },
];

const ROW_2 = [
  { src: "/gallery10.jpg", title: "Cyberdevx Workshop", location: "Hyderabad" },
  { src: "/gallery09.jpg", title: "Interactive Career Seminar", location: "Hyderabad" },
  { src: "/gallery08.jpg", title: "Penetration Testing Audit", location: "Vadodara" },
  { src: "/gallery07.jpg", title: "Exploit Coding Lab", location: "Hyderabad" },
  { src: "/gallery06.jpg", title: "Cyber Security Command Center", location: "Hyderabad" },
  { src: "/gallery11.jpg", title: "College Workshop", location: "Vadodara" },
];

const ROW_3 = [
  { src: "/gallery03.jpg", title: "Collegiate Cyber-Range CTF", location: "Hyderabad" },
  { src: "/gallery05.jpg", title: "Live Threat Intel Seminar", location: "Vadodara" },
  { src: "/gallery12.jpg", title: "Hardware Security & IoT Lab", location: "vadodara" },
  { src: "/gallery11.jpg", title: "College Workshop", location: "Vadodara" },
  { src: "/gallery02.jpg", title: "Ai-ML Cyber Workshop", location: "Hyderabad" },
  { src: "/gallery10.jpg", title: "LCyberdevx Workshop", location: "Hyderabad" },
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#050816] text-[#E2E8F0] overflow-x-hidden">
      {/* Premium Header */}
      <HeaderPage />

      {/* Main Content */}
      <main className="flex-grow pt-8 pb-20">
        
        {/* Gallery Hero Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/20 text-[#00E5FF] text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            Live Workshop Gallery
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold tracking-tight text-white">
            Digital Defense <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#2563EB] to-[#8B5CF6]">In Action</span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#94A3B8] font-medium leading-relaxed">
            Take a visual tour inside our hands-on ethical hacking bootcamps, physical hardware analysis labs, and intensive cyber defense training programs across major Indian tech hubs.
          </p>
        </div>

        {/* Scrolling rows container with spacing and radial mask to blend edges */}
        <div className="relative space-y-8 my-10 py-4 overflow-hidden before:absolute before:left-0 before:top-0 before:bottom-0 before:w-20 sm:before:w-40 before:bg-gradient-to-r before:from-[#050816] before:to-transparent before:z-20 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-20 sm:after:w-40 after:bg-gradient-to-l after:from-[#050816] after:to-transparent after:z-20">
          
          {/* Row 1 - Left direction */}
          <div className="group/row flex flex-col gap-2">
            <div className="flex w-[200%] gap-4 animate-marquee-left group-hover/row:[animation-play-state:paused]">
              {[...ROW_1, ...ROW_1].map((img, i) => (
                <div 
                  key={i} 
                  className="relative w-[280px] sm:w-[360px] h-[180px] sm:h-[230px] rounded-xl overflow-hidden border border-white/[0.06] hover:border-[#00E5FF]/50 hover:shadow-[0_0_30px_rgba(0,229,255,0.25)] transition-all duration-300 group/img flex-shrink-0 cursor-pointer"
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/95 via-transparent to-transparent opacity-80 group-hover/img:opacity-90 transition-opacity duration-300" />
                  
                  {/* Glass Card Caption overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 transform translate-y-1 group-hover/img:translate-y-0 transition-transform duration-300">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#00E5FF]">{img.location}</span>
                    <h3 className="text-xs sm:text-sm font-bold text-white leading-snug mt-0.5">{img.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 - Right direction */}
          <div className="group/row flex flex-col gap-2">
            <div className="flex w-[200%] gap-4 animate-marquee-right group-hover/row:[animation-play-state:paused]">
              {[...ROW_2, ...ROW_2].map((img, i) => (
                <div 
                  key={i} 
                  className="relative w-[280px] sm:w-[360px] h-[180px] sm:h-[230px] rounded-xl overflow-hidden border border-white/[0.06] hover:border-[#00E5FF]/50 hover:shadow-[0_0_30px_rgba(0,229,255,0.25)] transition-all duration-300 group/img flex-shrink-0 cursor-pointer"
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/95 via-transparent to-transparent opacity-80 group-hover/img:opacity-90 transition-opacity duration-300" />
                  
                  {/* Glass Card Caption overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 transform translate-y-1 group-hover/img:translate-y-0 transition-transform duration-300">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#00E5FF]">{img.location}</span>
                    <h3 className="text-xs sm:text-sm font-bold text-white leading-snug mt-0.5">{img.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 3 - Left direction Fast */}
          <div className="group/row flex flex-col gap-2">
            <div className="flex w-[200%] gap-4 animate-marquee-left-fast group-hover/row:[animation-play-state:paused]">
              {[...ROW_3, ...ROW_3].map((img, i) => (
                <div 
                  key={i} 
                  className="relative w-[280px] sm:w-[360px] h-[180px] sm:h-[230px] rounded-xl overflow-hidden border border-white/[0.06] hover:border-[#00E5FF]/50 hover:shadow-[0_0_30px_rgba(0,229,255,0.25)] transition-all duration-300 group/img flex-shrink-0 cursor-pointer"
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/95 via-transparent to-transparent opacity-80 group-hover/img:opacity-90 transition-opacity duration-300" />
                  
                  {/* Glass Card Caption overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 transform translate-y-1 group-hover/img:translate-y-0 transition-transform duration-300">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#00E5FF]">{img.location}</span>
                    <h3 className="text-xs sm:text-sm font-bold text-white leading-snug mt-0.5">{img.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Premium Call-to-Action Buttons */}
        <div className="max-w-4xl mx-auto px-4 mt-16 text-center space-y-8">
          <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-b from-[#0F172A]/80 to-[#0A0D1E]/95 border border-white/[0.08] relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#00E5FF]/5 rounded-full blur-3xl pointer-events-none" />
            
            <h2 className="text-2xl font-bold text-white mb-3">Ready to hack your cybersecurity learning curve?</h2>
            <p className="text-[#94A3B8] text-sm md:text-base max-w-xl mx-auto mb-8">
              Join our upcoming hands-on physical labs and industry-led security workshops. Get certified and launch your defensive or offensive career.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Primary Action Button */}
              <a
                href="/workshop"
                // target="_blank"
                // rel="noopener noreferrer"
                className="w-full sm:w-auto relative group p-[1px] rounded-xl bg-gradient-to-r from-[#00E5FF] via-[#2563EB] to-[#8B5CF6] text-white font-bold text-base tracking-wide shadow-[0_0_20px_rgba(0,229,255,0.25)] hover:shadow-[0_0_35px_rgba(0,229,255,0.5)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
              >
                <div className="px-8 py-3.5 bg-zinc-950/90 rounded-[11px] group-hover:bg-transparent transition-all duration-300 flex items-center justify-center gap-2">
                  <span className="relative z-10 flex items-center gap-2 text-white">
                    Register Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </a>

              {/* Secondary Action Button - Enquiry */}
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

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-10 mt-6 border-t border-white/[0.06] text-center">
              <div className="flex flex-col items-center">
                <Shield className="w-5 h-5 text-[#00E5FF] mb-1" />
                <span className="text-xs text-[#FFFFFF] font-semibold">100% Practical Labs</span>
              </div>
              <div className="flex flex-col items-center">
                <Calendar className="w-5 h-5 text-[#2563EB] mb-1" />
                <span className="text-xs text-[#FFFFFF] font-semibold">Weekend Batches</span>
              </div>
              <div className="col-span-2 sm:col-span-1 flex flex-col items-center">
                <Award className="w-5 h-5 text-[#8B5CF6] mb-1" />
                <span className="text-xs text-[#FFFFFF] font-semibold">Authorized Credentials</span>
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
