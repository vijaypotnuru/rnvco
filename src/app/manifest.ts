import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RNVCO — AI Infrastructure",
    short_name: "RNVCO",
    description:
      "India's futuristic AI infrastructure. 2.4 GWh sovereign AI data centre network across India.",
    start_url: "/",
    display: "standalone",
    background_color: "#F8F9FA",
    theme_color: "#C8922A",
    icons: [
      {
        src: "/icon",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
