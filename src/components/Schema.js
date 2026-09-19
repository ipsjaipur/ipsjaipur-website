import React from "react";

const Schema = ({ pathname }) => {
  console.log('pathname', pathname)
  // Organization schema - critical for showing logo in Google Search
  const organizationSchema = `{
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "IPS Business School Jaipur",
    "alternateName": ["IPS College Jaipur", "Institute of Professional Studies"],
    "url": "https://www.ipsedu.in/",
    "logo": "https://www.ipsedu.in/images/ips-logoW.png",
    "description": "IPS Business School, Jaipur is one of Rajasthan's premier management institutes, dedicated to shaping future business leaders. Affiliated with Rajasthan University, we offer industry-focused MBA, BBA, and BCA programs with emphasis on practical learning and career development.",
    "contactPoint": [{
      "@type": "ContactPoint",
      "telephone": "+91 8233970000",
      "email": "info@ipsedu.in",
      "contactType": "customer support",
      "areaServed": "IN",
      "availableLanguage": ["English", "Hindi"]
    }],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "A 1, Padmawati Colony - B, Pandit T.N. Mishra Marg, Nirman Nagar",
      "addressLocality": "Jaipur",
      "addressRegion": "Rajasthan",
      "postalCode": "302019",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://www.facebook.com/ipscollegejaipur",
      "https://en.wikipedia.org/wiki/IPS_Business_School",
      "https://www.instagram.com/ips_business_school/",
      "https://www.linkedin.com/school/ips-business-school-jaipur/"
    ]
  }`;

  // Default schema for all pages
  const defaultSchema = `{
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    "name": "IPS Business School Jaipur",
    "alternateName": "IPS College Jaipur",
    "url": "https://www.ipsedu.in/",
    "logo": "https://www.ipsedu.in/images/ips-logoW.png",
    "description": "IPS Business School, Jaipur is one of Rajasthan's premier management institutes, dedicated to shaping future business leaders. AICTE approved and affiliated with Rajasthan Technical University, we offer industry-focused MBA, BBA, and BCA programs with strong placement record and comprehensive student development initiatives.",
    "contactPoint": [{
      "@type": "ContactPoint",
      "telephone": "+91 8233970000",
      "email": "info@ipsedu.in",
      "contactType": "Admissions / Enquiry"
    }],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "A 1, Padmawati Colony - B, Pandit T.N. Mishra Marg, Nirman Nagar",
      "addressLocality": "Jaipur",
      "postalCode": "302019",
      "addressCountry": "IN"
    },
    "foundingDate": "2007",
    "sameAs": [
      "https://www.facebook.com/ipscollegejaipur",
      "https://en.wikipedia.org/wiki/IPS_Business_School"
    ]
  }`;

  let pageSpecificSchema = null;

  // Page-specific schemas
  if (pathname === '/about') {
    pageSpecificSchema = `{
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "IPS Business School Jaipur",
      "url": "https://www.ipsedu.in/",
      "logo": "https://www.ipsedu.in/images/ips-logoW.png",
      "sameAs": [
        "https://www.facebook.com/ipscollegejaipur",
        "https://en.wikipedia.org/wiki/IPS_Business_School",
        "https://www.instagram.com/ips_business_school/",
        "https://www.linkedin.com/school/ips-business-school-jaipur/"
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "A 1, Padmawati Colony - B, Pandit T.N. Mishra Marg, Nirman Nagar",
        "addressLocality": "Jaipur",
        "addressRegion": "Rajasthan",
        "postalCode": "302019",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91 8233970000",
        "contactType": "customer service",
        "email": "info@ipsedu.in",
        "areaServed": "IN",
        "availableLanguage": [
          "English",
          "Hindi"
        ]
      }
    }`;
  } else if (pathname === '/mba') {
    pageSpecificSchema = `{
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": "https://www.ipsedu.in/mba#course",
    "name": "MBA in Jaipur",
    "description": "MBA at IPS Business School is a postgraduate management program designed to develop students' skills in business management, leadership, marketing, finance, strategic management and other industry-relevant areas through practical and career-oriented learning.",
    "url": "https://www.ipsedu.in/mba",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "IPS Business School",
      "url": "https://www.ipsedu.in/"
    },
    "educationalLevel": "Postgraduate",
    "courseMode": "Onsite",
    "timeRequired": "P2Y",
    "inLanguage": "en",
    "occupationalCredentialAwarded": "Master of Business Administration (MBA)",
    "coursePrerequisites": "Candidates with a bachelor's degree from a recognized university are eligible to apply, subject to the eligibility criteria specified by the institution.",
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "Onsite",
      "duration": "P2Y",
      "location": {
        "@type": "Place",
        "name": "IPS Business School, Jaipur",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Jaipur",
          "addressRegion": "Rajasthan",
          "addressCountry": "IN"
        }
      }
      }
    }`;
  } else if (pathname === '/bba') {
    pageSpecificSchema = `{
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": "https://www.ipsedu.in/bba#course",
    "name": "BBA in Jaipur",
    "description": "BBA at IPS Business School is an undergraduate management program designed to develop students' knowledge and practical skills in business management, marketing, finance, entrepreneurship, leadership and other industry-relevant areas through practical and career-oriented learning.",
    "url": "https://www.ipsedu.in/bba",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "IPS Business School",
      "url": "https://www.ipsedu.in/"
    },
    "educationalLevel": "Undergraduate",
    "courseMode": "Onsite",
    "timeRequired": "P3Y",
    "inLanguage": "en",
    "occupationalCredentialAwarded": "Bachelor of Business Administration (BBA)",
    "coursePrerequisites": "Candidates who have completed or are appearing for their 10+2 or equivalent examination from a recognized board are eligible to apply, subject to the eligibility criteria specified by the institution.",
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "Onsite",
      "duration": "P3Y",
      "location": {
        "@type": "Place",
        "name": "IPS Business School, Jaipur",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Jaipur",
          "addressRegion": "Rajasthan",
          "addressCountry": "IN"
        }
       }
      }
    }`;
  } else if (pathname === '/bca') {
    pageSpecificSchema = `{
      "@context": "https://schema.org",
      "@type": "Course",
      "@id": "https://www.ipsedu.in/bca#course",
      "name": "BCA in Jaipur",
      "description": "BCA at IPS Business School is an undergraduate computer applications program designed to develop students' knowledge and practical skills in programming, computer applications, software development, database management, web technologies and other industry-relevant areas.",
      "url": "https://www.ipsedu.in/bca",
      "provider": {
        "@type": "EducationalOrganization",
        "name": "IPS Business School",
        "url": "https://www.ipsedu.in/"
      },
      "educationalLevel": "Undergraduate",
      "courseMode": "Onsite",
      "timeRequired": "P3Y",
      "inLanguage": "en",
      "occupationalCredentialAwarded": "Bachelor of Computer Applications (BCA)",
      "coursePrerequisites": "Candidates who have completed or are appearing for their 10+2 or equivalent examination from a recognized board are eligible to apply, subject to the eligibility criteria specified by the institution.",
      "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": "Onsite",
        "duration": "P3Y",
        "location": {
          "@type": "Place",
          "name": "IPS Business School, Jaipur",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Jaipur",
            "addressRegion": "Rajasthan",
            "addressCountry": "IN"
          }
          }
        }
      }`;
  } else if (pathname === '/contact') {
    pageSpecificSchema = `{
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact IPS Business School Jaipur",
      "description": "Get in touch with IPS Business School Jaipur for admissions, enquiries, and more information about our programs.",
      "url": "https://www.ipsedu.in/contact",
      "mainEntity": {
        "@type": "CollegeOrUniversity",
        "name": "IPS Business School Jaipur",
        "telephone": "+91 8233970000",
        "email": "info@ipsedu.in",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "A 1, Padmawati Colony - B, Pandit T.N. Mishra Marg, Nirman Nagar",
          "addressLocality": "Jaipur",
          "postalCode": "302019",
          "addressCountry": "IN"
        }
      }
    }`;
  }

  return (
    <>
      {/* Organization Schema - Critical for Google Search logo */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: organizationSchema }}
      />

      {/* Default Schema for all pages */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: defaultSchema }}
      />

      {/* Page-specific Schema */}
      {pageSpecificSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: pageSpecificSchema }}
        />
      )}
    </>
  );
};

export default Schema;
