/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Phone,
  Mail,
  MessageCircle,
  Sparkles,
  Baby,
  Shirt,
  HeartHandshake,
  Key,
  PawPrint,
  Search,
  ShieldCheck,
  Clock,
  MapPin,
  GraduationCap,
  Calendar,
  ArrowUp,
  UserCheck,
  FileText,
  Check,
  Award
} from "lucide-react";
// @ts-ignore
import profilePhoto from "./assets/images/profile_photo_1784227719942.jpg";

export default function App() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Handle showing/hiding back-to-top button on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Service Badges
  const services = [
    { name: "Housekeeping", icon: Sparkles },
    { name: "Childcare", icon: Baby },
    { name: "Laundry & Ironing", icon: Shirt },
    { name: "Elderly Assistance", icon: HeartHandshake },
    { name: "House Sitting", icon: Key },
    { name: "Pet Sitting", icon: PawPrint }
  ];

  // Core Skills with descriptions
  const skills = [
    { name: "Housekeeping", icon: Sparkles, desc: "Professional and comprehensive cleaning" },
    { name: "Deep Cleaning", icon: Award, desc: "Detail-oriented sanitization of hard-to-reach areas" },
    { name: "Laundry & Ironing", icon: Shirt, desc: "Expert fabric care and neat presentation" },
    { name: "Childcare", icon: Baby, desc: "Over 18 years of childcare and classroom assistant experience" },
    { name: "Elderly Assistance", icon: HeartHandshake, desc: "Compassionate, patient and dependable care" },
    { name: "House Sitting", icon: Key, desc: "Secure home management and trusted key holder" },
    { name: "Pet Sitting", icon: PawPrint, desc: "Loving attention and care for family pets" },
    { name: "Attention to Detail", icon: Search, desc: "Thorough approach to tasks with high standards" },
    { name: "Reliable & Trustworthy", icon: ShieldCheck, desc: "Punctual, committed, and highly recommended" },
    { name: "Time Management", icon: Clock, desc: "Organized schedules and efficient execution" }
  ];

  // Jobs
  const experiences = [
    {
      title: "Domestic Cleaner & Childcare Assistant",
      company: "Huppelland School",
      period: "2025–2026",
      location: "School & Crèche Environment",
      bullets: [
        "Supervised children during daily activities, ensuring a safe and positive space.",
        "Assisted with children's playtime, meals, and standard daily routines.",
        "Maintained hygienic and clean classroom and common area environments.",
        "Supported teachers in setting up materials and keeping areas organized.",
        "Strictly followed health, safety, and sanitization procedures."
      ]
    },
    {
      title: "Housekeeper & House Sitter",
      company: "Private Residence",
      period: "2024–Present",
      location: "Lakeside, Cape Town",
      bullets: [
        "Provided comprehensive housekeeping for a spacious three-bedroom home.",
        "Managed thorough cleaning, dusting, sweeping, and sanitization of all rooms.",
        "Conducted professional laundry and meticulous ironing of clothes and linens.",
        "Maintained top home security and property care while owners were away.",
        "Trusted key holder with excellent reputation and verified references."
      ]
    },
    {
      title: "Domestic Cleaner",
      company: "SweepSouth",
      period: "2019–2025",
      location: "Professional Cleaning Services",
      bullets: [
        "Delivered premium cleaning services tailored to high-standard expectations.",
        "Cleaned and sanitized kitchens, bathrooms, and living areas thoroughly.",
        "Deep-cleaned appliances including inside ovens and refrigerators.",
        "Polished windows, cupboards, and high-frequency surfaces.",
        "Handled laundry, ironing, and plant care with attentiveness."
      ]
    }
  ];

  const contactLinks = {
    phone: "tel:+27681830317",
    whatsapp: "https://wa.me/27681830317",
    email: "mailto:mejurymariascotch@gmail.com?subject=Domestic%20Professional%20Inquiry"
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-[#565353] font-sans antialiased selection:bg-[#4190EE]/20 selection:text-[#4190EE] py-6 sm:py-12">
      
      {/* Outer Card-like CV Layout Container */}
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Split Screen Grid Layout: Sidebar on Left, Main Content on Right */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Sidebar Area */}
          <aside className="w-full lg:w-1/3 flex flex-col gap-6 lg:sticky lg:top-8">
            
            {/* Profile Info Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center">
              
              {/* Circular Profile Photo */}
              <div className="relative group mb-6">
                <div className="absolute inset-0 bg-[#4190EE]/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300"></div>
                <img
                  src={profilePhoto}
                  alt="Madzimai Maria Mejury Maria Scotch profile photo"
                  referrerPolicy="no-referrer"
                  className="relative w-36 h-36 rounded-full border-4 border-[#4190EE] object-cover shadow-sm transform group-hover:scale-105 transition-all duration-500"
                />
              </div>

              {/* Name & Title */}
              <h1 className="text-2xl font-bold leading-tight text-gray-900 font-display">
                Madzimai Maria Mejury Maria Scotch
              </h1>
              <p className="text-[#4190EE] font-bold mt-1.5 tracking-wider uppercase text-xs">
                Domestic Professional
              </p>

              {/* Service Badges */}
              <div className="flex flex-wrap justify-center gap-1.5 mt-6">
                {services.map((svc, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-blue-50/75 text-[#4190EE] rounded-full text-[10px] font-bold uppercase tracking-wider border border-[#4190EE]/10"
                  >
                    {svc.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-3">
              <h3 className="text-xs font-bold uppercase text-gray-400 mb-4 tracking-widest flex items-center gap-2">
                <span className="w-1 h-3.5 bg-[#4190EE] rounded-full"></span> Contact & Connect
              </h3>
              
              <a
                href={contactLinks.phone}
                className="flex items-center gap-3 w-full bg-[#4190EE] hover:bg-[#327fd8] text-white px-4 py-3 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer text-sm font-semibold"
                aria-label="Call Madzimai Maria Mejury Maria Scotch"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span>Call Now</span>
              </a>

              <a
                href={contactLinks.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-3 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer text-sm font-semibold"
                aria-label="Message Madzimai on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>WhatsApp</span>
              </a>

              <a
                href={contactLinks.email}
                className="flex items-center gap-3 w-full bg-[#565353] hover:bg-neutral-700 text-white px-4 py-3 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer text-sm font-semibold"
                aria-label="Email Madzimai"
              >
                <Mail className="w-4 h-4 shrink-0" />
                <span>Email Me</span>
              </a>
            </div>

            {/* Education Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xs font-bold uppercase text-gray-400 mb-4 tracking-widest flex items-center gap-2">
                <span className="w-1 h-3.5 bg-[#4190EE] rounded-full"></span> Education
              </h3>
              <div className="flex items-center gap-3">
                <div className="bg-blue-100/50 p-2.5 rounded-xl text-[#4190EE] shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-gray-950 text-sm">Zimbabwe O-Level Certificate</p>
                  <p className="text-[11px] text-gray-400 mt-0.5 uppercase tracking-wider font-semibold">GCE Certificate</p>
                </div>
              </div>
            </div>

          </aside>

          {/* Main Content Area */}
          <main className="w-full lg:w-2/3 flex flex-col gap-6">
            
            {/* Professional Profile Section */}
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[#4190EE] rounded-full"></span> Professional Profile
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed font-light">
                <p>
                  Reliable, trustworthy and hardworking domestic professional with experience in housekeeping, childcare, elderly assistance, laundry, ironing and house sitting. With over <span className="font-semibold text-gray-950">18 years of childcare experience</span>, I have developed a caring, patient and dependable approach through both raising my own children and working in school and crèche environments.
                </p>
                <p>
                  I take pride in maintaining clean, organised homes and creating safe, welcoming spaces for families. My strong work ethic, attention to detail and commitment to excellent service allow me to consistently exceed expectations. Whether caring for children, supporting elderly clients or maintaining a household, I approach every task with professionalism, respect and genuine care.
                </p>
              </div>
            </motion.section>

            {/* Core Skills Grid Section */}
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-4"
            >
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[#4190EE] rounded-full"></span> Core Skills & Specialties
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {skills.map((skill, index) => {
                  const IconComponent = skill.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-2xl shadow-sm border-b-2 border-gray-100 hover:border-[#4190EE] hover:shadow-md transition-all duration-300 flex flex-col gap-2 group"
                    >
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-[#4190EE]/10 text-[#4190EE] group-hover:bg-[#4190EE] group-hover:text-white transition-all duration-300">
                          <IconComponent className="w-3.5 h-3.5" />
                        </div>
                        <p className="text-xs font-bold text-gray-900 group-hover:text-[#4190EE] transition-all duration-300">
                          {skill.name}
                        </p>
                      </div>
                      <p className="text-[11px] text-gray-700 leading-normal font-light">
                        {skill.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.section>

            {/* Career Experience Section */}
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col gap-4"
            >
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[#4190EE] rounded-full"></span> Career Experience
              </h2>

              <div className="flex flex-col gap-4">
                {experiences.map((exp, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:border-gray-200/80 transition-all duration-300 flex gap-4"
                  >
                    <div className="w-1 bg-[#4190EE] rounded-full shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 mb-2">
                        <div>
                          <h4 className="font-bold text-gray-900 text-base sm:text-lg">
                            {exp.title}
                          </h4>
                          <p className="text-xs text-[#565353] font-medium mt-0.5 flex flex-wrap items-center gap-1.5">
                            <span className="text-gray-950 font-bold">{exp.company}</span>
                            <span className="text-gray-300">•</span>
                            <span className="flex items-center gap-1 text-[11px] text-[#565353]">
                              <MapPin className="w-3 h-3 text-[#4190EE]" />
                              {exp.location}
                            </span>
                          </p>
                        </div>
                        <span className="self-start sm:self-center text-[10px] font-bold text-[#4190EE] bg-blue-50/75 px-2.5 py-1 rounded-full border border-[#4190EE]/10 whitespace-nowrap">
                          {exp.period}
                        </span>
                      </div>

                      <ul className="text-xs sm:text-sm text-gray-600 space-y-2 mt-4">
                        {exp.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-2 leading-relaxed">
                            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* References & Status Bar */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-gray-900 text-white rounded-3xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-md"
            >
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#4190EE] mb-1.5 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5" /> References
                </h4>
                <p className="text-xs text-neutral-300 leading-normal font-light">
                  <span className="font-semibold text-white">Paul Bristow</span> • <span className="font-semibold text-white">Tig Banning</span> (Available upon request)
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-3">
                <div className="text-left">
                  <p className="text-[9px] text-neutral-500 uppercase font-semibold tracking-wider">Availability</p>
                  <p className="text-xs font-bold text-green-400 flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Available
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Call to Action Footer */}
            <footer className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#4190EE]"></div>
              
              <div className="space-y-4 max-w-xl mx-auto">
                <p className="text-sm font-medium text-[#4190EE] tracking-wide uppercase">
                  Hire a dependable expert
                </p>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                  Looking for a reliable domestic professional? Contact Madzimai today.
                </h3>

                {/* Footer Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6">
                  <a
                    href={contactLinks.phone}
                    className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[#4190EE] hover:bg-[#327fd8] text-white font-semibold text-xs sm:text-sm tracking-wide shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                    aria-label="Call Madzimai Maria Mejury Maria Scotch from footer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call Now
                  </a>
                  <a
                    href={contactLinks.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs sm:text-sm tracking-wide shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                    aria-label="WhatsApp Madzimai from footer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    WhatsApp
                  </a>
                  <a
                    href={contactLinks.email}
                    className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[#565353] hover:bg-neutral-700 text-white font-semibold text-xs sm:text-sm tracking-wide shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                    aria-label="Email Madzimai from footer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Email Me
                  </a>
                </div>

                <div className="pt-6 border-t border-gray-100 text-[11px] text-gray-400 font-light flex flex-col sm:flex-row justify-between items-center gap-2">
                  <p>© {new Date().getFullYear()} Madzimai Maria Mejury Maria Scotch.</p>
                  <p>All rights reserved. Professional Portfolio.</p>
                </div>
              </div>
            </footer>

          </main>
          
        </div>

      </div>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3.5 rounded-full bg-[#4190EE] text-white shadow-lg shadow-[#4190EE]/30 hover:bg-[#327fd8] transition-all transform hover:-translate-y-1 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-[#4190EE]/30 z-50 cursor-pointer"
            aria-label="Back to Top"
            title="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
