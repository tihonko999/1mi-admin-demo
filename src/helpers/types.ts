export interface TvEpisodeType {
  id: number;
  show_id: number;
  show_title: string;
  title: string;
  slug?: string;
  description: string;
  is_active: boolean;
  published_at: string;
  path?: string;
}

export interface PlatformType {
  id: number;
  title: string;
  age_limit: string;
  city: string;
  domain: string;
  hostname: string;
  template: string;
  color: string;
  robots_txt: string;
  google_analytics_id: string;
  liveinternet_counter_id: string;
  yandex_metrika_id: string;
  yandex_verification: string;
  google_verification: string;
  tv_popular_shows_enabled: boolean;
}

export interface RoleType {
  id?: number;
  is_admin: boolean;
  permissions: string[];
  rank: number;
  title: string;
}

export interface UserType {
  authorization: string;
  created_at: string;
  first_name: string;
  full_name: string;
  id: number;
  is_active: boolean;
  last_name: string;
  platform_ids: number[];
  role: RoleType;
  role_id?: number;
  updated_at: string;
}

export type MatterTypeType = "Matter::NewsItem" | "Matter::Article";

export type MatterStatusType = "ready" | "published" | "deleted";

export interface MatterType {
  created_at: string;
  id: number;
  lead: string;
  platform_id: number;
  platform: PlatformType;
  published_at: string;
  rubric_id: number;
  rubric_title: string;
  story_id: number;
  show_authors: boolean;
  show_in_personas: boolean;
  blocked_users_ids: number[];
  old_uri: string;
  in_feed: boolean;
  direct_link_only: boolean;
  title_above_image: boolean;
  title: string;
  type: MatterTypeType;
  url: string;
  status: MatterStatusType;
}
