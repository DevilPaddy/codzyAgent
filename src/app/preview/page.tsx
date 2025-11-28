'use client'
import React, { useCallback, useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '../../../components/Navbar' 
import { LuMaximize2, LuLoader } from "react-icons/lu";
import { TbArrowsDiagonalMinimize } from "react-icons/tb";
import { FiDownload, FiSend, FiSave } from "react-icons/fi"; 

const API_BASE_URL = "http://54.162.30.59:5000";

const PreviewContent = () => {
    const searchParams = useSearchParams();
    const initialPrompt = searchParams.get('prompt');

    const [prompt, setPrompt] = useState({ text: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false); 
    const [generatedHtml, setGeneratedHtml] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isPreviewMaximized, setIsPreviewMaximized] = useState(false);
    const [hasLoadedInitial, setHasLoadedInitial] = useState(false);

    
    useEffect(() => {
        if (initialPrompt && !hasLoadedInitial) {
            const generateInitialWebsite = async () => {
                setIsLoading(true);
                setError(null);
                try {
                    const response = await fetch(`${API_BASE_URL}/generate`, {
                        method: 'POST',
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify({ text: initialPrompt }),
                    });

                    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                    
                    const html = await response.text();
                    setGeneratedHtml(html);
                    setHasLoadedInitial(true);
                } catch (err: any) {
                    setError(err.message || "Failed to load initial page.");
                } finally {
                    setIsLoading(false);
                }
            };
            generateInitialWebsite();
        }
    }, [initialPrompt, hasLoadedInitial]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt({ ...prompt, [e.target.name]: e.target.value });
    };

    const handleGenerate = useCallback(async () => {
        if (!prompt.text.trim()) {
            setError("Prompt cannot be empty.");
            return;
        }
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_BASE_URL}/generate`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    text: prompt.text,
                    html: generatedHtml
                }),
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const newHtml = await response.text();
            setGeneratedHtml(newHtml);
            setPrompt({ text: '' });
        } catch (err: any) {
            setError(err.message || "An unknown error occurred.");
        } finally {
            setIsLoading(false);
        }
    }, [prompt, generatedHtml]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleGenerate();
    };

    const handleDownloadAndSave = useCallback(async () => {
        if (!generatedHtml) {
            alert("No content to download.");
            return;
        }

        setIsSaving(true); 

        try {

            const projectName = `Project ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`;
            
            const saveResponse = await fetch('/api/project/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    projectName: projectName,
                    htmlCode: generatedHtml
                })
            });

            if (!saveResponse.ok) {
                console.error("Failed to save project to history.");
            }

            const blob = new Blob([generatedHtml], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'codzy-project.html';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

        } catch (err) {
            console.error("Error during save/download:", err);
            alert("Something went wrong, please try again.");
        } finally {
            setIsSaving(false); 
        }
    }, [generatedHtml]);

    const toggleMaximize = () => setIsPreviewMaximized(!isPreviewMaximized);

 

    return (
        <div className="flex flex-col lg:flex-row w-full h-[calc(100dvh-5rem)] gap-4 p-2 lg:p-4">
            
            <div className={`flex flex-col gap-4 transition-all duration-300 ease-in-out
                ${isPreviewMaximized ? 'hidden' : 'w-full lg:w-[28%] h-auto lg:h-full order-2 lg:order-1'}
            `}>
                
                <div className="hidden lg:flex flex-1 flex-col rounded-xl border border-gray-200 bg-white p-4 overflow-y-auto shadow-sm">
                    <h3 className="text-gray-900 text-sm font-semibold mb-2 uppercase tracking-wider">Editor Log</h3>
                    <div className="text-xs text-gray-500 space-y-2 font-medium">
                        {hasLoadedInitial && (
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                <p>Project initialized</p>
                            </div>
                        )}
                        <p className="opacity-60 italic">Waiting for input...</p>
                    </div>
                </div>

                <div className="mt-auto w-full">
                    <form onSubmit={handleSubmit} className="relative group">
                        <textarea
                            className="w-full bg-white border border-gray-300 text-gray-900 rounded-xl px-4 py-3 pr-12
                            placeholder:text-gray-400
                            focus:outline-none focus:border-black focus:ring-1 focus:ring-black
                            resize-none scrollbar-hide shadow-md transition-all min-h-[100px]"
                            name="text"
                            placeholder="Describe what you want to change..."
                            value={prompt.text}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                        
                        <button
                            type="submit"
                            disabled={isLoading || !prompt.text.trim()}
                            className="absolute bottom-3 right-3 p-2 rounded-lg bg-black text-white 
                            disabled:bg-gray-200 disabled:text-gray-400 hover:bg-gray-800 transition-colors shadow-sm"
                        >
                            {isLoading ? <LuLoader className="animate-spin" /> : <FiSend />}
                        </button>
                    </form>
                    {error && <p className="text-red-500 text-xs mt-2 ml-1 font-medium">{error}</p>}
                </div>
            </div>


            <div className={`flex flex-col gap-3 transition-all duration-300 ease-in-out
                ${isPreviewMaximized ? 'w-full h-full' : 'w-full lg:flex-1 h-[60vh] lg:h-full'}
                order-1 lg:order-2 relative
            `}>
                
                <div className="relative flex-1 w-full bg-white rounded-xl overflow-hidden border border-gray-200 shadow-xl">
                    
                    <div className="absolute top-0 left-0 right-0 h-10 bg-gray-50 flex items-center justify-between px-4 border-b border-gray-200 z-10">
                        <div className="flex gap-1.5 opacity-80">
                            <div className="w-3 h-3 rounded-full bg-red-400 border border-red-500/20"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-500/20"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400 border border-green-500/20"></div>
                        </div>
                        <span className="text-xs text-gray-400 font-medium tracking-wide">PREVIEW</span>
                        <button onClick={toggleMaximize} className="text-gray-400 hover:text-black transition-colors">
                            {isPreviewMaximized ? <TbArrowsDiagonalMinimize /> : <LuMaximize2 />}
                        </button>
                    </div>

                    <div className="w-full h-full pt-10 relative bg-white">
                        {isLoading && (
                            <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/60 backdrop-blur-sm">
                                <div className="bg-white text-black border border-gray-200 px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl">
                                    <LuLoader className="animate-spin text-xl text-black" />
                                    <span className="font-medium text-sm">Generating...</span>
                                </div>
                            </div>
                        )}
                        
                        <iframe
                            srcDoc={generatedHtml}
                            title="Website Preview"
                            className="w-full h-full border-0"
                            sandbox="allow-scripts allow-same-origin"
                        />
                    </div>
                </div>

                {!isPreviewMaximized && (
                    <div className="flex justify-end">
                        <button
                            onClick={handleDownloadAndSave}
                            disabled={isSaving} 
                            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-black text-white
                            hover:bg-gray-800 disabled:bg-gray-400 font-medium text-sm transition-all shadow-lg active:scale-95"
                        >
                            {isSaving ? (
                                <>
                                    <LuLoader className="animate-spin" /> Saving...
                                </>
                            ) : (
                                <>
                                    <FiDownload /> Download Code
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>

        </div>
    );
};

const Page = () => {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 overflow-hidden flex flex-col">
            <Navbar />
            <div className="flex-1 w-full max-w-[1920px] mx-auto">
                <Suspense fallback={<div className="flex items-center justify-center h-full text-gray-500">Loading...</div>}>
                    <PreviewContent />
                </Suspense>
            </div>
        </div>
    )
}

export default Page;