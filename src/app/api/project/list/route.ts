import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route"; 
import mongoose from "mongoose";

import Project from "../../../../../model/Project";


export async function GET() {
  try {
    console.log("🟢 API HIT: /api/project/list");

    // 1. Check Session
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      console.log("🔴 API Error: No session or email found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("👤 User requesting:", session.user.email);

    // 2. Connect to Database
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
      console.log("🔴 API Error: MONGODB_URI is missing in .env");
      throw new Error("MONGODB_URI is missing");
    }

    if (mongoose.connection.readyState !== 1) {
      console.log("🟡 API: Connecting to MongoDB...");
      await mongoose.connect(MONGODB_URI);
      console.log("🟢 API: DB Connected.");
    }

    // 3. Find Projects
    // We filter by 'userEmail' to match the logged-in user
    const projects = await Project.find({ userEmail: session.user.email })
                                  .sort({ createdAt: -1 });

    console.log(`✅ API: Found ${projects.length} projects for this user.`);

    return NextResponse.json({ projects }, { status: 200 });

  } catch (error: any) {
    console.error("🔴 API CRITICAL ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects", details: error.message }, 
      { status: 500 }
    );
  }
}