"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import VideoFeed from "@/components/VideoFeed";

export default function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
        const response = await fetch(`${baseUrl}/api/videos`);
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      }
    }
    fetchVideos();
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Navbar />
      <VideoFeed videos={videos} />

      {/* Background Glow */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/20 blur-[120px] pointer-events-none rounded-full" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-600/20 blur-[120px] pointer-events-none rounded-full" />
    </div>
  );
}
