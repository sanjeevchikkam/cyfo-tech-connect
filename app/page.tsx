import HeaderPage from "./header/page";
import HeroPage from "./hero/page";
import GalleryPreview from "../components/GalleryPreview";
import OurStorySection from "../components/OurStorySection";
import OurSpeakersSection from "../components/OurSpeakersSection";
import TestimonialsSection from "../components/TestimonialsSection";
import WorkshopSection from "../components/WorkshopSection";
import ContactSection from "../components/ContactSection";
import FooterPage from "./footer/page";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#050816]">
      {/* Premium Sticky Header */}
      <HeaderPage />

      {/* Main Sections */}
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroPage />
        
         {/* Interactive Workshop Preview Section */}
        <WorkshopSection />
        {/* Interactive Gallery Preview Section */}
        <GalleryPreview />

        {/* Our Story Timeline Section */}
        <OurStorySection />

        {/* Distinguished Speakers Section */}
        <OurSpeakersSection />

        {/* Infinite Testimonials Carousel Section */}
        <TestimonialsSection />

        {/* Interactive Contact & Enquiry Form Section */}
        <ContactSection />
      </main>

      {/* Cyber Footer */}
      <FooterPage />
    </div>
  );
}
