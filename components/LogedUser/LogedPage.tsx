'use client';

import { useSession } from "next-auth/react";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";
import { GoProjectSymlink } from "react-icons/go"; 

const LogedPage = () => {
  const { data: session } = useSession();

  const userName = session?.user?.name?.split(" ")[0] || "Creator";

  return (
    <div className="min-h-screen w-full bg-white text-zinc-900 px-6 md:px-12">
      
      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto pt-32 md:pt-40">
        
        {/* --- Hero Section --- */}
        <div className="flex flex-col items-start gap-6 md:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              Welcome, <span className="nav-title bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500">{userName}</span>.
            </h1>
            <p className="text-xl md:text-2xl text-zinc-500 font-medium max-w-2xl">
              Ready to turn your ideas into reality?
            </p>
          </div>

          <div className="mt-4">
            <Link
              href={'/formpage'}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-medium text-white bg-black rounded-full transition-all duration-300 ease-out hover:bg-zinc-800 hover:scale-105 active:scale-95 shadow-lg shadow-zinc-200"
            >
              <span className="nav-title">Let's Create</span> 
              <IoIosArrowRoundForward className="text-2xl transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="w-full h-px bg-zinc-200 my-20 md:my-24"></div>

        <div className="w-full space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl md:text-4xl font-semibold text-zinc-800 tracking-tight">
              Your Previous Projects
            </h2>
          </div>


          <div className="previous-project grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            

            <div className="col-span-full flex flex-col items-center justify-center py-16 border-2 border-dashed border-zinc-200 rounded-3xl text-zinc-400 bg-zinc-50/50">
                <GoProjectSymlink className="text-4xl mb-4 opacity-50" />
                <p className="text-lg">No projects created yet.</p>
                <p className="text-sm">Click above to start your first build.</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default LogedPage;