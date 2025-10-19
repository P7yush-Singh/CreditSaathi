"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Cards", href: "/cards" },
    { name: "Banks", href: "/banks" },
    { name: "Compare", href: "/compare" },
    { name: "Report", href: "/report-missing-card" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user/check-session");
        const data = await res.json();
        if (data.loggedIn) setUser(data.user);
      } catch (err) {
        console.error("User check failed:", err);
      }
    };
    fetchUser();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/user/logout", { method: "POST" });
    setUser(null);
    router.push("/");
  };

  return (
    <nav
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-white/20 shadow-lg"
          : "backdrop-blur-md bg-white/10"
      } border border-white/20 rounded-full px-6 py-3 w-[95%] sm:w-[60%] flex items-center justify-between`}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center space-x-2">
        <Image
          src="/crsaathi.png"
          alt="CrSaathi"
          width={36}
          height={36}
          className="rounded-full"
        />
        <span className="text-lg sm:text-xl font-bold text-white">
          <span className="text-[#09E85E]">Cr</span>Saathi
        </span>
      </Link>

      {/* Centered Links */}
      <div className="hidden md:flex items-center space-x-6 mx-6">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`relative text-sm font-medium transition-all ${
                isActive
                  ? "text-[#09E85E]"
                  : "text-white hover:text-[#09E85E]/80"
              }`}
            >
              {link.name}
              {isActive && (
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[#09E85E] rounded-full blur-[1px]" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Right side */}
      <div className="hidden md:flex items-center space-x-4 relative">
        {!user ? (
          <Link
            href="/user/login"
            className="px-4 py-1.5 rounded-full border border-white/30 bg-white/10 hover:bg-[#09E85E]/20 hover:border-[#09E85E] text-white text-sm font-medium transition"
          >
            Login
          </Link>
        ) : (
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-full border border-white/20 hover:border-[#09E85E] transition"
            >
              <div className="w-8 h-8 rounded-full bg-[#09E85E]/30 flex items-center justify-center text-white font-semibold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm text-white">{user.name}</span>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-lg p-3 w-44 text-white">
                <Link
                  href="/user/dashboard"
                  className="block px-2 py-2 rounded hover:bg-[#09E85E]/20"
                  onClick={() => setShowDropdown(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-2 py-2 rounded hover:bg-red-500/30"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
