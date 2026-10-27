import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const routes = ["", "/pos-hardware", "/ecommerce-sync", "/managed-services", "/how-it-works", "/hardware", "/pricing", "/case-studies", "/about", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({ url: `${site.url}${r}`, changeFrequency: "monthly", priority: r === "" ? 1 : 0.7 }));
}
