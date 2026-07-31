import {
  FAQ_ITEMS,
  ORGANIZATION,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

/**
 * Serialises a value as JSON, then escapes characters that could
 * allow a </script> sequence to break out of the inline <script> tag.
 * This is a defence-in-depth measure even though all current values
 * are static constants.
 */
function safeJsonLd(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/'/g, "\\u0027");
}

export function JsonLd() {
  const organizationId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;
  const webpageId = `${SITE_URL}/#webpage`;

  const graph = [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: ORGANIZATION.name,
      legalName: ORGANIZATION.legalName,
      url: SITE_URL,
      description: ORGANIZATION.description,
      email: ORGANIZATION.email,
      foundingLocation: {
        "@type": "Place",
        name: ORGANIZATION.foundingLocation,
      },
      parentOrganization: {
        "@type": "Organization",
        name: ORGANIZATION.parentOrganization,
      },
      logo: `${SITE_URL}/icon`,
      image: `${SITE_URL}/opengraph-image`,
      knowsAbout: [
        "AI infrastructure",
        "Sovereign AI compute",
        "Data centres",
        "GPU compute",
        "India AI",
      ],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { "@id": organizationId },
      inLanguage: "en-IN",
    },
    {
      "@type": "WebPage",
      "@id": webpageId,
      url: SITE_URL,
      name: `${SITE_NAME} AI Infrastructure. Coming Soon.`,
      description: SITE_DESCRIPTION,
      isPartOf: { "@id": websiteId },
      about: { "@id": organizationId },
      primaryImageOfPage: `${SITE_URL}/opengraph-image`,
      inLanguage: "en-IN",
      dateModified: new Date().toISOString().slice(0, 10),
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
    />
  );
}

