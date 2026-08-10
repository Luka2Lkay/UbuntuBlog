import { type Site } from "./Site";

export interface Post {
  _id?: string;

  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  tags: string[];

  published: boolean;

  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };

  author: string;
  site: string;

  publishedAt: string | null;

  createdAt?: string;
  updatedAt?: string;
}
