import { defineContentConfig, defineCollection } from '@nuxt/content'

/**
 * Local content configuration for uPKI-CA docs.
 *
 * We only declare the `landing` collection here (content/index.md).
 * The `docs` collection (content/docs/**) is handled by the Docus layer,
 * which appends its own content.config.ts definition at a lower priority.
 *
 * Declaring `landing` here prevents the Docus layer from attempting to
 * register it via useNuxt() at top-level, which can fail silently
 * in Docker/CI build environments.
 */
export default defineContentConfig({
  collections: {
    landing: defineCollection({
      type: 'page',
      source: 'index.md',
    }),
  },
})
