'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  School,
  GraduationCap,
  Briefcase,
  Bot,
  TrendingUp,
  Megaphone,
  Globe,
  Trophy,
  Users,
  Building2,
  Network,
  MessageSquare,
  Factory,
  DollarSign,
  BookOpen,
  Dumbbell,
  Lightbulb,
  Handshake,
  ChevronDown,
  Cloud,
  Star,
  Zap,
  Target,
  Award,
  Heart,
  Shield,
  Cpu,
  BarChart,
  FlaskConical,
  Rocket,
  Layers,
  Eye,
  Clock,
  MapPin,
  Phone,
  Mail,
  Link,
  Tag,
  Flame,
  Leaf,
  Compass,
} from 'lucide-react';
import parse from 'html-react-parser';
import CourseNavigation from '../CourseNavigation';
import CourseQuickLinks from '../CourseQuickLinks';
import Image from 'next/image';

// ── Icon registry ──────────────────────────────────────────────────────────────
const ICON_MAP = {
  CheckCircle2,
  School,
  GraduationCap,
  Briefcase,
  Bot,
  TrendingUp,
  Megaphone,
  Globe,
  Trophy,
  Users,
  Building2,
  Network,
  MessageSquare,
  Factory,
  DollarSign,
  BookOpen,
  Dumbbell,
  Lightbulb,
  Handshake,
  Cloud,
  Star,
  Zap,
  Target,
  Award,
  Heart,
  Shield,
  Cpu,
  BarChart,
  FlaskConical,
  Rocket,
  Layers,
  Eye,
  Clock,
  MapPin,
  Phone,
  Mail,
  Link,
  Tag,
  Flame,
  Leaf,
  Compass,
};

function getIcon(name) {
  return ICON_MAP[name] || Lightbulb;
}

