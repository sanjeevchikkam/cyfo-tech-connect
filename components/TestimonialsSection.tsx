"use client";

import { Quote, Star, UserCheck, ShieldCheck, Award } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  category: "Student" | "Professional" | "Founder";
  content: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  // Founders (5)
  {
    name: "Rajesh K. Verma",
    role: "Founder, SecureOps India",
    category: "Founder",
    content: "Surya Teja's session on early-stage threat mitigation completely restructured how we approach our product's initial launch security. Absolute goldmine of information.",
    rating: 5,
  },
  {
    name: "Meera Al-Subhi",
    role: "Co-Founder, TechNest Labs",
    category: "Founder",
    content: "The cybersecurity playbook shared here helped us audit our systems and secure $2M seed funding with absolute confidence. Highly recommend their professional workshops.",
    rating: 5,
  },
  {
    name: "Arjun Singhal",
    role: "Founder, AgriSafe Systems",
    category: "Founder",
    content: "Practical, zero-fluff knowledge on threat models. As a founder, understanding risk exposure is key, and Cyfo Tech broke it down perfectly in just three days.",
    rating: 5,
  },
  {
    name: "Nicolette Durand",
    role: "CEO, ShieldGrid Technologies",
    category: "Founder",
    content: "An outstanding blend of industry leadership and compliance standards. This team is raising the bar for cybersecurity training in India and beyond.",
    rating: 5,
  },
  {
    name: "Vikram Malhotra",
    role: "Founder, Cy-Dura",
    category: "Founder",
    content: "Surya's charisma and deep hands-on background make him one of the most reliable secure architecture speakers we've ever invited. Simply outstanding.",
    rating: 5,
  },

  // Professionals (5)
  {
    name: "Sandeep Deshmukh",
    role: "Senior Security Analyst, Infosys",
    category: "Professional",
    content: "Excellent coverage of red-teaming simulations and live exploits. It is rare to see facilitators who actively solve zero-days in real-time.",
    rating: 5,
  },
  {
    name: "Anjali Krishnan",
    role: "Cloud DevOps Engineer, Wipro",
    category: "Professional",
    content: "The zero-trust setup strategies explained in the sessions were incredibly practical. I integrated several points directly into our enterprise production pipelines.",
    rating: 5,
  },
  {
    name: "Tariq Mahmood",
    role: "Cybersecurity Lead, Qatar Petroleum",
    category: "Professional",
    content: "One of the most engaging cybersecurity seminars I have attended in years. The live response drill alone was worth the entire session registration.",
    rating: 5,
  },
  {
    name: "Preeti Adhikari",
    role: "Software Architect, TCS",
    category: "Professional",
    content: "I finally understood key cryptographic handshakes and threat modeling. These speakers bridge theory with genuine tactical application flawlessly.",
    rating: 5,
  },
  {
    name: "David Sterling",
    role: "Lead Penetration Tester, Cognizant",
    category: "Professional",
    content: "They cut through all the academic theory and showed us actual real-world network pivot mechanisms. Exceptional technical clarity.",
    rating: 5,
  },

  // Students (5)
  {
    name: "Nikhil Chawla",
    role: "B.Tech CSE, IIT Hyderabad",
    category: "Student",
    content: "The hands-on reverse engineering workshop gave me more practical skills than an entire semester. Landed a security internship right after!",
    rating: 5,
  },
  {
    name: "Divya Tejaswi",
    role: "M.Tech Cyber Security, NIT Warangal",
    category: "Student",
    content: "Absolutely mind-blowing sessions. Surya Teja's energy is contagious, and his live-hacking demonstrations make complex concepts incredibly fun.",
    rating: 5,
  },
  {
    name: "Saurav Patnaik",
    role: "Information Security Student, VIT",
    category: "Student",
    content: "These sessions are structured perfectly for students aiming for red/blue team roles. Excellent career guidance and resume checkpoints too.",
    rating: 5,
  },
  {
    name: "Tanya Sen",
    role: "B.Sc Forensic Science, Amity",
    category: "Student",
    content: "Highly interactive and accessible! Even without a deep systems programming background, the foundational security concepts were made simple to grasp.",
    rating: 5,
  },
  {
    name: "Rahul Kadam",
    role: "Diploma in Information Security, CDAC",
    category: "Student",
    content: "I attended 3 consecutive Cyfo workshops. The credentials and reference manuals they shared are outstanding study guides for OSCP preparation.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  // Let's divide them into two sets for offset scroll rows
  const firstRow = TESTIMONIALS.slice(0, 8);
  const secondRow = TESTIMONIALS.slice(8, 15);

  // Duplicate arrays to create continuous infinite loops
  const scrollRow1 = [...firstRow, ...firstRow];
  const scrollRow2 = [...secondRow, ...secondRow, ...secondRow.slice(0, 1)];

  return (
    <section id="testimonials" className="relative py-24 bg-[#050816] overflow-hidden border-t border-white/[0.04] select-none">
      {/* Background neon ambient lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] rounded-full bg-gradient-to-tr from-[#00E5FF]/5 to-[#2563EB]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/20 text-[#00E5FF] text-xs font-semibold uppercase tracking-widest mb-4">
          <UserCheck className="w-3.5 h-3.5" />
          Unbiased Feedback
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-white mb-4">
          Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#2563EB] to-[#8B5CF6]">Over 5,000+ Attendees</span>
        </h2>
        <p className="text-[#94A3B8] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          See what tech founders, working enterprise cybersecurity professionals, and university students have to say about our practical workshops and training formats.
        </p>
      </div>

      {/* Marquee Row 1 - Scrolling Left */}
      <div className="relative w-full overflow-hidden flex gap-6 pb-6">
        {/* Soft fade masks on sides */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#050816] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#050816] to-transparent z-10 pointer-events-none" />

        <div className="flex gap-6 shrink-0 animate-marquee-left hover:[animation-play-state:paused] cursor-pointer">
          {scrollRow1.map((item, idx) => (
            <div
              key={`row1-${idx}`}
              className="w-[300px] sm:w-[350px] shrink-0 p-6 rounded-2xl bg-[#0A0D1E]/80 border border-white/[0.04] hover:border-[#00E5FF]/20 hover:bg-[#0F172A]/85 transition-all duration-300 flex flex-col justify-between shadow-xl relative group"
            >
              {/* Category indicator pill */}
              <div className="absolute top-6 right-6">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  item.category === 'Founder' 
                    ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                    : item.category === 'Professional'
                    ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                }`}>
                  {item.category}
                </span>
              </div>

              <div>
                <Quote className="w-8 h-8 text-[#00E5FF]/20 mb-3" />
                <p className="text-sm text-[#CBD5E1] leading-relaxed mb-6 font-normal">
                  "{item.content}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#00E5FF] transition-colors duration-200">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-[#64748B] font-medium leading-tight">
                    {item.role}
                  </p>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2 - Scrolling Right */}
      <div className="relative w-full overflow-hidden flex gap-6 mt-2">
        {/* Soft fade masks on sides */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#050816] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#050816] to-transparent z-10 pointer-events-none" />

        <div className="flex gap-6 shrink-0 animate-marquee-right hover:[animation-play-state:paused] cursor-pointer">
          {scrollRow2.map((item, idx) => (
            <div
              key={`row2-${idx}`}
              className="w-[300px] sm:w-[350px] shrink-0 p-6 rounded-2xl bg-[#0A0D1E]/80 border border-white/[0.04] hover:border-[#2563EB]/20 hover:bg-[#0F172A]/85 transition-all duration-300 flex flex-col justify-between shadow-xl relative group"
            >
              {/* Category indicator pill */}
              <div className="absolute top-6 right-6">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  item.category === 'Founder' 
                    ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                    : item.category === 'Professional'
                    ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                }`}>
                  {item.category}
                </span>
              </div>

              <div>
                <Quote className="w-8 h-8 text-[#2563EB]/20 mb-3" />
                <p className="text-sm text-[#CBD5E1] leading-relaxed mb-6 font-normal">
                  "{item.content}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#2563EB] transition-colors duration-200">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-[#64748B] font-medium leading-tight">
                    {item.role}
                  </p>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
