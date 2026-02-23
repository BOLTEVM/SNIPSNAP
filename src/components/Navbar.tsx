"use client";

import { ConnectButton } from "thirdweb/react";
import { client } from "@/lib/thirdweb";
import { Scissors } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
            <div className="flex items-center gap-2 group cursor-pointer">
                <div className="p-2 bg-gradient-to-tr from-pink-500 to-violet-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Scissors className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    SNIPSNAP
                </span>
            </div>

            <div>
                <ConnectButton
                    client={client}
                    theme="dark"
                    connectButton={{
                        className: "!bg-white/10 !hover:bg-white/20 !border !border-white/20 !rounded-full !px-6 !py-2 !text-sm !font-semibold !transition-all !duration-300",
                        label: "Connect"
                    }}
                />
            </div>
        </nav>
    );
}
