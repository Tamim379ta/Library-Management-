"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    emoji: "🔍",
    title: "Browse the Collection",
    description:
      "Search thousands of titles by name, author, or genre. Filter to find exactly what you need — from textbooks to bestsellers.",
  },
  {
    number: "02",
    emoji: "📖",
    title: "Borrow Instantly",
    description:
      "Reserve your book online in seconds. No queues, no paperwork — just pick it up from the campus counter when you're ready.",
  },
  {
    number: "03",
    emoji: "🔄",
    title: "Return & Repeat",
    description:
      "Return before your 14-day window closes and your record stays clean. Then dive back in and find your next great read.",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export default function HowItWorks() {
  return (
    <section
      className="w-full py-20 px-6"
      style={{ background: "#f0f7f0" }}
    >
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span
            className="text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
            style={{ background: "#B1D3B9", color: "#2d4f48" }}
          >
            Simple by design
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold mt-4 leading-tight"
            style={{ color: "#2d4f48" }}
          >
            How It Works
          </h2>
          <p
            className="text-sm mt-3 max-w-md mx-auto leading-relaxed"
            style={{ color: "#659287" }}
          >
            Getting your next book takes less than a minute — here's all there is to it.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Connector line — desktop only */}
          <div
            className="hidden sm:block absolute top-10 left-[20%] right-[20%] h-px"
            style={{ background: "linear-gradient(90deg, #B1D3B9, #88BDA4, #B1D3B9)" }}
          />

          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              className="relative flex flex-col items-center text-center px-6 py-8 rounded-2xl"
              style={{ background: "#E6F2DD" }}
            >
              {/* Number badge */}
              <div
                className="absolute -top-3 left-6 text-xs font-bold px-2.5 py-0.5 rounded-full"
                style={{ background: "#2d4f48", color: "#E6F2DD" }}
              >
                {step.number}
              </div>

              {/* Emoji circle */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-5 shadow-sm"
                style={{ background: "#fff" }}
              >
                {step.emoji}
              </div>

              <h3
                className="font-bold text-base mb-2"
                style={{ color: "#2d4f48" }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#659287" }}
              >
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}