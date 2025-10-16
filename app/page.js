"use client";
import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import CategoryCards from "@/components/CategoryCards";
import FeaturedCards from "@/components/FeaturedCards";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F2F4F7] text-gray-900 flex flex-col">
      <main className="flex-1">
        <HeroSection />
        <FeaturedCards />
        <CategoryCards />
      </main>
      <Footer />
    </div>
  );
}
