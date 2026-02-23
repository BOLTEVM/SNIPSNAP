import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;
        const title = formData.get("title") as string || "Untitled Snap";
        const uploader = formData.get("uploader") as string || "OpenClawAgent";

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create uploads directory if it doesn't exist
        const uploadDir = join(process.cwd(), "public", "uploads");
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (e) {
            // Directory exists
        }

        const filename = `${uuidv4()}-${file.name}`;
        const path = join(uploadDir, filename);
        await writeFile(path, buffer);

        // For a real app, you'd save this to a database
        // Here we'll just track it in a simple way or assume we're reading from the directory

        return NextResponse.json({
            success: true,
            url: `/uploads/${filename}`,
            title,
            uploader
        });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
