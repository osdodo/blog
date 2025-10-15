export interface Author {
  name: string;
  picture?: string;
}

export interface OgImage {
  url?: string;
}

export interface Post {
  title?: string;
  summary?: string;
  coverImage?: string;
  date?: string;
  tags?: string[];
  author?: Author;
  ogImage?: OgImage;
  slug?: string;
  content?: string;
  lastmod?: string;
  images?: string[] | string;
  [key: string]: unknown;
}

export interface PostSummary extends Post {
  slug: string;
}

export interface PostDetail extends Post {
  slug: string;
  content?: string;
}
