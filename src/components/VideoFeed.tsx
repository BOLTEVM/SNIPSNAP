"use client";

import VideoCard from "./VideoCard";

interface Video {
    id: string;
    url: string;
    title: string;
    uploader: string;
    likes: number;
}

interface VideoFeedProps {
    videos: Video[];
}

export default function VideoFeed({ videos }: VideoFeedProps) {
    return (
        <main className="snap-y-container w-full h-screen bg-black">
            {videos.length > 0 ? (
                videos.map((video) => (
                    <VideoCard
                        key={video.id}
                        url={video.url}
                        title={video.title}
                        uploader={video.uploader}
                        likes={video.likes}
                    />
                ))
            ) : (
                <div className="h-screen flex items-center justify-center text-gray-500 flex-col gap-4">
                    <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
                    <p className="font-medium">Finding Snaps...</p>
                </div>
            )}
        </main>
    );
}
