import { type Site } from "@/interfaces/Site";

export interface Post {
  _id?: string;
  site: Site | null;
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
}
