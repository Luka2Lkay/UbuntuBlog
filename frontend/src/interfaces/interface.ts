export interface SitePayload {
  name: string;
  slug: string;
  domain: string;
  niche: string;
  userId: string | null | undefined;
}

export interface Site {
    _id: string | null;
    name: string;
    slug: string;
    domain: string;
    niche: string;
}
