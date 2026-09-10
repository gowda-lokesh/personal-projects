import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Fitness Tracker",
    short_name: "Fitness",
    description: "Personal strength, cardio and activity tracker",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f7fa",
    theme_color: "#111827",
    icons: [],
  }
}
