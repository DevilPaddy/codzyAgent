'use client'
import React, { useCallback, useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '../../../components/Navbar'
import { LuMaximize2 } from "react-icons/lu";
import { TbArrowsDiagonalMinimize } from "react-icons/tb";

const MockNavbar = () => (
    <Navbar/>
);

const API_BASE_URL = 'http://54.162.63.219:8000';


const PreviewContent = () => {
    const searchParams = useSearchParams();
    const initialPrompt = searchParams.get('prompt'); // Get prompt from URL

    const [prompt, setPrompt] = useState({ text: '' }); // For the edit textarea
    const [isLoading, setIsLoading] = useState(false);
    const [generatedHtml, setGeneratedHtml] = useState(''); // Start with empty HTML
    const [error, setError] = useState<string | null>(null);
    const [isPreviewMaximized, setIsPreviewMaximized] = useState(false);
    const [hasLoadedInitial, setHasLoadedInitial] = useState(false);


    // Effect for the INITIAL website generation from the form page data
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

                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    const html = await response.text();
                    setGeneratedHtml(html);
                    setHasLoadedInitial(true); // Mark initial load as complete
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

    // This function now handles EDITS to the already generated HTML
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
                    html: generatedHtml // Send current HTML for editing
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const newHtml = await response.text();
            setGeneratedHtml(newHtml);
            setPrompt({ text: '' });
        }
        catch (err: any) {
            setError(err.message || "An unknown error occurred.");
            console.error("Failed to generate HTML:", err);
        }
        finally {
            setIsLoading(false);
        }
    }, [prompt, generatedHtml]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleGenerate();
    };

    const handleDownload = useCallback(() => {
        if (!generatedHtml) {
            alert("There is no website content to download.");
            return;
        }
        const blob = new Blob([generatedHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'index.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, [generatedHtml]);

    const toggleMaximize = () => {
        setIsPreviewMaximized(!isPreviewMaximized);
    };

    // Display a loading message for the initial generation
    if (isLoading && !hasLoadedInitial) {
        return <div className="flex items-center justify-center h-full text-white">Generating your website...</div>;
    }


    return (
        <div className="flex flex-col md:flex-row w-full h-full gap-4">

            <div className={`md:w-[26%] relative flex-col ${isPreviewMaximized ? 'hidden' : 'flex'}`}>
                <div className="flex-grow relative">
                    <form onSubmit={handleSubmit} className="absolute bottom-4 left-0 w-full space-y-2">
                        <textarea
                            className="border-2 w-full px-4 py-3 border-zinc-700 rounded-xl 
                             scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-track-transparent resize-none 
                             focus:outline-none focus:border-green-500 bg-transparent text-white transition-colors"
                            name="text"
                            placeholder="e.g., Change the background color to gray"
                            value={prompt.text}
                            onChange={handleChange}
                            rows={3}
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 rounded-xl font-semibold text-lg
                             bg-green-500 hover:bg-green-600 disabled:bg-zinc-600 disabled:cursor-not-allowed
                             transition-all duration-200 ease-in-out"
                        >
                            {isLoading ? 'Generating...' : 'Submit'}
                        </button>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </form>
                </div>
            </div>

            <div className={`transition-all duration-300 ease-in-out ${isPreviewMaximized ? 'w-full h-full' : 'md:w-[74%]'} flex flex-col items-center justify-between`}>
                <div className="preview-screen w-full h-[calc(100%-4rem)] relative border-[1.4px] border-zinc-700 rounded-2xl overflow-hidden">

                    <button onClick={toggleMaximize} className="absolute top-2 right-2 z-10 p-2 bg-black bg-opacity-40 rounded-full hover:bg-opacity-60 transition-all">
                        {isPreviewMaximized ? (
                            <TbArrowsDiagonalMinimize/>
                        ) : (
                            <LuMaximize2/>
                        )}
                    </button>
                    
                    <iframe
                        srcDoc={generatedHtml}
                        title="Website Preview"
                        className="w-full h-full border-0"
                        sandbox="allow-scripts allow-same-origin"
                    />
                </div>

                <div className="download-btn w-full flex justify-center mt-2">
                    <button
                        onClick={handleDownload}
                        className="flex justify-center items-center gap-2 border-[1.4px] text-lg font-semibold
                         px-8 py-3 rounded-full duration-200 ease-in-out hover:text-black border-zinc-700
                         hover:bg-[linear-gradient(45deg,_rgba(65,89,208,1)_0%,_rgba(200,79,192,1)_50%,_rgba(255,205,112,1)_100%)]"
                    >
                        Download
                    </button>
                </div>
            </div>
        </div>
    );
};


// Main page component remains clean, handling the overall structure and Suspense
const Page = () => {
    return (
        <div className="relative min-h-screen bg-[#0c0c0c] text-white overflow-hidden">
            <MockNavbar />
            <div className="w-full h-[calc(100vh-4rem)] mt-2 px-[2vw]">
                <Suspense fallback={<div className="flex items-center justify-center h-full text-white">Loading Preview...</div>}>
                    <PreviewContent />
                </Suspense>
            </div>
        </div>
    )
}

export default Page;
