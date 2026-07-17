"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { 
  AlertTriangle, 
  ArrowLeft, 
  RefreshCw, 
  Mail, 
  HelpCircle 
} from "lucide-react";
import HeaderPage from "../header/page";
import FooterPage from "../footer/page";

function FailContent() {
  const searchParams = useSearchParams();
  const ticketId = searchParams.get("ticket_id") || "Unknown";
  const status = searchParams.get("status") || "FAILED";
  const errorMsg = searchParams.get("error") || "";

  return (
    <div className="max-w-md w-full mx-auto py-12 px-4 text-center">
      
      {/* Visual Error Sign */}
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 mb-6 shadow-[0_0_25px_rgba(239,68,68,0.2)] animate-bounce">
        <AlertTriangle className="w-8 h-8" />
      </div>

      {/* Header */}
      <h1 className="text-3xl font-sans font-bold text-white tracking-tight">
        Payment Failed
      </h1>
      <p className="mt-3 text-sm text-[#94A3B8] leading-relaxed">
        We were unable to process your payment for this enrollment. Your transaction has been cancelled or declined by the payment gateway.
      </p>

      {/* Meta Box */}
      <div className="mt-8 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] text-left space-y-3">
        <div className="flex justify-between items-center text-xs">
          <span className="text-[#64748B] font-mono uppercase">Ticket ID:</span>
          <span className="font-mono font-bold text-white">{ticketId}</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-[#64748B] font-mono uppercase">Gateway Status:</span>
          <span className="font-mono font-bold text-red-400 uppercase">{status}</span>
        </div>
        {errorMsg && (
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#64748B] font-mono uppercase">Reason:</span>
            <span className="font-mono text-white/80">{errorMsg}</span>
          </div>
        )}
      </div>

      {/* Advice Panel */}
      <div className="mt-6 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 text-xs text-[#94A3B8] text-left">
        <span className="font-bold text-amber-400">Troubleshooting tip:</span> Check if your internet connection is active, ensure your UPI app / card limits are correctly configured, or try using an alternative payment method.
      </div>

      {/* Action Buttons */}
      <div className="mt-8 space-y-3">
        <Link
          href="/workshop"
          className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-red-500 to-[#2563EB] text-white text-sm font-bold shadow-lg shadow-red-500/10 hover:shadow-red-500/20 transition-all"
        >
          <RefreshCw className="w-4 h-4 animate-spin-slow" />
          <span>Retry Registration</span>
        </Link>

        <Link
          href="/contactus"
          className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 text-xs font-semibold text-[#94A3B8] transition-all"
        >
          <Mail className="w-4 h-4 text-[#00E5FF]" />
          <span>Connect with Support</span>
        </Link>
      </div>

      <div className="mt-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </div>

    </div>
  );
}

export default function FailPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#050816] text-white">
      {/* Header */}
      <HeaderPage />

      {/* Main Container */}
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Suspense fallback={
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-10 h-10 rounded-full border-2 border-[#00E5FF] border-t-transparent animate-spin" />
            <p className="mt-4 text-xs font-mono text-[#00E5FF] tracking-wider uppercase animate-pulse">
              Setting up failure context...
            </p>
          </div>
        }>
          <FailContent />
        </Suspense>
      </main>

      {/* Footer */}
      <FooterPage />
    </div>
  );
}
