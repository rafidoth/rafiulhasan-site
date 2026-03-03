import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Language, BlogPost, BlogListItem } from "./blog-types";

export type { Language, BlogMeta, BlogPost, BlogListItem } from "./blog-types";
export { LANGUAGE_LABELS } from "./blog-types";

const BLOGS_DIR = path.join(process.cwd(), "public", "blogs");

/**
 * Parse a blog filename into slug and language.
 * e.g. "getting-started-with-nextjs_en.md" -> { slug: "getting-started-with-nextjs", lang: "en" }
 */
function parseFilename(
  filename: string
): { slug: string; lang: Language } | null {
  const match = filename.match(/^(.+)_(en|bn)\.md$/);
  if (!match) return null;
  return { slug: match[1], lang: match[2] as Language };
}

/**
 * Get all markdown filenames from the blogs directory.
 */
function getBlogFiles(): string[] {
  if (!fs.existsSync(BLOGS_DIR)) return [];
  return fs.readdirSync(BLOGS_DIR).filter((f) => f.endsWith(".md"));
}

/**
 * Read and parse a single markdown file by slug and language.
 * Returns null if the file does not exist.
 */
export function getBlogBySlug(
  slug: string,
  lang: Language
): BlogPost | null {
  const filePath = path.join(BLOGS_DIR, `${slug}_${lang}.md`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    lang,
    meta: {
      title: data.title ?? "",
      author: data.author ?? "",
      publishDate: data.publishDate ?? "",
      excerpt: data.excerpt ?? "",
      tags: data.tags ?? [],
      coverImage: data.coverImage ?? "",
    },
    content,
  };
}

/**
 * Get all unique blog slugs from the blogs directory.
 */
export function getAllBlogSlugs(): string[] {
  const files = getBlogFiles();
  const slugs = new Set<string>();

  for (const file of files) {
    const parsed = parseFilename(file);
    if (parsed) slugs.add(parsed.slug);
  }

  return Array.from(slugs);
}

/**
 * Get available languages for a given blog slug.
 */
export function getAvailableLanguages(slug: string): Language[] {
  const languages: Language[] = [];
  if (
    fs.existsSync(path.join(BLOGS_DIR, `${slug}_en.md`))
  ) {
    languages.push("en");
  }
  if (
    fs.existsSync(path.join(BLOGS_DIR, `${slug}_bn.md`))
  ) {
    languages.push("bn");
  }
  return languages;
}

/**
 * Get all blogs for the listing page.
 * Returns metadata for each blog, preferring English metadata.
 * Sorted by publish date descending (newest first).
 */
export function getAllBlogs(): BlogListItem[] {
  const slugs = getAllBlogSlugs();

  const blogs: BlogListItem[] = slugs
    .map((slug) => {
      const availableLanguages = getAvailableLanguages(slug);
      // Prefer English metadata, fall back to Bengali
      const preferredLang = availableLanguages.includes("en") ? "en" : "bn";
      const post = getBlogBySlug(slug, preferredLang);

      if (!post) return null;

      return {
        slug,
        meta: post.meta,
        availableLanguages,
      };
    })
    .filter((item): item is BlogListItem => item !== null);

  // Sort by publish date descending
  blogs.sort(
    (a, b) =>
      new Date(b.meta.publishDate).getTime() -
      new Date(a.meta.publishDate).getTime()
  );

  return blogs;
}
