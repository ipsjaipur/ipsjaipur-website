'use client';

import React, { useState } from 'react';


export default function SidebarWidgets({
    merittoFormEmbed,
    videos = [],
    banners = []
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeVideoUrl, setActiveVideoUrl] = useState('');

    const openVideoPopup = (url) => {
        setActiveVideoUrl(url);
        setIsOpen(true);
    };

    const closeVideoPopup = () => {
        setActiveVideoUrl('');
        setIsOpen(false);
    };

    return (
        <div className="w-full flex flex-col gap-6 text-sm">

            <div className="w-full bg-[#e87816] border border-[#d35400] overflow-hidden shadow-sm">
                <div className="text-white text-center py-2.5 font-bold tracking-wide text-lg">
                    Enquiry
                </div>
                <div className=" flex flex-col gap-3">
                    {merittoFormEmbed}
                </div>
            </div>
            {videos.map((video, index) => (
                <div
                    key={index} className="w-full border border-gray-200 shadow-sm flex flex-col"
                >
                    <div
                        onClick={() => openVideoPopup(video.videoUrl)}
                        className="relative w-full aspect-video cursor-pointer group bg-black overflow-hidden"
                    >
                        <iframe
                            src={video.videoUrl}
                            title={video.title}
                            className="w-full h-full pointer-events-none"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />

                        <div
                            onClick={() =>
                                openVideoPopup(
                                    video.videoUrl.includes("?")
                                        ? `${video.videoUrl}&autoplay=1`
                                        : `${video.videoUrl}?autoplay=1`
                                )
                            }
                            className="absolute inset-0 cursor-pointer z-10"
                        />
                    </div>
                </div>
            ))}
            {banners.map((banner, index) => (
                <div key={index} className="w-full bg-[#e87816] border border-[#d35400] overflow-hidden shadow-sm">
                    <div>
                        <div className="text-center font-bold bg-[#e87816] text-white text-[16px] md:text-[18px] px-3 md:px-5 py-2 mb-0">
                            {banner.title}
                        </div>
                        <div className=" flex flex-col gap-3">
                            <div
                                key={index}
                                className="w-full border border-gray-200 shadow-sm flex flex-col"
                            >
                                <div className="w-full overflow-hidden bg-gray-100">
                                    <img
                                        src={banner.imageUrl}
                                        alt={banner.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div></div>
                </div>
            ))}

            {/* < div className="w-full border border-gray-200 shadow-sm flex flex-col" >
                <div className="bg-[#e87816] text-white text-center py-2.5 font-bold tracking-wide text-lg">
                    Campus News
                </div>
                < div className="p-2 flex flex-col divide-y divide-gray-100 bg-white" >
                    {
                        [1, 2, 3, 4, 5].map((item) => (
                            <div key={item} className="py-2 first:pt-0 last:pb-0 flex gap-2 items-start">
                                <div className="w-12 h-12 bg-gray-200 shrink-0 border border-gray-300 rounded-sm" />
                                <div className="flex flex-col gap-1.5 w-full pt-0.5">
                                    <div className="h-3 bg-gray-200 w-11/12 rounded-sm" />
                                    <div className="h-3 bg-gray-100 w-8/12 rounded-sm" />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div >

            < div className="w-full border border-gray-200 shadow-sm flex flex-col" >
                <div className="bg-[#e87816] text-white text-center py-2.5 font-bold tracking-wide text-lg">
                    Quick Links
                </div>
                <div className="flex flex-col border-t border-gray-200 bg-white">
                    {[1, 2, 3, 4, 5, 6, 7].map((link) => (
                        <div
                            key={link}
                            className="px-3 py-2.5 text-xs text-gray-400 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 flex items-center justify-between"
                        >
                            <div className="h-3 bg-gray-200 rounded-sm w-1/2" />
                            <span className="text-gray-300 text-[10px]">&gt;</span>
                        </div>
                    ))}
                </div>
            </div > */}

            {
                isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 bg-opacity-80 p-4 animate-fadeIn">
                        <div className="absolute inset-0" onClick={closeVideoPopup}></div>

                        <div className="relative w-full max-w-2xl bg-black rounded-lg shadow-2xl z-10">
                            <button
                                onClick={closeVideoPopup}
                                className="cursor-pointer absolute -top-4 -right-2 z-20 text-xl md:text-2xl flex items-center justify-center w-10 h-10 rounded-full bg-black/60 text-white text-3xl font-light hover:text-gray-300 shadow-md transition-colors"
                                aria-label="Close video popup"
                            >
                                &times;
                            </button>

                            <div className="relative aspect-video w-full max-h-[80vh]">
                                <iframe
                                    src={activeVideoUrl}
                                    title="Video Player"
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    </div>
                )
            }

        </div >
    );
}