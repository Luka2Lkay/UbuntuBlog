export interface SitePayload {
  name: string;
  slug: string;
  domain: string;
  niche: string;
  userId: string | null | undefined;
}

export interface Site {
    _id: string;
    name: string;
    slug: string;
    domain: string;
    niche: string;
    userId: string | null | undefined;
}
