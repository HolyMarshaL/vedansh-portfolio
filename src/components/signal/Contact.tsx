"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { SOCIALS } from "@/lib/content";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section
      id="signal"
      className="relative min-h-screen py-24 px-6 sm:px-12 lg:px-24 overflow-hidden"
      ref={ref}
    >
      {/* Section label */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <p
          className="text-[10px] tracking-[0.4em] text-neon-purple/40 uppercase mb-2"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          // Section 07
        </p>
        <h2
          className="text-3xl sm:text-5xl font-bold gradient-text-glow"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          ESTABLISH CONTACT
        </h2>
        <p
          className="mt-2 text-sm text-star-white/40 tracking-wider"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          Send a Transmission
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="glass-card rounded-xl p-8 relative"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 mb-6 pb-3 border-b border-neon-purple/10">
            <div className="w-2 h-2 rounded-full bg-neon-pink/60" />
            <div className="w-2 h-2 rounded-full bg-neon-orange/60" />
            <div className="w-2 h-2 rounded-full bg-neon-purple/60" />
            <span
              className="text-[9px] text-star-white/30 ml-2 tracking-wider"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              transmission_terminal.sh
            </span>
          </div>

          <div className="space-y-5">
            {[
              { label: "FREQ_01 // NAME", name: "name", type: "text" },
              { label: "FREQ_02 // EMAIL", name: "email", type: "email" },
            ].map((field) => (
              <div key={field.name}>
                <label
                  className="block text-[9px] tracking-[0.3em] text-neon-purple/40 uppercase mb-2"
                  style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                >
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  required
                  className="w-full bg-transparent border-b border-neon-purple/20 text-star-white/90 text-sm py-2 px-1
                    focus:outline-none focus:border-neon-pink/60 transition-colors
                    placeholder:text-star-white/15"
                  style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                  placeholder={`Enter ${field.name}...`}
                />
              </div>
            ))}

            <div>
              <label
                className="block text-[9px] tracking-[0.3em] text-neon-purple/40 uppercase mb-2"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                FREQ_03 // MESSAGE
              </label>
              <textarea
                name="message"
                rows={4}
                required
                className="w-full bg-transparent border border-neon-purple/10 rounded-lg text-star-white/90 text-sm py-2 px-3
                  focus:outline-none focus:border-neon-pink/40 transition-colors resize-none
                  placeholder:text-star-white/15"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                placeholder="Your transmission..."
              />
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="w-full py-3 rounded-lg text-sm font-bold tracking-widest uppercase
                transition-all duration-300 disabled:opacity-50"
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                background: submitted
                  ? "rgba(255,45,123,0.1)"
                  : "linear-gradient(135deg, rgba(255,45,123,0.2), rgba(180,74,255,0.2))",
                border: "1px solid rgba(255,45,123,0.3)",
                color: "#ff2d7b",
                boxShadow: submitted
                  ? "none"
                  : "0 0 15px rgba(255,45,123,0.1)",
              }}
            >
              {submitted ? "TRANSMISSION SENT" : "TRANSMIT \u2192"}
            </button>
          </div>

          {/* Submitted animation */}
          {submitted && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center rounded-xl"
              style={{ background: "rgba(6,6,10,0.9)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center">
                {/* Radio wave animation */}
                {[0, 1, 2].map((i) => {
                  const ringColors = ["#ff2d7b", "#b44aff", "#4d7cff"];
                  return (
                    <motion.div
                      key={i}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                      style={{ border: `1px solid ${ringColors[i]}40` }}
                      initial={{ width: 20, height: 20, opacity: 0.8 }}
                      animate={{
                        width: [20, 200 + i * 60],
                        height: [20, 200 + i * 60],
                        opacity: [0.8, 0],
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.3,
                        repeat: Infinity,
                      }}
                    />
                  );
                })}
                <motion.p
                  className="text-xl font-bold neon-text-pink relative z-10"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                >
                  TRANSMISSION SENT
                </motion.p>
                <p
                  className="text-xs text-star-white/40 mt-2 relative z-10"
                  style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                >
                  Signal received. Stand by.
                </p>
              </div>
            </motion.div>
          )}
        </motion.form>

        {/* Social Links */}
        <motion.div
          className="flex flex-col justify-center gap-6"
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p
            className="text-xs text-star-white/40 tracking-wider mb-4"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            // Other frequencies
          </p>

          {[
            { label: "EMAIL", value: SOCIALS.email, href: `mailto:${SOCIALS.email}`, color: "#ff2d7b" },
            { label: "BEHANCE", value: "Behance Portfolio", href: SOCIALS.behance, color: "#b44aff" },
            { label: "LINKEDIN", value: "LinkedIn Profile", href: SOCIALS.linkedin, color: "#4d7cff" },
            { label: "INSTAGRAM", value: "Instagram", href: SOCIALS.instagram, color: "#ff44cc" },
          ].map((social, i) => (
            <motion.a
              key={social.label}
              href={social.href}
              target={social.label !== "EMAIL" ? "_blank" : undefined}
              rel={social.label !== "EMAIL" ? "noopener noreferrer" : undefined}
              className="glass-card rounded-lg p-4 flex items-center justify-between group transition-all duration-300 hover:scale-[1.02]"
              style={{
                borderColor: `${social.color}15`,
              }}
              whileHover={{
                boxShadow: `0 0 20px ${social.color}15`,
                borderColor: `${social.color}40`,
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.7 + i * 0.1 }}
            >
              <div>
                <p
                  className="text-[9px] tracking-[0.3em] uppercase mb-1"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    color: `${social.color}60`,
                  }}
                >
                  {social.label}
                </p>
                <p
                  className="text-sm text-star-white/70"
                  style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                >
                  {social.value}
                </p>
              </div>
              <span
                className="text-lg transition-transform duration-300 group-hover:translate-x-1"
                style={{ color: `${social.color}60` }}
              >
                &rarr;
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
