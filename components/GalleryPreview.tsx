"use client";

import Link from "next/link";
import { ArrowRight, Compass, Sparkles, Image as ImageIcon } from "lucide-react";

export default function GalleryPreview() {
  const previews = [
    {
      src: "/gallery10.jpg",
      title: "Cyberdevx Workshop",
      location: "Hyderabad, Telangana",
      className: "md:col-span-2 md:row-span-1",
    },
    {
      src: "/gallery02.jpg",
      title: "Ai-ML Cyber Workshop",
      location: "Hyderabad, Telangana",
      className: "md:col-span-1 md:row-span-1",
    },
    {
      src: "/gallery11.jpg",
      title: "College Workshop",
      location: "Vadodara, Gujarat",
      className: "md:col-span-1 md:row-span-1",
    },
  ];

  return (
    <section id="gallery-preview" className="relative py-20 bg-[#050816] overflow-hidden border-t border-b border-white/[0.04]">
      {/* Background Accent Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-gradient-to-tr from-[#00E5FF]/5 to-[#8B5CF6]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/20 text-[#00E5FF] text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              Inside Our Classrooms
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold tracking-tight text-white">
              Workshops <span className="text-[#00E5FF]">In Action</span>
            </h2>
            <p className="max-w-xl text-sm sm:text-base text-[#94A3B8]">
              A direct glimpse into our hands-on labs, cyber-defense simulations, and active cybersecurity training bootcamps.
            </p>
          </div>
          
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#00E5FF] hover:text-white transition-all duration-300 group"
          >
            Explore Full Gallery 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {previews.map((item, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl overflow-hidden border border-white/[0.06] hover:border-[#00E5FF]/40 group/item transition-all duration-300 h-[220px] md:h-[280px] shadow-lg hover:shadow-[0_0_25px_rgba(0,229,255,0.15)] ${item.className}`}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/90 via-[#050816]/30 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#00E5FF]">{item.location}</span>
                <h3 className="text-base font-bold text-white leading-snug mt-1">{item.title}</h3>
              </div>
            </div>
          ))}

          {/* Premium CTA Card inside Bento Grid */}
          <Link
            href="/gallery"
            className="group/cta relative rounded-2xl p-6 md:p-8 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#0F172A]/90 to-[#0A0D1E]/95 border border-white/[0.08] hover:border-[#00E5FF]/50 transition-all duration-300 h-[220px] md:h-[280px] shadow-lg hover:shadow-[0_0_30px_rgba(0,229,255,0.2)] md:col-span-1"
          >
            {/* Background cyber accent lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,229,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,229,255,0.015)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-gradient-to-tr from-[#00E5FF]/10 to-[#8B5CF6]/5 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] group-hover/cta:scale-110 transition-transform duration-300">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover/cta:text-[#00E5FF] transition-colors duration-300">
                  Explore 10+ Workshop Photos
                </h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed mt-2">
                  See collegiate cyber ranges, weekend threat-hunting meetups, and direct mentor-led lab sessions in detail.
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover/cta:text-[#00E5FF] transition-colors duration-300 mt-4">
              <span>View Interactive Gallery</span>
              <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1.5 transition-transform" />
            </div>
          </Link>
        </div>

      </div>
    </section>
  );
}
