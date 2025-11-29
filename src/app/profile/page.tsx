import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route"; 
import { redirect } from "next/navigation";
import clientPromise from "../../../lib/mongodb";
import LogoutButton from "../../../components/Logedout";
import Image from "next/image";

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

export default async function ProfilePage() {
  // 1. Get Session
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    redirect("/api/auth/signin");
  }

  const client = await clientPromise;
  const db = client.db();
  
  const user = await db.collection("users").findOne({ email: session.user.email });
  
  const projects = [
    { id: 1, name: "Codzy Generator", status: "Live", url: "#" },
    { id: 2, name: "Portfolio V1", status: "In Progress", url: "#" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 text-gray-900 font-sans">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            My Profile
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Manage your account settings and view your projects.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          
          <div className="h-32 bg-gradient-to-r from-blue-50 to-indigo-50"></div>

          <div className="px-8 pb-8">
            {/* Avatar & Basic Info */}
            <div className="relative flex justify-between items-end -mt-12 mb-6">
              <div className="relative">
                <div className="h-24 w-24 rounded-full ring-4 ring-white overflow-hidden bg-white shadow-md">
                  <Image 
                    src={session.user.image || "/default-avatar.png"} 
                    alt="Profile" 
                    width={96} 
                    height={96}
                    className="object-cover"
                  />
                </div>
              </div>
              
              <div className="mb-1 text-right">
                 <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    Active Account
                 </span>
              </div>
            </div>

            {/* User Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Full Name
                </label>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {session.user.name}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email Address
                </label>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {session.user.email}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member Since
                </label>
                <p className="mt-1 text-sm font-medium text-gray-700">
                  {user?.createdAt ? formatDate(new Date(user.createdAt)) : "N/A"}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Account ID
                </label>
                <p className="mt-1 text-sm font-mono text-gray-500 truncate">
                  {user?._id.toString()}
                </p>
              </div>
            </div>

            <LogoutButton />
          </div>
        </div>

        {/* Projects Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">My Projects</h2>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              + New Project
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div 
                  key={project.id} 
                  className="group relative flex items-center space-x-3 rounded-xl border border-gray-200 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 hover:border-indigo-300 transition-all"
                >
                  <div className="min-w-0 flex-1">
                    <a href={project.url} className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true" />
                      <p className="text-sm font-medium text-gray-900">{project.name}</p>
                      <p className="truncate text-xs text-gray-500">{project.status}</p>
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No projects found.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}