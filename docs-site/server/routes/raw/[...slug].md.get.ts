import { queryCollection } from "@nuxt/content/server";
import type { Collections, PageCollectionItemBase } from "@nuxt/content";
import collections from "#content/manifest";

/**
 * Override of the @nuxt/content built-in /raw/[...slug].md endpoint.
 *
 * The default implementation serialises page.body (minimark AST) back to
 * markdown using stringify({ format: 'markdown/html' }), which renders GFM
 * table nodes as HTML tags (<table>, <thead>, <tbody>…) instead of pipe
 * tables.  By returning page.rawbody we serve the original .md source, which
 * keeps pipe-table syntax intact and results in a much more compact output
 * for LLM consumption.
 */
export default defineEventHandler(async (event) => {
  const slug = getRouterParams(event)["slug.md"];
  if (!slug?.endsWith(".md")) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page not found",
      fatal: true,
    });
  }

  // Build content path: strip .md extension, ensure leading slash
  let path = "/" + slug.replace(/\.md$/, "");
  // /foo/index → /foo
  if (path.endsWith("/index")) {
    path = path.slice(0, -6);
  }

  // Iterate over all registered collections to find the page
  const collectionNames = Object.keys(collections as Record<string, unknown>);
  let page: (PageCollectionItemBase & { rawbody?: string }) | null = null;
  for (const collection of collectionNames) {
    const result = await queryCollection(event, collection as keyof Collections)
      .path(path)
      .first();
    if (result) {
      page = result as PageCollectionItemBase & { rawbody?: string };
      break;
    }
  }

  if (!page) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page not found",
      fatal: true,
    });
  }

  setHeader(event, "Content-Type", "text/markdown; charset=utf-8");

  // Use the original markdown source (rawbody) to preserve pipe-table syntax
  const rawbody: string | undefined = (page as Record<string, unknown>)
    .rawbody as string | undefined;
  if (rawbody) {
    // Auto-enrich: prepend title + description if document has no top-level heading
    if (!/^#\s/m.test(rawbody)) {
      const prefix: string[] = [];
      if (page.title) prefix.push(`# ${page.title}`);
      if (page.description) prefix.push(`> ${page.description}`);
      if (prefix.length) prefix.push("");
      return prefix.join("\n") + rawbody;
    }
    return rawbody;
  }

  // Fallback: minimal reconstruction if rawbody is unavailable
  return `# ${page.title ?? ""}\n\n> ${page.description ?? ""}\n`;
});
