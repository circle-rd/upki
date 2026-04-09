<script setup lang="ts">
/**
 * Custom landing page — overrides Docus's built-in landing.vue template.
 *
 * Docus's template queries the landing collection with:
 *   queryCollection('landing').path(route.path).first()
 *
 * When the app is deployed at a sub-path (NUXT_APP_BASE_URL=/upki-ca/),
 * route.path inside the Nitro SSR context contains the full path including
 * the base URL prefix (/upki-ca/ instead of /), so the query finds nothing
 * and throws a 404.
 *
 * This override queries with a hardcoded path('/') so it always finds
 * content/index.md regardless of the base URL configuration.
 *
 * Docus detects this file via landingPageExists() and disables its own
 * template + landing route, so there is no route conflict.
 */
const { data: page } = await useAsyncData('landing', () =>
  queryCollection('landing').path('/').first()
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const seo = (page.value as any).seo ?? {}
useSeoMeta({
  title: seo.title ?? page.value?.title,
  description: seo.description ?? page.value?.description,
  ogTitle: seo.title ?? page.value?.title,
  ogDescription: seo.description ?? page.value?.description,
})
</script>

<template>
  <ContentRenderer v-if="page" :value="page" />
</template>
