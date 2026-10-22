import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/en/course",
    name: "SikaAI: AI for ALL",
    short_name: "SikaAI",
    description: "A four-week AI literacy course.",
    start_url: "/en/course",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#f7f3ee",
    theme_color: "#a32b2b",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}