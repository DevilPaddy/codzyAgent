'use client';

import { FiMail, FiMapPin, FiArrowRight, FiGithub, FiTwitter, FiLinkedin } from "react-icons/fi";

const ContactSection = () => {
  return (
    <section className="w-full bg-white py-24 md:py-32 overflow-hidden" id="contact">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          <div className="lg:w-1/2 space-y-12">
            <div>
              <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4">
                Get in Touch
              </h2>
              <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight leading-tight">
                Let’s start a <br/> <span className="text-zinc-500">conversation.</span>
              </h1>
              <p className="mt-6 text-lg text-zinc-600 leading-relaxed max-w-md">
                Have a project in mind or just want to explore what Codzy can do for you? We’re here to help you turn ideas into reality.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-900">
                  <FiMail size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900">Email Us</h3>
                  <p className="text-zinc-500 mt-1">Our team typically responds within 2 hours.</p>
                  <a href="tech.codzy@gmail.com" className="inline-block mt-2 font-medium text-black border-b border-black/20 hover:border-black transition-colors">
                    tech.codzy@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-900">
                  <FiMapPin size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900">Office</h3>
                  <p className="text-zinc-500 mt-1">
                    Plot No. 10, Beed Bypass <br/>
                    Chh. Sambhajinagar, MA 431010
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              {[FiGithub, FiTwitter, FiLinkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 hover:bg-black hover:text-white hover:border-black transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>


          <div className="lg:w-1/2 bg-zinc-50 rounded-3xl p-8 md:p-12 border border-zinc-100">
            <form className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-semibold text-zinc-900">Name</label>
                  <input 
                    type="text" 
                    id="name"
                    placeholder="Jane Doe"
                    className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-zinc-900">Email</label>
                  <input 
                    type="email" 
                    id="email"
                    placeholder="jane@example.com"
                    className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-semibold text-zinc-900">Subject</label>
                <select 
                  id="subject"
                  className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all appearance-none"
                >
                  <option>General Inquiry</option>
                  <option>Support Request</option>
                  <option>Partnership</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-semibold text-zinc-900">Message</label>
                <textarea 
                  id="message"
                  rows={4}
                  placeholder="Tell us about your project..."
                  className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all resize-none"
                ></textarea>
              </div>

              <button 
                type="button" 
                className="w-full bg-black text-white font-medium py-4 rounded-xl hover:bg-zinc-800 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Send Message
                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;