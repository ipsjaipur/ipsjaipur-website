'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowRight, Briefcase, GraduationCap, Users, TrendingUp } from 'lucide-react';

export default function BridgingTheorySection() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-100/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative bg-white rounded-3xl shadow-lg border border-orange-100/50 overflow-hidden">
          <div className="relative p-8 md:p-12 lg:p-12">
            <div className="lg:flex justify-between items-center">
              <div className="lg:space-y-4 space-y-6 w-full max-w-[800px]">
                <h2 className="lg:text-start text-center text-2xl md:text-2xl lg:text-3xl font-bold text-gray-900 leading-medium">
                  Bridging{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                    Classroom Theory
                  </span>{' '}
                  & Corporate Reality
                </h2>
                <p className="lg:text-start text-center text-base md:text-lg text-gray-600 leading-relaxed">
                  Our Board of Advisors conducts periodic curriculum reviews, delivers executive masterclasses, and
                  facilitates direct On Job Training (OJT) opportunities with Fortune 500 companies and leading Indian
                  MNCs.
                </p>
              </div>
              <div className="lg:text-start text-center lg:pt-0 pt-6">
                <Link
                  href="/placements"
                  className="group lg:text-[16px] text-[14px] inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white font-semibold lg:px-8 px-6 lg:py-4 py-4 rounded-full shadow-lg hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-500 transform hover:scale-105"
                >
                  <span>Explore Placements</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite 1.5s;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .bg-size-200 {
          background-size: 200% auto;
        }
        .bg-pos-0 {
          background-position: 0% center;
        }
        .hover\\:bg-pos-100:hover {
          background-position: 100% center;
        }
      `}</style>
    </section>
  );
}
