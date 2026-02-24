export const dynamic = "force-static";
import { NextRequest, NextResponse } from "next/server";
import { readdir } from "fs/promises";
import { join } from "path";

export async function GET() {
    try {
        const uploadDir = join(process.cwd(), "public", "uploads");
        let files: string[] = [];

        try {
            files = await readdir(uploadDir);
        } catch (e) {
            // Directory doesn't exist yet, return empty list
            return NextResponse.json([]);
        }

        const videos = files
            .filter(file => file.endsWith(".mp4") || file.endsWith(".webm"))
            .map((file, index) => {
                // In a real app, you'd match these with DB records for title/uploader
                // For this demo, we'll parse the filename and use defaults
                return {
                    id: file,
                    url: `/uploads/${file}`,
                    title: "Check out this Snap!",
                    uploader: "ClawCreator",
                    likes: Math.floor(Math.random() * 1000)
                };
            });

        // If no videos, return some placeholders so the UI isn't empty initially
        if (videos.length === 0) {
            return NextResponse.json([
                {
                    id: "placeholder-1",
                    url: "https://v1.bgp.me/360.mp4", // Small sample video if available (common placeholder)
                    title: "Welcome to SnipSnap! Start uploading content with OpenClaw.",
                    uploader: "SnipSnapTeam",
                    likes: 1337
                }
            ]);
        }

        return NextResponse.json(videos);
    } catch (error) {
        console.error("Listing videos error:", error);
        return NextResponse.json({ error: "Failed to list videos" }, { status: 500 });
    }
}
