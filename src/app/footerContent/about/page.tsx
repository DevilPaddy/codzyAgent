'use client';

import Image from "next/image";
import { FiCheck, FiUsers, FiAward, FiCode } from "react-icons/fi";

const AboutSection = () => {
  return (
    <section className="w-full bg-white py-24 md:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        <div className="flex flex-col md:flex-row gap-12 mb-20">
          <div className="md:w-1/2">
            <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4">
              Who We Are
            </h2>
            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight leading-tight">
              We build tools that empower <span className="text-zinc-500">visionaries.</span>
            </h1>
          </div>
          <div className="md:w-1/2 flex items-end">
            <p className="text-lg text-zinc-600 leading-relaxed">
              Codzy was born from a simple idea: Creativity shouldn't be limited by technical barriers. We combine advanced AI with intuitive design to help you build software, websites, and digital experiences in seconds, not weeks.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="relative w-full h-[500px] bg-zinc-100 rounded-3xl overflow-hidden group">
            <Image 
              src="/descPic/dev.jpeg" 
              alt="Office aesthetic"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
            />
            
            <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/20 max-w-xs">
              <p className="text-zinc-900 font-semibold text-lg">“Simplicity is the ultimate sophistication.”</p>
              <p className="text-zinc-500 text-sm mt-2">— Our Design Philosophy</p>
            </div>
          </div>

          <div className="space-y-10">
            
            <div className="space-y-6">
              <h3 className="text-3xl font-semibold text-zinc-900">
                Designed for speed. <br/> Built for scale.
              </h3>
              <p className="text-zinc-600 leading-relaxed">
                We believe the future of coding is collaborative between human and AI. Our platform isn't just a generator; it's a partner that understands your intent and refines your output.
              </p>
            </div>

            <div className="space-y-4">
              {[
                "AI-Driven Architecture",
                "Instant Code Generation",
                "Secure & Private Data",
                "Community Focused"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4 group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-900 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                    <FiCheck size={14} />
                  </div>
                  <span className="text-zinc-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;