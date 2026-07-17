export interface WorkshopData {
  id: string | number;
  title: string;
  description: string;
  topics: string[];
  venue: string;
  dateTime: string;
  slots: string | number;
  speakers: string[];
  poster: string;
  duration: string;
  actualPrice: string | number;
  offerPrice: string | number;
  status: boolean;
}

export const mockWorkshop: WorkshopData = {
  id: "mock-1",
  title: "Next.js 15 & Supabase Full-Stack Masterclass",
  description: "Join us for an intensive hands-on workshop where you'll learn to build and deploy high-performance full-stack applications using Next.js 15 App Router, Tailwind CSS, and Supabase database. Perfect for developers looking to scale their skills and build real-world production projects.",
  topics: [
    "Next.js 15 App Router & Server Components",
    "Supabase Database, Auth & Realtime Subscriptions",
    "Tailwind CSS v4 & Beautiful Responsive Layouts",
    "State Management & Custom React Hooks",
    "Deployment, Performance Tuning & SEO Optimization"
  ],
  venue: "Virtual Classroom (Interactive Live Stream & Recording)",
  dateTime: "Saturday, August 15, 2026 at 10:00 AM IST",
  slots: 45,
  speakers: ["Dr. Evelyn Vance", "Sarah Jenkins"],
  poster: "/workshopmock1.png",
  duration: "4 Hours",
  actualPrice: 4999,
  offerPrice: 999,
  status: true
};
