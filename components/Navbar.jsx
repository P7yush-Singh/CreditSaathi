"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#0A2540] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="text-2xl flex items-center font-bold tracking-wide">
            <Image src="/crsaathi.png" className="mr-3" alt="CrSaathi" width={50} height={50} />
          <span className="text-[#2D9CDB]">Cr</span>Saathi
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8">
          <Link href="/" className="hover:text-[#2D9CDB]">Home</Link>
          <Link href="/categories/travel" className="hover:text-[#2D9CDB]">Travel</Link>
          <Link href="/banks" className="hover:text-[#2D9CDB]">Banks</Link>
          <Link href="/compare" className="hover:text-[#2D9CDB]">Compare</Link>
          <Link href="/report-missing-card" className="hover:text-[#2D9CDB]">Report</Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0A2540] border-t border-gray-700 px-4 pb-3 space-y-3">
          <Link href="/" className="block hover:text-[#2D9CDB]">Home</Link>
          <Link href="/categories/travel" className="block hover:text-[#2D9CDB]">Travel</Link>
          <Link href="/categories/cashback" className="block hover:text-[#2D9CDB]">Cashback</Link>
          <Link href="/compare" className="block hover:text-[#2D9CDB]">Compare</Link>
          <Link href="/report-missing-card" className="block hover:text-[#2D9CDB]">Report</Link>
        </div>
      )}
    </nav>
  );
}
