"use client";

import { signIn } from "next-auth/react";

export default function AuthButtons() {
  return (
    <div className="flex flex-col gap-4">
      {/* Google Button */}
      <button
        onClick={() => signIn("google")}
        className="flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
      >
        <img 
            src="https://authjs.dev/img/providers/google.svg" 
            alt="Google logo" 
            className="h-5 w-5" 
        />
        Continue with Google
      </button>

      {/* GitHub Button */}
      <button
        onClick={() => signIn("github")}
        className="flex items-center justify-center gap-2 rounded-full bg-[#24292F] px-6 py-3 text-sm font-medium text-white hover:bg-[#24292F]/90 transition-all shadow-sm"
      >
        <img 
            src="https://authjs.dev/img/providers/github.svg" 
            alt="GitHub logo" 
            className="h-5 w-5 invert" 
        />
        Continue with GitHub
      </button>
    </div>
  );
}