import React from 'react';

const SidebarLayout = ({ tabs, activeTab, onTabClick, children }) => {
    return (
        <div className="flex flex-col md:flex-row w-full gap-6 ">
            {/* Sidebar Navigation */}
            <aside className="hidden md:block w-full md:w-64 flex-shrink-0">
                <div className="sticky top-20 bg-[#fafafa] border border-[#ddd] p-3 flex flex-col gap-3">
                    {tabs.map((tab) => {
                        const isCurrentActive = String(activeTab) === String(tab.id);
                        return (
                            <button
                                key={tab.id}
                                onClick={() => onTabClick(tab.id)}
                                className={`w-full text-left p-4 text-[15px] font-semibold border transition-all duration-200 font-[Rubik]
                                    ${isCurrentActive
                                        ? 'bg-[#ff7a00] border-[#ff7a00] text-[#fff]'
                                        : 'bg-[#fff7ed] border-[#8a8a8a] text-[#8a8a8a] rounded-sm'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </aside>
            <aside className="md:hidden block w-full flex-shrink-0 sticky top-16  z-40 bg-white md:bg-transparent shadow-sm">
                <div className="bg-white border-b border-[#ddd] py-3 px-2 md:border flex flex-row md:flex-col gap-3 overflow-x-auto whitespace-nowrap overflow-x-auto scrollbar-hide">
                    {tabs.map((tab) => {
                        const isCurrentActive = String(activeTab) === String(tab.id);
                        return (
                            <button
                                key={tab.id}
                                onClick={() => onTabClick(tab.id)}
                                className={`cursor-pointer text-center md:text-left px-5 py-2.5 md:p-4 text-xs font-normal transition-all duration-200 font-[Rubik] inline-block md:block
                                    ${isCurrentActive
                                        ? 'bg-[#ff7a00] text-[#fff] rounded-full md:rounded-none'
                                        : 'text-[#8a8a8a] md:bg-[#fff7ed] md:border md:border-[#8a8a8a] md:rounded-sm'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </aside>


            {/* Main Content Area */}
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
};

export default SidebarLayout;