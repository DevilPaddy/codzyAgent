import Link from "next/link";
import { FiMail, FiFileText, FiGithub, FiHelpCircle } from "react-icons/fi";

export default function NeedHelpPage() {
  return (
    <div className="min-h-screen bg-white text-black selection:bg-gray-200 selection:text-black">
      {/* Main Container */}
      <main className="mx-auto max-w-3xl px-6 py-24">
        
        {/* Header Section */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4">
            How can we help?
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Have questions about Codzy? Find answers below or get in touch with our support team.
          </p>
        </div>

        <div className="space-y-16">
          {/* Section 1: Quick Support Options (Grid) */}
          <section>
            <h2 className="text-2xl font-bold mb-8 pb-2 border-b border-gray-200">
              Support Channels
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              
              {/* Option A: Documentation */}
              <Link href="/#tutorials" className="group block h-full">
                <div className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-black hover:shadow-sm">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-black group-hover:bg-black group-hover:text-white transition-colors">
                    <FiFileText size={20} />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">Documentation & Tutorials</h3>
                  <p className="flex-1 text-gray-600">
                    Browse our guides and examples to learn how to use Codzy effectively.
                  </p>
                </div>
              </Link>

               {/* Option B: Email Support */}
               <a href="mailto:tech.codzy@gmail.com" className="group block h-full">
                <div className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-black hover:shadow-sm">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-black group-hover:bg-black group-hover:text-white transition-colors">
                    <FiMail size={20} />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">Email Support</h3>
                  <p className="flex-1 text-gray-600">
                    Can't find what you need? Drop us an email and we'll get back to you.
                  </p>
                  <span className="mt-4 text-sm font-medium text-gray-900">tech.codzy@gmail.com</span>
                </div>
              </a>

            </div>
          </section>

          {/* Section 2: Frequently Asked Questions */}
          <section>
            <h2 className="text-2xl font-bold mb-8 pb-2 border-b border-gray-200 flex items-center gap-2">
             <FiHelpCircle /> Frequently Asked Questions
            </h2>
            
            <div className="divide-y divide-gray-100">
              
              {/* FAQ Item 1 */}
              <div className="py-6">
                <h3 className="text-lg font-semibold mb-2">
                  I can't log in with Google/GitHub. What should I do?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  First, try clearing your browser cache and cookies. If the issue persists, ensure you are not using an incognito window that might block third-party cookies required for authentication.
                </p>
              </div>

               {/* FAQ Item 2 */}
               <div className="py-6">
                <h3 className="text-lg font-semibold mb-2">
                  Is Codzy free to use?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Yes, Codzy is currently free for all users during our beta period. We will announce any future pricing plans well in advance.
                </p>
              </div>

              {/* FAQ Item 3 */}
              <div className="py-6">
                <h3 className="text-lg font-semibold mb-2">
                  How do I delete my account?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Please send an email to our support team from the email address associated with your account, and we will process your request within 24 hours.
                </p>
              </div>

            </div>
          </section>

          {/* Section 3: Community/Social (Optional) */}
          <section className="rounded-2xl bg-gray-50 p-8 text-center border border-gray-100">
            <h2 className="text-xl font-bold mb-4">Still stuck?</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              If you have a technical question or want to request a feature, check out our GitHub repository.
            </p>
            <a 
              href="https://github.com/yourusername/codzy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 transition-all"
            >
              <FiGithub size={18}/> View on GitHub
            </a>
          </section>

        </div>
      </main>
    </div>
  );
}