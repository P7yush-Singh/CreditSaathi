import Image from "next/image";
import Link from "next/link";
import { MapPinCheck, MailOpen } from "lucide-react";
export default function Footer() {
    return (
      <footer className="bg-[#0A2540] text-white py-8 mt-10">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-2xl flex items-center font-bold mb-3">
                <Image src="/crsaathi.png" className="rounded-full" alt="CrSaathi" width={60} height={60} />
              <span className="text-[#2D9CDB] ml-2">Cr</span>Saathi
            </h3>
            <p className="text-gray-300 text-sm">
              Your trusted partner for finding the right credit card. Compare, explore, and apply easily.
            </p>
          </div>
  
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/" className="hover:text-[#2D9CDB]">Home</Link></li>
              <li><Link href="/compare" className="hover:text-[#2D9CDB]">Compare</Link></li>
              <li>
                <Link href="/report" className="hover:text-[#2D9CDB]">
                  Can't find your card?
                </Link>
              </li>
            </ul>
          </div>
  
          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <p className="text-gray-300 flex text-md items-center gap-2"><MailOpen className="w-4 h-4" />
              support@crsaathi.com </p>
              <p className="text-gray-300 flex text-md items-center gap-2"><MapPinCheck className="w-4 h-4" /> New Delhi, India</p>
          </div>
        </div>
  
        <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-4">
          © {new Date().getFullYear()} Credit Saathi. All Rights Reserved.
          <Link href="/privacy-policy" className="text-gray-500 text-sm ml-2">Privacy Policy</Link>
          <Link href="/terms-of-service" className="text-gray-500 text-sm ml-2">Terms of Service</Link>
        </div>
      </footer>
    );
  }
  