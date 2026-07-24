export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://rnvco.com";

export const SITE_NAME = "RNVCO";
export const SITE_TAGLINE = "AI Infrastructure. Coming Soon.";
export const SITE_TITLE = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const SITE_DESCRIPTION =
  "India's futuristic AI infrastructure. 2.4 GWh sovereign AI data centre network across India. Coming soon.";
export const SITE_KEYWORDS = [
  "RNVCO",
  "AI infrastructure India",
  "sovereign AI data centre",
  "GPU compute India",
  "AI data centre network",
  "2.4 GWh",
  "Rycoon",
  "DPDP compliant AI",
  "MEITY",
  "pan-India AI compute",
] as const;

export const ORGANIZATION = {
  name: "RNVCO",
  legalName: "RNVCO",
  parentOrganization: "Rycoon",
  description:
    "RNVCO is a unit of Rycoon building a 2.4 GWh sovereign AI data centre network across India across three deployment phases.",
  email: "hello@rnvco.com",
  foundingLocation: "India",
} as const;

export const FAQ_ITEMS = [
  {
    question: "What is RNVCO?",
    answer:
      "RNVCO is a unit of Rycoon building sovereign AI data centre infrastructure across India, with a planned total network capacity of 2.4 GWh.",
  },
  {
    question: "What is the total planned capacity of the RNVCO network?",
    answer:
      "The RNVCO network is planned for 2.4 GWh total capacity across three deployment phases: Phase 1 at 400 MWh, and Phases 2 and 3 at 1.0 GWh each.",
  },
  {
    question: "Is RNVCO operational yet?",
    answer:
      "RNVCO is not yet operational. Phase 1 (400 MWh) is launching, and early interest registration is open for enterprise clients, investors, government bodies, and technology partners.",
  },
  {
    question: "Where will RNVCO facilities be located?",
    answer:
      "RNVCO is designing a pan-India network of strategically located facilities across major hubs including Hyderabad, Mumbai, Delhi, Bangalore, and Chennai for sub-10ms latency.",
  },
  {
    question: "Is RNVCO compliant with Indian data regulations?",
    answer:
      "Yes. RNVCO is designed to be fully DPDP Act 2023 and MEITY compliant, keeping India's data and intelligence within Indian borders.",
  },
] as const;
