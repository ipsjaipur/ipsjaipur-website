import React from "react";

const Schema = ({ pathname }) => {
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
  if (pathname === '/about' || pathname === '/about-us') {
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
  } else if (pathname === '/courses/mba' || pathname === '/mba') {
    pageSpecificSchema = `{
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "MBA - Master of Business Administration",
      "description": "2-year full-time MBA program at IPS Business School Jaipur, affiliated with Rajasthan Technical University, offering specializations in various management domains.",
      "provider": {
        "@type": "CollegeOrUniversity",
        "name": "IPS Business School Jaipur",
        "sameAs": "https://www.ipsedu.in/"
      },
      "educationalLevel": "Postgraduate",
      "timeToComplete": "P2Y",
      "occupationalCategory": "Business Management",
      "offers": {
        "@type": "Offer",
        "category": "Paid",
        "availability": "https://schema.org/InStock"
      }
    }`;
  } else if (pathname === '/courses/bba' || pathname === '/bba') {
    pageSpecificSchema = `{
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "BBA - Bachelor of Business Administration",
      "description": "3-year full-time BBA program at IPS Business School Jaipur, affiliated with Rajasthan Technical University, providing foundation in business management.",
      "provider": {
        "@type": "CollegeOrUniversity",
        "name": "IPS Business School Jaipur",
        "sameAs": "https://www.ipsedu.in/"
      },
      "educationalLevel": "Undergraduate",
      "timeToComplete": "P3Y",
      "occupationalCategory": "Business Management",
      "offers": {
        "@type": "Offer",
        "category": "Paid",
        "availability": "https://schema.org/InStock"
      }
    }`;
  } else if (pathname === '/courses/bca' || pathname === '/bca') {
    pageSpecificSchema = `{
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "BCA - Bachelor of Computer Applications",
      "description": "3-year full-time BCA program at IPS Business School Jaipur, affiliated with Rajasthan Technical University, focusing on computer applications and IT skills.",
      "provider": {
        "@type": "CollegeOrUniversity",
        "name": "IPS Business School Jaipur",
        "sameAs": "https://www.ipsedu.in/"
      },
      "educationalLevel": "Undergraduate",
      "timeToComplete": "P3Y",
      "occupationalCategory": "Computer Applications",
      "offers": {
        "@type": "Offer",
        "category": "Paid",
        "availability": "https://schema.org/InStock"
      }
    }`;
  } else if (pathname === '/contact' || pathname === '/contact-us') {
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
