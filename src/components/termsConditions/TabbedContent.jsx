'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Shield, RefreshCcw, AlertCircle } from 'lucide-react';
import TermsContent from './content/TermsContent';
import PrivacyContent from './content/PrivacyContent';
import RefundContent from './content/RefundContent';
import DisclaimerContent from './content/DisclaimerContent';

const tabs = [
  {
    id: 'terms',
    label: 'Terms & Conditions',
    icon: FileText,
    component: TermsContent,
  },
  {
    id: 'privacy',
    label: 'Privacy Policy',
    icon: Shield,
    component: PrivacyContent,
  },
  {
    id: 'refund',
    label: 'Refund & Cancellation',
    icon: RefreshCcw,
    component: RefundContent,
  },
  {
    id: 'disclaimer',
    label: 'Disclaimer',
    icon: AlertCircle,
    component: DisclaimerContent,
  },
];

export default function TabbedContent() {
  const [activeTab, setActiveTab] = useState('terms');
  const tabsContainerRef = useRef(null);
  const tabRefs = useRef({});

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component;

  // Scroll active tab into center view on mobile
  useEffect(() => {
    if (tabsContainerRef.current && tabRefs.current[activeTab]) {
      const container = tabsContainerRef.current;
      const activeButton = tabRefs.current[activeTab];

      const containerWidth = container.offsetWidth;
      const buttonLeft = activeButton.offsetLeft;
      const buttonWidth = activeButton.offsetWidth;

      // Calculate scroll position to center the button
      const scrollPosition = buttonLeft - containerWidth / 2 + buttonWidth / 2;

      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  }, [activeTab]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <section className="py-12 md:py-16 lg:py-20  bg-gradient-to-br from-gray-50 via-blue-50/30 to-orange-50/30">
      <div className="max-w-[1320px] mx-auto lg:px-8 px-[16px] xl:px-0">
        {/* Tabs Navigation */}
        <div className="bg-white rounded-lg shadow-sm p-2 mb-8 overflow-x-auto scrollbar-hide" ref={tabsContainerRef}>
          <div className="flex gap-2 min-w-max md:min-w-0 md:grid md:grid-cols-2 lg:grid-cols-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  ref={(el) => (tabRefs.current[tab.id] = el)}
                  onClick={() => handleTabClick(tab.id)}
                  className={`cursor-pointer relative flex items-center justify-center gap-2 px-4 py-3 rounded-md font-medium transition-all duration-300 flex-1 min-w-[200px] md:min-w-0 ${
                    isActive ? 'text-white bg-[#e67e22] shadow-md' : 'text-gray-700 hover:bg-gray-100 hover:shadow-sm'
                  }`}
                >
                  <Icon size={18} className="flex-shrink-0" />
                  <span className="text-sm md:text-base whitespace-nowrap">{tab.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-[#e67e22] rounded-md -z-10"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-sm p-6 md:p-8 lg:p-10"
          >
            {ActiveComponent && <ActiveComponent />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
