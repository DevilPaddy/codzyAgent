"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '../../../components/Navbar'

const Page = () => {
    const [formData, setFormData] = useState({
        purpose: "",
        sections: "",
        theme: "",
        name: "",
    });

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const fullPrompt = `
            Please generate a complete landing page with the following details:
            - The brand or website name is "${formData.name}".
            - The main purpose of the page is: "${formData.purpose}".
            - It must include these sections: "${formData.sections}".
            - The overall theme should be "${formData.theme}".
        `;

        const encodedPrompt = encodeURIComponent(fullPrompt.trim());

        if (formData.purpose && formData.name) {
            router.push(`/preview?prompt=${encodedPrompt}`);
        } else {
            alert("Please provide at least a name and purpose for your website.");
        }
    };

    return (
        <div>
            {/* nav section */}
            <Navbar />
            <div className="formpage">
                <div className="form-container w-full md:px-[2vw] flex content-center justify-center py-[3vw] md:py-[6vw]">
                    <form onSubmit={handleSubmit} className="md:w-[45%] px-[2vw] py-[2.45vw] rounded-[12px] border-[1.4px] border-zinc-700">
                        <label className="block mb-2 text-zinc-500">
                            What is the main purpose of your landing page?
                            <input
                                type="text"
                                name="purpose"
                                value={formData.purpose}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            />
                        </label>

                        <label className="block mb-2 text-zinc-500">
                            What sections do you want on the page?
                            <input
                                type="text"
                                name="sections"
                                value={formData.sections}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            />
                        </label>

                        <label className="block mb-2 text-zinc-500">
                            Would you like a light, dark or colorfull theme for your page?
                            <input
                                type="text"
                                name="theme"
                                value={formData.theme}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            />
                        </label>

                        <label className="block mb-4 text-zinc-500">
                            What is the name of your website or brand?
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            />
                        </label>

                        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded duration-200 ease-in-out cursor-pointer
                        hover:bg-[linear-gradient(45deg,_rgba(65,89,208,1)_0%,_rgba(200,79,192,1)_50%,_rgba(255,205,112,1)_100%)]">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Page;

