import React from 'react';
export default function PageBanner({ title, bgImageUrl }) {
    return (
        <div
            className="relative w-full h-[200px] md:h-[320px] bg-cover bg-center bg-no-repeat flex items-center justify-center overflow-hidden"
            style={{ backgroundImage: `url('${bgImageUrl}')` }}
        >
            <div className="absolute inset-0 after:absolute after:inset-0 after:bg-[linear-gradient(to_right,#100018_0%,#26006c_38%,#110038_71%)] after:opacity-75 pointer-events-none" />
            {title && (
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-[28px] md:text-[40px] font-bold text-white tracking-wide drop-shadow-sm select-none">
                        {title}
                    </h1>
                </div>
            )}
        </div>
    );
}