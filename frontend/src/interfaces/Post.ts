export interface Post {
  _id?: string;
  title: string;
  excerpt: string;
  content: string;
  featured: boolean;
  featuredImage: File | null;
  category: string;
  tags: string[];
  slug?: string;
  published: boolean;

  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

export interface PostFormData {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured: boolean;
  featuredImage: { url: string; publicId: string } | null;
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

  publishedAt?: string | null;

  createdAt?: string;
  updatedAt?: string;
}
