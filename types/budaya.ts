// Database types for Budaya section

export interface Kabupaten {
  id: string;
  name: string;
  slug: string;
  latitude: number;
  longitude: number;
  color: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface BudayaCategory {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  description?: string;
  created_at: string;
}

export type BudayaItemType = "objek" | "tradisi" | "kuliner";
export type BudayaItemStatus = "draft" | "published" | "archived";

export interface BudayaItem {
  id: string;
  name: string;
  slug: string;
  kabupaten_id: string;
  category_id?: string;
  type: BudayaItemType;
  description?: string;
  long_description?: string;
  image_url?: string;
  thumbnail_url?: string;
  rating: number;
  reviews_count: number;
  latitude?: number;
  longitude?: number;
  address?: string;
  contact_phone?: string;
  contact_email?: string;
  website_url?: string;
  opening_hours?: OpeningHours;
  ticket_price?: TicketPrice;
  facilities?: string[];
  tags?: string[];
  status: BudayaItemStatus;
  featured: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export interface OpeningHours {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
  [key: string]: string | undefined;
}

export interface TicketPrice {
  adult?: number;
  child?: number;
  student?: number;
  senior?: number;
  foreign?: number;
  [key: string]: number | undefined;
}

export interface BudayaImage {
  id: string;
  budaya_item_id: string;
  image_url: string;
  caption?: string;
  display_order: number;
  created_at: string;
}

export type ReviewStatus = "pending" | "approved" | "rejected";

export interface BudayaReview {
  id: string;
  budaya_item_id: string;
  user_id?: string;
  user_name?: string;
  rating: number;
  comment?: string;
  helpful_count: number;
  visit_date?: string;
  status: ReviewStatus;
  created_at: string;
  updated_at: string;
}

export type EventStatus = "upcoming" | "ongoing" | "completed" | "cancelled";

export interface BudayaEvent {
  id: string;
  budaya_item_id?: string;
  kabupaten_id?: string;
  name: string;
  description?: string;
  event_date?: string;
  start_time?: string;
  end_time?: string;
  location?: string;
  organizer?: string;
  status: EventStatus;
  created_at: string;
  updated_at: string;
}

// Extended types with relations for API responses
export interface BudayaItemWithRelations extends BudayaItem {
  kabupaten?: Kabupaten;
  category?: BudayaCategory;
  images?: BudayaImage[];
  recent_reviews?: BudayaReview[];
}

export interface KabupatenWithItems extends Kabupaten {
  items?: BudayaItem[];
  item_count?: number;
}

// API request/response types
export interface GetBudayaItemsParams {
  kabupaten_slug?: string;
  category_slug?: string;
  type?: BudayaItemType;
  search?: string;
  featured?: boolean;
  status?: BudayaItemStatus;
  limit?: number;
  offset?: number;
  order_by?: "rating" | "reviews_count" | "view_count" | "created_at" | "name";
  order_direction?: "asc" | "desc";
}

export interface GetBudayaItemsResponse {
  items: BudayaItemWithRelations[];
  total: number;
  limit: number;
  offset: number;
}

export interface CreateReviewParams {
  budaya_item_id: string;
  user_name: string;
  rating: number;
  comment?: string;
  visit_date?: string;
}

export interface BudayaStats {
  total_items: number;
  total_kabupatens: number;
  total_reviews: number;
  average_rating: number;
  items_by_type: {
    objek: number;
    tradisi: number;
    kuliner: number;
  };
  items_by_kabupaten: {
    kabupaten_name: string;
    count: number;
  }[];
}