// ── Navigation sections (static — used for the sticky nav only) ────────────────
const NAV_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'syllabus', label: 'Syllabus' },
  { id: 'eligibility', label: 'Eligibility' },
  { id: 'admission-process', label: 'Admission Process' },
  { id: 'documents-required', label: 'Documents Required' },
  { id: 'selection-procedure', label: 'Selection Procedure' },
  { id: 'fee-structure', label: 'Fee Structure' },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function BCACourseDetail({ bcaContent = {} }) {
  const [openFAQ, setOpenFAQ] = useState(0);

  const imgBase = process.env.NEXT_PUBLIC_IMG_PATH || '';

  // ── Pull raw data — no fallbacks ─────────────────────────────────────────
  const overviewData = bcaContent?.overview || {};
  const syllabusData = bcaContent?.syllabus || {};
  const specsData = bcaContent?.specializations || {};
  const admissionData = bcaContent?.admissionProcess || {};
  const docsData = bcaContent?.documentsRequired || {};
  const selectionData = bcaContent?.selectionProcedure || {};
  const feeData = bcaContent?.feeStructure || {};
  const faqData = bcaContent?.faq || {};
  const sidebarData = bcaContent?.sidebar || {};

  // ── Overview ──────────────────────────────────────────────────────────────
  const overviewTitle = overviewData.overviewTitle || '';
  const overviewDuration = overviewData.overviewDuration || '';
  const overviewCaption = overviewData.overviewCaption || '';
  const rtuLogo = overviewData.rtuLogoUrl || '';
  const aicteLogo = overviewData.aicteLogoUrl || '';
  const approvalImage = overviewData.approvalImageUrl || '';
  const approvalCaption = overviewData.approvalImageCaption || '';
  const highlightsHeading = overviewData.highlightsHeading || '';

  const highlights =
    overviewData.highlights?.length > 0
      ? [...overviewData.highlights].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      : [];

  const descriptionParagraphs =
    overviewData.descriptionParagraphs?.length > 0 ? overviewData.descriptionParagraphs : [];

  const whyIpsHeading = overviewData.whyIpsHeading || '';
  const whyIpsIntro = overviewData.whyIpsIntro || '';
  const whyIpsPoints = overviewData.whyIpsPoints?.length > 0 ? overviewData.whyIpsPoints : [];

  const hasOverview = !!(overviewTitle || highlights.length || descriptionParagraphs.length);

  // ── Syllabus ──────────────────────────────────────────────────────────────
  const syllabusHeading = syllabusData.syllabusHeading || '';
  const syllabusItems =
    syllabusData.syllabusItems?.length > 0
      ? [...syllabusData.syllabusItems].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      : [];
  const hasSyllabus = syllabusItems.length > 0;

  // ── Specializations + Eligibility ─────────────────────────────────────────
  const specsHeading = specsData.specializationsHeading || '';
  const specializations =
    specsData.specializations?.length > 0
      ? [...specsData.specializations].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map((s) => s.name)
      : [];
  const eligibilityHeading = specsData.eligibilityHeading || '';
  const eligibilityPoints =
    specsData.eligibilityPoints?.length > 0
      ? [...specsData.eligibilityPoints].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map((p) => p.text)
      : [];
  const eligibilityPriorities =
    specsData.eligibilityPriorities?.length > 0
      ? [...specsData.eligibilityPriorities].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map((p) => p.text)
      : [];
  const hasSpecializations = eligibilityPoints.length > 0;

  // ── Admission ─────────────────────────────────────────────────────────────
  const admissionHeading = admissionData.admissionHeading || '';
  const admissionIntro = admissionData.admissionIntro || '';
  const admissionSteps =
    admissionData.admissionSteps?.length > 0
      ? [...admissionData.admissionSteps].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      : [];
  const hasAdmission = admissionSteps.length > 0 || !!admissionIntro;

  // ── Documents ─────────────────────────────────────────────────────────────
  const documentsHeading = docsData.documentsHeading || '';
  const documents =
    docsData.documents?.length > 0 ? [...docsData.documents].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) : [];
  const hasDocuments = documents.length > 0;

  // ── Selection ─────────────────────────────────────────────────────────────
  const selectionHeading = selectionData.selectionHeading || '';
  const selectionSteps =
    selectionData.selectionSteps?.length > 0
      ? [...selectionData.selectionSteps].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      : [];
  const hasSelection = selectionSteps.length > 0;

  // ── Fee ───────────────────────────────────────────────────────────────────
  const feeHeading = feeData.feeHeading || '';
  const feeEnglishText = feeData.feeEnglishText || '';
  const feeHindiText = feeData.feeHindiText || '';
  const hasFee = !!(feeEnglishText || feeHindiText);

  // ── FAQ ───────────────────────────────────────────────────────────────────
  const faqs = faqData.faqs?.length > 0 ? [...faqData.faqs].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) : [];
  const hasFaqs = faqs.length > 0;

  // ── Sidebar videos ────────────────────────────────────────────────────────
  const sidebarVideos =
    sidebarData.sidebarVideos?.length > 0
      ? [...sidebarData.sidebarVideos]
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
          .map((v) => ({ url: v.url, title: v.title }))
      : [];

  return (
    <section className="max-w-[1400px] mx-auto md:px-[16px] w-full md:pt-[24px] pb-[64px]">
      <div className="flex flex-col xl:flex-row gap-6">
        {/* ── Main Content ─────────────────────────────────────────────────── */}
        <motion.div
          className="flex-1 text-[#444444]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <div className="flex flex-col md:flex-row md:gap-6 gap-4">
            <CourseNavigation sections={NAV_SECTIONS} />

            <div className="border border-[#e9e9e9] bg-white rounded-lg p-6 md:mx-0 mx-[16px]">
              <motion.div initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                {/* ── OVERVIEW ─────────────────────────────────────────────── */}
                {hasOverview && (
                  <div className="mb-8" id="overview">
                    {(overviewTitle || rtuLogo || aicteLogo) && (
                      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
                        {rtuLogo && (
                          <div className="w-20 h-20 md:w-24 md:h-24 shrink-0">
                            <Image
                              width={100}
                              height={100}
                              src={rtuLogo}
                              alt="RTU Logo"
                              className="w-full h-full object-contain"
                            />
                          </div>
                        )}
                        <div className="text-center flex-1">
                          {overviewTitle && (
                            <h1 className="text-xl md:text-[22px] font-bold text-black mb-2 font-rubik">
                              {overviewTitle}
                            </h1>
                          )}
                          {overviewDuration && (
                            <p className="lg:text-[16px] text-[14px] font-rubik font-semibold mb-1">
                              Duration: {overviewDuration}
                            </p>
                          )}
                          {overviewCaption && (
                            <p className="text-[10px] font-semibold text-black font-rubik">{overviewCaption}</p>
                          )}
                        </div>
                        {aicteLogo && (
                          <div className="w-20 h-20 md:w-24 md:h-24 shrink-0">
                            <Image
                              width={100}
                              height={100}
                              src={aicteLogo}
                              alt="AICTE Logo"
                              className="w-full h-full object-contain"
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {/* Highlights */}
                    {highlights.length > 0 && (
                      <div className="mb-8" id="highlights">
                        {highlightsHeading && (
                          <h4 className="text-lg font-bold text-gray-800 mb-4 font-rubik">{highlightsHeading}</h4>
                        )}
                        <div className="space-y-3">
                          {highlights.map((highlight, index) => {
                            const IconComp = getIcon(highlight.iconName);
                            return (
                              <div key={index}>
                                <motion.div
                                  className="flex gap-3 items-start"
                                  initial={{ opacity: 0, x: -20 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true, amount: 0.3 }}
                                  transition={{ duration: 0.2, delay: index * 0.01 }}
                                >
                                  <IconComp className="w-5 h-5 text-[#ffa705] shrink-0 mt-1" />
                                  <div className="flex flex-col gap-1">
                                    <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik leading-relaxed">
                                      {highlight.text}
                                    </p>
                                    {highlight.hindiText && (
                                      <p className="text-[#666666] text-sm leading-relaxed font-rubik">
                                        {highlight.hindiText}
                                      </p>
                                    )}
                                  </div>
                                </motion.div>
                                {index < highlights.length - 1 && <hr className="my-3 border-gray-200" />}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Approval image + caption */}
                    {approvalImage && (
                      <div className="text-center mb-4">
                        <Image
                          width={180}
                          height={100}
                          src={approvalImage}
                          alt="Approval"
                          className="object-contain mx-auto"
                        />
                      </div>
                    )}
                    {approvalCaption && (
                      <p className="text-center text-xs text-[#444444] mb-4 font-medium font-rubik">
                        {approvalCaption}
                      </p>
                    )}

                    {/* Description paragraphs */}
                    {descriptionParagraphs.length > 0 && (
                      <div className="space-y-4 mb-8">
                        {descriptionParagraphs.map((para, i) => (
                          <p key={i} className="text-[#444444] lg:text-[16px] text-[14px] font-rubik leading-[1.8]">
                            {parse(para)}
                          </p>
                        ))}
                      </div>
                    )}

                    {/* Why IPS */}
                    {(whyIpsHeading || whyIpsIntro || whyIpsPoints.length > 0) && (
                      <div className="space-y-4 mb-8">
                        {whyIpsHeading && (
                          <h2 className="text-lg font-bold text-gray-800 mb-4 font-rubik">{whyIpsHeading}</h2>
                        )}
                        {whyIpsIntro && (
                          <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik leading-[1.8] mb-1">
                            {whyIpsIntro}
                          </p>
                        )}
                        {whyIpsPoints.length > 0 && (
                          <ul className="list-disc pl-4 text-[#444444] lg:text-[16px] text-[14px] font-rubik leading-[1.8]">
                            {whyIpsPoints.map((point, i) => (
                              <li key={i}>{parse(point)}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* ── SYLLABUS ─────────────────────────────────────────────── */}
                {hasSyllabus && (
                  <div id="syllabus" className="mb-8">
                    {syllabusHeading && (
                      <h4 className="text-lg font-bold text-gray-800 mb-4 font-rubik">{syllabusHeading}</h4>
                    )}
                    <div className="space-y-2">
                      {syllabusItems.map((item, index) => {
                        const rawHref = item.pdfFile?.startsWith('http')
                          ? item.pdfFile
                          : item.pdfFile?.startsWith('/')
                            ? item.pdfFile
                            : `/${item.pdfFile}`;
                        return (
                          <div key={index} className="flex items-start gap-3">
                            <Lightbulb className="w-4 h-4 text-[#ffa705] shrink-0 mt-1" />
                            <a
                              href={rawHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#ffa705] hover:underline lg:text-[16px] text-[14px] font-rubik"
                            >
                              {item.name}
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ── ELIGIBILITY ──────────────────────────────────────────── */}
                {hasSpecializations && (
                  <div id="eligibility" className="mb-8">
                    {eligibilityPoints.length > 0 && (
                      <>
                        {eligibilityHeading && (
                          <h4 className="text-lg font-bold text-gray-800 mb-4 font-rubik">{eligibilityHeading}</h4>
                        )}
                        <div className="space-y-3">
                          {eligibilityPoints.map((point, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <Lightbulb className="w-4 h-4 text-[#ffa705] shrink-0 mt-1" />
                              <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik leading-relaxed">
                                {point}
                              </p>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                    {eligibilityPriorities.length > 0 && (
                      <div className="mt-3 space-y-2 ml-7">
                        {eligibilityPriorities.map((priority, index) => (
                          <p key={index} className="text-[#444444] lg:text-[16px] text-[14px] font-rubik">
                            {priority}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* ── ADMISSION PROCESS ────────────────────────────────────── */}
                {hasAdmission && (
                  <div id="admission-process" className="mb-8">
                    {admissionHeading && (
                      <h4 className="text-lg font-bold text-gray-800 mb-4 font-rubik">{admissionHeading}</h4>
                    )}
                    <div className="space-y-3">
                      {admissionIntro && (
                        <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik">{admissionIntro}</p>
                      )}
                      {admissionSteps.map((step, index) => (
                        <div key={index}>
                          <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik">
                            <strong>{step.label} : </strong>
                            {step.description}
                          </p>
                          {step.linkText && step.linkHref && (
                            <p>
                              <a
                                href={step.linkHref}
                                className="text-blue-600 hover:underline lg:text-[16px] text-[14px] font-rubik"
                              >
                                {step.linkText}
                              </a>
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── DOCUMENTS REQUIRED ───────────────────────────────────── */}
                {hasDocuments && (
                  <div id="documents-required" className="mb-8">
                    {documentsHeading && (
                      <h4 className="text-lg font-bold text-gray-800 mb-4 font-rubik">{documentsHeading}</h4>
                    )}
                    <div className="space-y-2">
                      {documents.map((doc, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <Lightbulb className="w-4 h-4 text-[#ffa705] shrink-0 mt-1" />
                          <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik">
                            {doc.isBold ? <strong>{doc.text}</strong> : doc.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── SELECTION PROCEDURE ──────────────────────────────────── */}
                {hasSelection && (
                  <div id="selection-procedure" className="mb-8">
                    {selectionHeading && (
                      <h4 className="text-lg font-bold text-gray-800 mb-4 font-rubik">{selectionHeading}</h4>
                    )}
                    <div className="space-y-2">
                      {selectionSteps.map((step, index) => (
                        <div key={index}>
                          <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik font-bold">
                            {step.stepLabel}
                          </p>
                          <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik">{step.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── FEE STRUCTURE ────────────────────────────────────────── */}
                {hasFee && (
                  <div id="fee-structure" className="mb-8">
                    {feeHeading && <h4 className="text-lg font-bold text-gray-800 mb-4 font-rubik">{feeHeading}</h4>}
                    <div className="text-center space-y-3">
                      {feeEnglishText && (
                        <h2 className="lg:text-[16px] text-[14px] font-rubik font-bold text-black">{feeEnglishText}</h2>
                      )}
                      {feeHindiText && (
                        <h2 className="lg:text-[16px] text-[14px] font-rubik font-bold text-black">{feeHindiText}</h2>
                      )}
                    </div>
                  </div>
                )}

                {/* ── FAQ ──────────────────────────────────────────────────── */}
                {hasFaqs && (
                  <div className="mt-8">
                    <div className="space-y-4">
                      {faqs.map((faq, index) => (
                        <motion.div
                          key={index}
                          className="border border-gray-200 rounded-lg overflow-hidden"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.2, delay: index * 0.01 }}
                        >
                          <button
                            onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                            className="w-full lg:px-6 px-3 cursor-pointer py-3 lg:py-4 text-left font-semibold text-gray-800 bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center lg:text-[16px] text-[14px] font-rubik"
                          >
                            <span>{faq.question}</span>
                            <ChevronDown
                              className={`w-5 h-5 text-[#ffa705] transition-transform duration-300 shrink-0 ml-2 ${openFAQ === index ? 'rotate-180' : ''}`}
                            />
                          </button>
                          {openFAQ === index && (
                            <motion.div
                              className="px-6 py-4 bg-white text-[#444444] lg:text-[14px] text-[14px] font-rubik leading-relaxed whitespace-pre-line"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              {faq.answer}
                            </motion.div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ── SIDEBAR ──────────────────────────────────────────────────────── */}
        <CourseQuickLinks videoUrls={sidebarVideos} />
      </div>
    </section>
  );
}
