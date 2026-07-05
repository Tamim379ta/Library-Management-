'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, message });
    setEmail('');
    setMessage('');
  };

  return (
    <footer className="bg-black text-white w-full">
      <div className="container mx-auto px-6 lg:px-20 py-16">
        {/* Adjusted to grid-cols-1 md:grid-cols-2 lg:grid-cols-4 to comfortably fit the extra content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12  lg:gap-30">

          {/* Column 1: Logo & Headline */}
          <div className="flex flex-col gap-4 items-center md:items-start text-center md:text-left">
            <Image
              src="/assets/Logo.png"
              alt="BookBridge Logo"
              width={160}
              height={60}
              className="h-auto w-auto max-w-[150px] brightness-0 invert"
            />
            <h3 className="text-xl sm:text-2xl font-bold leading-snug max-w-xs">
              Your Campus Library, Reimagined.
            </h3>
            <p className="text-white/60 text-sm max-w-xs">
              Making knowledge accessible, one book at a time.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h4 className="font-semibold text-lg mb-1">Explore</h4>
            <nav className="flex flex-col items-center md:items-start gap-3">
              <Link href="/" className="text-white/70 hover:text-white transition-colors duration-200 text-sm">
                Home
              </Link>
              <Link href="/books" className="text-white/70 hover:text-white transition-colors duration-200 text-sm">
                Books
              </Link>
              <Link href="/about" className="text-white/70 hover:text-white transition-colors duration-200 text-sm">
                About Us
              </Link>
              <Link href="/signin" className="text-white/70 hover:text-white transition-colors duration-200 text-sm">
                Sign In
              </Link>
            </nav>
          </div>

          {/* Column 3: Legal & Support Links */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h4 className="font-semibold text-lg mb-1">Legal & Support</h4>
            <nav className="flex flex-col items-center md:items-start gap-3">
              <Link href="/privacy" className="text-white/70 hover:text-white transition-colors duration-200 text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/70 hover:text-white transition-colors duration-200 text-sm">
                Terms of Service
              </Link>
              <Link href="/faq" className="text-white/70 hover:text-white transition-colors duration-200 text-sm">
                FAQs
              </Link>
              <Link href="/support" className="text-white/70 hover:text-white transition-colors duration-200 text-sm">
                Help & Support
              </Link>
            </nav>
          </div>

          {/* Column 4: Contact Form */}
          <div className="flex flex-col gap-4 items-center lg:items-end">
            <h4 className="font-semibold text-lg self-center lg:self-end">Get in Touch</h4>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-xs">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all duration-200"
              />
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message"
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all duration-200 resize-none"
              />
              <button
                type="submit"
                className="bg-white text-black font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-white/80 active:scale-95 transition-all duration-200 w-full lg:w-auto"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 text-center text-white/50 text-xs">
          © {new Date().getFullYear()} BookBridge. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;