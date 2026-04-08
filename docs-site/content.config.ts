import { defineContentConfig, defineCollection } from "@nuxt/content";
import { join } from "node:path";

const cwd = join(process.cwd(), "content");

export default defineContentConfig({
  collections: {
    landing: defineCollection({
      type: "page",
      source: {
        cwd,
        include: "index.md",
      },
    }),
    docs: defineCollection({
      type: "page",
      source: {
        cwd,
        include: "docs/**",
        prefix: "/docs",
        exclude: ["index.md"],
      },
    }),
  },
});
