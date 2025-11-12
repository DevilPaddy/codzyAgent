import React from 'react';
import Navbar from '../../components/Navbar';
import Tutorials from '../../components/tutorials';
import IdeasHome from '../../components/ideas';
import Footer from '../../components/Footer';

const Home = () => {

  return (
    // Main wrapper: white background, black/zinc text, full screen
    <div className='bg-white'>
      <Navbar />
      <div className="bg-white text-zinc-900 min-h-screen w-full overflow-x-hidden font-sans">

        {/* Centered Main Content Wrapper */}
        <main className="max-w-[1000px] mx-auto px-6">

          {/* Hero Section */}
          <div className="flex flex-col items-center justify-center text-center pt-20 sm:pt-28">
            {/* Heading: Now black, bold, and with tighter leading */}
            <h1 className="text-[3rem] sm:text-[6rem] md:text-[6rem] text-black font-bold leading-none">
              “Where Intelligence Meets Design”
            </h1>
            {/* Subheading: Using a softer zinc color for contrast */}
            <p className="text-base md:text-lg mt-6 text-zinc-700 max-w-lg">
              Create stunning websites effortlessly with our AI agent, built for the visionaries of tomorrow
            </p>
          </div>

          {/* Button Section: Styled for B&W theme */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
            {/* Primary Button: Black background, white text */}
            <a
              href="/signup"
              className="md:w-[12rem] text-center md:px-[2.4vw] md:py-[1vw] text-lg rounded-full bg-black text-white font-medium hover:bg-zinc-800 border border-black transition duration-300"
            >
              Get Started
            </a>
            {/* Secondary Button: White background, black text, gray border */}
            <a
              href="/signin"
              className="md:w-[12rem] text-center md:px-[2.4vw] md:py-[1vw] text-lg rounded-full bg-white text-black font-medium border border-zinc-400 hover:bg-zinc-100 transition duration-300"
            >
              Login
            </a>
          </div>

          {/* Features Section: Clean cards with borders and shadows */}
          <div className="flex flex-col sm:flex-row justify-center items-stretch gap-6 mt-16 sm:mt-24 mb-12">

            {/* Card 1 */}
            <div className="w-full sm:w-1/2 h-auto p-6 bg-white border border-zinc-200 rounded-lg shadow-sm">
              <p className="font-semibold text-xl mb-3 text-black">✨ Features:</p>
              <ul className="text-sm sm:text-base leading-7 list-disc list-inside space-y-1 text-zinc-700">
                <li>🤖 AI-Powered Website Generation</li>
                <li>📈 Built-in SEO Checker</li>
                <li>📦 Static Export Ready</li>
                <li>⚡ Super Fast Loading</li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="w-full sm:w-1/2 h-auto p-6 bg-white border border-zinc-200 rounded-lg shadow-sm">
              <p className="font-semibold text-xl mb-3 text-black">⚙️ How It Works:</p>
              <ul className="text-sm sm:text-base leading-7 list-disc list-inside space-y-1 text-zinc-700">
                <li>Describe your website in plain English</li>
                <li>AI generates a live preview instantly</li>
                <li>Edit with natural prompts</li>
                <li>Download or deploy with one click</li>
              </ul>
            </div>
          </div>

          {/* Assumed Components */}
          {/* These sections are now also inside the max-width container */}
          <div className="py-12 border-t border-zinc-200">
            <IdeasHome />
          </div>

          <div className="py-12 border-t border-zinc-200">
            <Tutorials />
          </div>

        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Home;