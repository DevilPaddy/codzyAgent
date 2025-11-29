import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route"; // Adjust path
import { redirect } from "next/navigation";
import clientPromise from "../../../lib/mongodb"; // Adjust path
import ProfileContent from "../../../components/ProfileContent"; 

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    redirect("/");
  }

  // Fetch User "Member Since" date from DB
  const client = await clientPromise;
  const db = client.db();
  const userDoc = await db.collection("users").findOne({ email: session.user.email });
  
  // Convert date to string to pass to Client Component
  const memberSince = userDoc?.createdAt 
    ? new Date(userDoc.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })
    : "N/A";

  return (
    <div className="bg-gray-50 min-h-screen">
      <ProfileContent 
        session={session} 
        memberSince={memberSince} 
      />
    </div>
  );
}