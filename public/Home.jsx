import React from 'react';
import useAuthStore from '../store/authStore';
import '../navbar.css';
import IdeasHome from './ideasHome';
import Tutorials from './Tutorials';
import Footer from './Footer';

const Home = () => {

  return (
    <div className="card min-h-screen w-full overflow-x-hidden">
      <div className="flex flex-col items-center justify-center text-center px-4 pt-10">
        <h1 className="text-[4rem] sm:text-[6rem] md:text-[10rem] bg-clip-text bg-gradient-to-tl from-[#09eab1] via-[#4c36dd] to-[#8530d4] text-transparent font-bold">Codzy</h1>
        <p className="text-base md:text-lg mt-6 text-zinc-200 max-w-lg">
          😎Build smarter.⚡Launch faster. ❌No code required. 
          Just describe, and watch your site come alive.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-6 px-4">
        <a
          href="/signup"
          className="w-[8rem] text-center py-2 text-lg md:text-xl rounded-lg bg-violet-800 text-white font-medium border-violet-800 hover:bg-transparent border-[1.4px] transition duration-300"
        >
          Signup
        </a>

        <a
          href="/signin"
          className="w-[8rem] text-center py-2 text-lg md:text-xl rounded-lg border-[1.4px] border-violet-800 hover:bg-violet-800 text-white font-medium transition duration-300"
        >
          Login
        </a>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-14 mb-6 px-4">
        <div className="card1 w-full sm:w-[22rem] h-auto sm:h-[10rem] p-4 text-white border border-zinc-800">
          <p className="font-semibold mb-1">✨ Features:</p>
          <ul className="text-sm leading-6 list-disc list-inside">
            <li>🤖 AI-Powered Website Generation</li>
            <li>📈 Built-in SEO Checker</li>
            <li>📦 Static Export Ready</li>
            <li>⚡ Super Fast Loading</li>
          </ul>
        </div>

        <div className="card1 w-full sm:w-[22rem] h-auto sm:h-[10rem] p-4 text-white border border-zinc-800">
          <p className="font-semibold mb-1">⚙️ How It Works:</p>
          <ul className="text-sm leading-6 list-disc list-inside">
            <li>Describe your website in plain English</li>
            <li>AI generates a live preview instantly</li>
            <li>Edit with natural prompts</li>
            <li>Download or deploy with one click</li>
          </ul>
        </div>
      </div>

      <IdeasHome />
      <Tutorials />
      <Footer/>
    </div>
  );
};

export default Home;
