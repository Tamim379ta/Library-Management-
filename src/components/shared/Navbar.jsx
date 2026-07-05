'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

const AppNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigationItems = [
    { name: "Home", path: "/" },
    { name: "Books", path: "/books" },
    // { name: "About", path: "/about" },
    // { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className="w-full px-6 sm:px-12 lg:px-20 py-4 z-50"
      style={{
        background: "linear-gradient(135deg, #659287 0%, #88BDA4 50%, #B1D3B9 110%)"
      }}
    >
      <div className="flex items-center justify-between mx-auto max-w-7xl">
        
        {/* Left: Hamburger & Logo */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden text-white mr-2 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-white/40"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )
          }
          </button>

          <Link href="/" className="transition active:scale-98">
            <Image
              src="/assets/Logo.png"
              alt="BookBridge Logo"
              width={160}
              height={60}
              priority
              className="h-auto w-auto max-w-[140px] sm:max-w-[160px]"
            />
          </Link>
        </div>

        {/* Right: Links + Sign In (Desktop) */}
        <div className="hidden sm:flex items-center gap-2 md:gap-4">
          {navigationItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-white/20 text-white backdrop-blur-sm'
                    : 'text-[#E6F2DD] hover:text-white hover:bg-white/5'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
          
          <Link
            href="/signin"
            className={`ml-2 font-semibold px-6 py-2.5 rounded-full text-sm transition-all duration-200 active:scale-95 shadow-sm ${
              pathname === '/signin'
                ? 'bg-[#E6F2DD] text-[#3F5F53] ring-2 ring-white'
                : 'bg-white text-[#3F5F53] hover:bg-[#E6F2DD]'
            }`}
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="sm:hidden w-full bg-[#3F5F53]/95 backdrop-blur-lg px-6 py-6 flex flex-col gap-3 shadow-xl border-t border-white/10 animate-fadeIn">
          {navigationItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 rounded-xl font-medium text-base transition ${
                  isActive
                    ? 'bg-white text-[#3F5F53] shadow-md'
                    : 'text-white/90 hover:bg-white/10'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
          
          <Link
            href="/signin"
            onClick={() => setIsMenuOpen(false)}
            className={`w-full text-center font-bold py-3.5 rounded-xl text-base mt-2 transition shadow-sm ${
              pathname === '/signin'
                ? 'bg-[#E6F2DD] text-[#3F5F53]'
                : 'bg-white text-[#3F5F53]'
            }`}
          >
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
};

export default AppNavbar;