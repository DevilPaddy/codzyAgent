import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route"; 
import mongoose from "mongoose";
import Project from "../../../../../model/Project";

interface ProjectBody {
  htmlCode: string;
  projectName?: string;
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
      throw new Error("Please define the MONGODB_URI environment variable inside .env");
    }

    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(MONGODB_URI);
    }

    const body: ProjectBody = await req.json();
    const { htmlCode, projectName } = body;

    if (!htmlCode) {
         return NextResponse.json({ error: "No code provided" }, { status: 400 });
    }

    const newProject = await Project.create({
      userEmail: session.user.email,
      projectName: projectName || "Untitled Project",
      code: {
        html: htmlCode,
      },
    });

    return NextResponse.json(
      { message: "Project saved", projectId: newProject._id }, 
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Save Error:", error);
    return NextResponse.json(
      { error: "Failed to save project", details: error.message }, 
      { status: 500 }
    );
  }
}