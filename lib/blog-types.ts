export type Language = "en" | "bn";

export const LANGUAGE_LABELS: Record<Language, string> = {
  en: "English",
  bn: "বাংলা",
};

export type BlogMeta = {
  title: string;
  author: string;
  publishDate: string;
  excerpt: string;
  tags: string[];
  coverImage: string;
};

export type BlogPost = {
  slug: string;
  lang: Language;
  meta: BlogMeta;
  content: string;
};

export type BlogListItem = {
  slug: string;
  meta: BlogMeta;
  availableLanguages: Language[];
};
