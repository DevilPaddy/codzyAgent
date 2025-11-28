'use client';

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { GoProjectSymlink } from "react-icons/go"; 
import { FiDownload, FiCode, FiX, FiMaximize2, FiMinimize2 } from "react-icons/fi";
import { LuLoader } from "react-icons/lu";

interface ProjectData {
  _id: string;
  projectName: string;
  code: {
    html: string;
  };
  createdAt: string;
}

const LogedPage = () => {
  const { data: session } = useSession();
  const userName = session?.user?.name?.split(" ")[0] || "Creator";

  
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
 
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [isModalFullScreen, setIsModalFullScreen] = useState(false);

  useEffect(() => {
    if (session?.user?.email) {
      const fetchProjects = async () => {
        try {
          const res = await fetch('/api/project/list');
          if (res.ok) {
            const data = await res.json();
            setProjects(data.projects);
          }
        } catch (error) {
          console.error("Error loading projects", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchProjects();
    }
  }, [session]);

  const handleDownload = (htmlCode: string, projectName: string) => {
    const blob = new Blob([htmlCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName.replace(/\s+/g, '_')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen w-full bg-white text-zinc-900 px-6 md:px-12">
      
      <div className="max-w-6xl mx-auto pt-32 md:pt-40 pb-20">
        
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
            
            {isLoading && (
               <div className="col-span-full py-20 flex justify-center text-zinc-400">
                  <LuLoader className="animate-spin text-3xl" />
               </div>
            )}

            {!isLoading && projects.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-16 border-2 border-dashed border-zinc-200 rounded-3xl text-zinc-400 bg-zinc-50/50">
                    <GoProjectSymlink className="text-4xl mb-4 opacity-50" />
                    <p className="text-lg">No projects created yet.</p>
                    <p className="text-sm">Click above to start your first build.</p>
                </div>
            )}

            {!isLoading && projects.map((project) => (
              <div key={project._id} className="group relative flex flex-col justify-between bg-white border border-zinc-200 rounded-2xl p-6 hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-300">
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600">
                      <FiCode size={20} />
                    </div>
                    <span className="text-xs font-medium text-zinc-400 bg-zinc-50 px-2 py-1 rounded-md border border-zinc-100">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-zinc-900 mb-2 truncate">
                    {project.projectName}
                  </h3>
                </div>

                <div className="mt-8 flex gap-3">
                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-100 text-zinc-900 text-sm font-medium hover:bg-zinc-200 transition-colors"
                  >
                    View Code
                  </button>

                  <button 
                    onClick={() => handleDownload(project.code.html, project.projectName)}
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-black text-white hover:bg-zinc-800 transition-colors"
                    title="Download Code"
                  >
                    <FiDownload size={18} />
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>


      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className={`bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col transition-all duration-300
             ${isModalFullScreen ? 'w-full h-full rounded-none' : 'w-full max-w-4xl max-h-[80vh]'}
          `}>
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 bg-white">
              <h3 className="font-bold text-lg truncate pr-4">{selectedProject.projectName} - Code</h3>
              <div className="flex items-center gap-2">
                 <button 
                   onClick={() => handleDownload(selectedProject.code.html, selectedProject.projectName)}
                   className="p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-500 hover:text-black"
                   title="Download"
                 >
                   <FiDownload />
                 </button>

                 <button 
                   onClick={() => setIsModalFullScreen(!isModalFullScreen)}
                   className="p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-500 hover:text-black"
                 >
                   {isModalFullScreen ? <FiMinimize2 /> : <FiMaximize2 />}
                 </button>

                 <button 
                   onClick={() => setSelectedProject(null)}
                   className="p-2 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors text-zinc-500"
                 >
                   <FiX size={20} />
                 </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto bg-zinc-50 p-6">
              <pre className="text-sm font-mono text-zinc-800 whitespace-pre-wrap break-all">
                {selectedProject.code.html}
              </pre>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default LogedPage;