"use client";

import { useRef, useEffect, useState } from "react";
import { Heart, MessageCircle, Share2, Music2 } from "lucide-react";
import { motion } from "framer-motion";

interface VideoCardProps {
    url: string;
    title: string;
    uploader: string;
    likes: number;
}

export default function VideoCard({ url, title, uploader, likes }: VideoCardProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.7,
        };

        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    videoRef.current?.play();
                    setIsPlaying(true);
                } else {
                    videoRef.current?.pause();
                    setIsPlaying(false);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, options);
        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(videoRef.current);
            }
        };
    }, []);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="snap-child relative w-full flex items-center justify-center bg-black overflow-hidden group">
            <video
                ref={videoRef}
                src={url}
                className="h-full w-full object-cover md:w-[450px] md:h-[800px] cursor-pointer shadow-2xl"
                loop
                playsInline
                onClick={togglePlay}
            />

            {/* Overlay Content */}
            <div className="absolute inset-0 flex items-end justify-between p-6 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none md:w-[450px] md:mx-auto">
                <div className="flex flex-col gap-3 pointer-events-auto max-w-[80%]">
                    <h3 className="text-xl font-bold text-white drop-shadow-md">@{uploader}</h3>
                    <p className="text-sm text-gray-200 line-clamp-2 drop-shadow-sm">{title}</p>
                    <div className="flex items-center gap-2 overflow-hidden">
                        <Music2 className="w-4 h-4 text-white shrink-0 animate-pulse" />
                        <div className="whitespace-nowrap animate-marquee">
                            <span className="text-sm text-gray-300">Original Audio - {uploader}</span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-6 pointer-events-auto">
                    <ActionButton icon={<Heart className="w-7 h-7" />} label={likes.toString()} />
                    <ActionButton icon={<MessageCircle className="w-7 h-7" />} label="24" />
                    <ActionButton icon={<Share2 className="w-7 h-7" />} label="Share" />
                    <div className="w-full aspect-square rounded-full bg-gradient-to-tr from-pink-500 to-violet-600 p-1 animate-spin-slow">
                        <div className="w-full h-full bg-black rounded-full overflow-hidden">
                            <div className="w-full h-full bg-white/20" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ActionButton({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <div className="flex flex-col items-center gap-1 group cursor-pointer">
            <motion.div
                whileTap={{ scale: 0.8 }}
                className="p-3 bg-white/10 rounded-full backdrop-blur-md hover:bg-white/20 transition-colors"
            >
                {icon}
            </motion.div>
            <span className="text-xs font-semibold text-white">{label}</span>
        </div>
    );
}
