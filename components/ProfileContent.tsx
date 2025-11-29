'use client';

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiDownload, FiCode, FiX, FiMaximize2, FiMinimize2, FiEdit2, FiCheck, FiLogOut, FiUser } from "react-icons/fi";
import { LuLoader } from "react-icons/lu";
import { GoProjectSymlink } from "react-icons/go";

interface ProjectData {
  _id: string;
  projectName: string;
  code: { html: string };
  createdAt: string;
}

interface ProfileContentProps {
  session: Session;
  memberSince: string;
}

export default function ProfileContent({ session, memberSince }: ProfileContentProps) {
  const userImage = session?.user?.image;
  const userName = session?.user?.name || "Creator";
  const userEmail = session?.user?.email;

  // --- Project State ---
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // --- Modal State ---
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [isModalFullScreen, setIsModalFullScreen] = useState(false);

  // --- Editing State ---
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNameValue, setEditNameValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // 1. Fetch Projects on Load
  useEffect(() => {
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
  }, []);

  // 2. Edit Functions
  const startEditing = (project: ProjectData) => {
    setEditingId(project._id);
    setEditNameValue(project.projectName);
  };

  const saveEdit = async (id: string) => {
    if (!editNameValue.trim()) return;
    setIsSaving(true);
    try {
      const res = await fetch('/api/project/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, newName: editNameValue }),
      });

      if (res.ok) {
        setProjects((prev) => 
          prev.map((p) => p._id === id ? { ...p, projectName: editNameValue } : p)
        );
        setEditingId(null);
      }
    } catch (error) {
      console.error("Failed update", error);
    } finally {
      setIsSaving(false);
    }
  };

  // 3. Download Function
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
    <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 font-sans text-zinc-900">
      
      {/* --- SECTION 1: PROFILE HEADER --- */}
      <div className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-sm mb-12 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
        
        <div className="flex items-center gap-6">
          {/* Avatar */}
          <div className="relative h-24 w-24 shrink-0 rounded-full border-4 border-white shadow-lg overflow-hidden bg-zinc-100">
            {userImage ? (
              <Image src={userImage} alt="Profile" fill className="object-cover" />
            ) : (
              <FiUser className="h-10 w-10 text-zinc-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            )}
          </div>

          {/* User Info */}
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">{userName}</h1>
            <p className="text-zinc-500 font-medium">{userEmail}</p>
            <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-semibold text-zinc-600 border border-zinc-200">
              Member Since: {memberSince}
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="group flex items-center gap-2 px-5 py-3 rounded-full bg-red-50 text-red-600 font-medium hover:bg-red-600 hover:text-white transition-all duration-300"
        >
          <FiLogOut className="text-lg" />
          <span>Sign Out</span>
        </button>
      </div>

      <div className="w-full h-px bg-zinc-200 mb-12"></div>

      {/* --- SECTION 2: PROJECTS --- */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-zinc-800 tracking-tight flex items-center gap-2">
           <GoProjectSymlink /> Your Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading && (
             <div className="col-span-full py-20 flex justify-center text-zinc-400">
                <LuLoader className="animate-spin text-3xl" />
             </div>
          )}

          {!isLoading && projects.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-16 border-2 border-dashed border-zinc-200 rounded-3xl text-zinc-400 bg-zinc-50/50">
                  <p className="text-lg">No projects yet.</p>
              </div>
          )}

          {!isLoading && projects.map((project) => (
            <div key={project._id} className="flex flex-col justify-between bg-white border border-zinc-200 rounded-2xl p-6 hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-300">
              
              <div>
                {/* Date Badge */}
                <div className="flex justify-end mb-4">
                  <span className="text-xs font-medium text-zinc-400 bg-zinc-50 px-2 py-1 rounded-md border border-zinc-100">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                {/* Editable Title */}
                <div className="h-10 mb-2 flex items-center">
                  {editingId === project._id ? (
                      <div className="flex items-center w-full gap-2 animate-in fade-in duration-200">
                          <input 
                              type="text" 
                              value={editNameValue}
                              onChange={(e) => setEditNameValue(e.target.value)}
                              className="w-full px-2 py-1 text-lg font-bold border-b-2 border-zinc-900 focus:outline-none bg-transparent"
                              autoFocus
                          />
                          <button 
                              onClick={() => saveEdit(project._id)} 
                              disabled={isSaving}
                              className="p-1.5 bg-green-50 text-green-600 rounded-md hover:bg-green-100"
                          >
                              {isSaving ? <LuLoader className="animate-spin"/> : <FiCheck />}
                          </button>
                          <button 
                              onClick={() => setEditingId(null)}
                              className="p-1.5 text-zinc-400 hover:text-zinc-600"
                          >
                              <FiX />
                          </button>
                      </div>
                  ) : (
                      <div className="flex items-center gap-3 w-full group/title">
                          <h3 className="text-xl font-bold text-zinc-900 truncate">
                              {project.projectName}
                          </h3>
                          <button 
                              onClick={() => startEditing(project)}
                              className="opacity-0 group-hover/title:opacity-100 transition-opacity text-zinc-400 hover:text-zinc-800"
                          >
                              <FiEdit2 size={16} />
                          </button>
                      </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex gap-3">
                <button 
                  onClick={() => setSelectedProject(project)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-100 text-zinc-900 text-sm font-medium hover:bg-zinc-200 transition-colors"
                >
                  <FiCode /> View Code
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

      {/* --- MODAL (Code View) --- */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className={`bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col transition-all duration-300
             ${isModalFullScreen ? 'w-full h-full rounded-none' : 'w-full max-w-4xl max-h-[80vh]'}
          `}>
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 bg-white">
              <h3 className="font-bold text-lg truncate pr-4">{selectedProject.projectName}</h3>
              <div className="flex items-center gap-2">
                 <button 
                   onClick={() => handleDownload(selectedProject.code.html, selectedProject.projectName)}
                   className="p-2 hover:bg-zinc-100 rounded-full text-zinc-500 hover:text-black"
                 >
                   <FiDownload />
                 </button>
                 <button 
                   onClick={() => setIsModalFullScreen(!isModalFullScreen)}
                   className="p-2 hover:bg-zinc-100 rounded-full text-zinc-500 hover:text-black"
                 >
                   {isModalFullScreen ? <FiMinimize2 /> : <FiMaximize2 />}
                 </button>
                 <button 
                   onClick={() => setSelectedProject(null)}
                   className="p-2 hover:bg-red-50 hover:text-red-500 rounded-full text-zinc-500"
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
  );
}