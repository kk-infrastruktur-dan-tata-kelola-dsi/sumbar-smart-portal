import type {
  BudayaCategory,
  BudayaImage,
  BudayaItem,
  BudayaItemWithRelations,
  BudayaReview,
  BudayaStats,
  Kabupaten,
  KabupatenWithItems,
  CreateReviewParams,
  GetBudayaItemsParams,
  GetBudayaItemsResponse,
} from "@/types/budaya";

import budayaData from "@/data/dummy/budaya.json";

type BudayaDataset = {
  kabupatens: Kabupaten[];
  categories: BudayaCategory[];
  items: BudayaItem[];
  images: BudayaImage[];
  reviews: BudayaReview[];
};

const dataset = budayaData as BudayaDataset;
const kabupatenById = new Map(dataset.kabupatens.map((kab) => [kab.id, kab]));
const categoryById = new Map(
  dataset.categories.map((category) => [category.id, category]),
);

function mapBudayaItemWithRelations(item: BudayaItem): BudayaItemWithRelations {
  return {
    ...item,
    kabupaten: kabupatenById.get(item.kabupaten_id),
    category: item.category_id ? categoryById.get(item.category_id) : undefined,
  };
}

function sortBudayaItems(
  items: BudayaItemWithRelations[],
  orderBy: NonNullable<GetBudayaItemsParams["order_by"]>,
  direction: NonNullable<GetBudayaItemsParams["order_direction"]>,
): BudayaItemWithRelations[] {
  const factor = direction === "asc" ? 1 : -1;

  return [...items].sort((a, b) => {
    if (orderBy === "name") {
      return a.name.localeCompare(b.name, "id") * factor;
    }

    const numericA =
      orderBy === "created_at"
        ? new Date(a.created_at).getTime()
        : orderBy === "rating"
          ? a.rating
          : orderBy === "reviews_count"
            ? a.reviews_count
            : a.view_count;

    const numericB =
      orderBy === "created_at"
        ? new Date(b.created_at).getTime()
        : orderBy === "rating"
          ? b.rating
          : orderBy === "reviews_count"
            ? b.reviews_count
            : b.view_count;

    return (numericA - numericB) * factor;
  });
}

export async function getKabupatens(
  includeItemCount = false,
): Promise<KabupatenWithItems[]> {
  const sortedKabupatens = [...dataset.kabupatens].sort((a, b) =>
    a.name.localeCompare(b.name, "id"),
  );

  if (!includeItemCount) {
    return sortedKabupatens;
  }

  const publishedItemCounts = dataset.items.reduce<Record<string, number>>(
    (acc, item) => {
      if (item.status !== "published") {
        return acc;
      }

      acc[item.kabupaten_id] = (acc[item.kabupaten_id] || 0) + 1;

      return acc;
    },
    {},
  );

  return sortedKabupatens.map((kabupaten) => ({
    ...kabupaten,
    item_count: publishedItemCounts[kabupaten.id] || 0,
  }));
}

export async function getKabupatenBySlug(
  slug: string,
): Promise<Kabupaten | null> {
  return (
    dataset.kabupatens.find((kabupaten) => kabupaten.slug === slug) || null
  );
}

export async function getBudayaCategories(): Promise<BudayaCategory[]> {
  return [...dataset.categories].sort((a, b) =>
    a.name.localeCompare(b.name, "id"),
  );
}

export async function getBudayaItems(
  params: GetBudayaItemsParams = {},
): Promise<GetBudayaItemsResponse> {
  const {
    kabupaten_slug,
    category_slug,
    type,
    search,
    featured,
    status = "published",
    limit = 20,
    offset = 0,
    order_by = "rating",
    order_direction = "desc",
  } = params;

  const normalizedSearch = search?.trim().toLowerCase();
  const kabupaten = kabupaten_slug
    ? dataset.kabupatens.find((item) => item.slug === kabupaten_slug)
    : undefined;
  const category = category_slug
    ? dataset.categories.find((item) => item.slug === category_slug)
    : undefined;

  const filteredItems = dataset.items.filter((item) => {
    if (item.status !== status) {
      return false;
    }

    if (kabupaten_slug && (!kabupaten || item.kabupaten_id !== kabupaten.id)) {
      return false;
    }

    if (category_slug && (!category || item.category_id !== category.id)) {
      return false;
    }

    if (type && item.type !== type) {
      return false;
    }

    if (featured !== undefined && item.featured !== featured) {
      return false;
    }

    if (normalizedSearch) {
      const searchable = [
        item.name,
        item.description || "",
        ...(item.tags || []),
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(normalizedSearch);
    }

    return true;
  });

  const withRelations = filteredItems.map(mapBudayaItemWithRelations);
  const sortedItems = sortBudayaItems(withRelations, order_by, order_direction);
  const paginatedItems = sortedItems.slice(offset, offset + limit);

  return {
    items: paginatedItems,
    total: sortedItems.length,
    limit,
    offset,
  };
}

export async function getBudayaItemBySlug(
  slug: string,
): Promise<BudayaItemWithRelations | null> {
  const item = dataset.items.find(
    (budayaItem) =>
      budayaItem.slug === slug && budayaItem.status === "published",
  );

  if (!item) {
    return null;
  }

  const images = dataset.images
    .filter((image) => image.budaya_item_id === item.id)
    .sort((a, b) => a.display_order - b.display_order);
  const recentReviews = dataset.reviews
    .filter(
      (review) =>
        review.budaya_item_id === item.id && review.status === "approved",
    )
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .slice(0, 5);

  return {
    ...mapBudayaItemWithRelations(item),
    view_count: item.view_count + 1,
    images,
    recent_reviews: recentReviews,
  };
}

export async function getFeaturedBudayaItems(
  limit = 6,
): Promise<BudayaItemWithRelations[]> {
  const { items } = await getBudayaItems({
    featured: true,
    limit,
    order_by: "rating",
    order_direction: "desc",
  });

  return items;
}

export async function createBudayaReview(
  params: CreateReviewParams,
): Promise<boolean> {
  const itemExists = dataset.items.some(
    (item) => item.id === params.budaya_item_id && item.status === "published",
  );

  if (!itemExists) {
    return false;
  }

  if (params.rating < 1 || params.rating > 5) {
    return false;
  }

  if (!params.user_name.trim()) {
    return false;
  }

  return true;
}

export async function getBudayaStats(): Promise<BudayaStats | null> {
  const publishedItems = dataset.items.filter(
    (item) => item.status === "published",
  );
  const approvedReviews = dataset.reviews.filter(
    (review) => review.status === "approved",
  );

  const averageRating =
    publishedItems.length > 0
      ? publishedItems.reduce((sum, item) => sum + item.rating, 0) /
        publishedItems.length
      : 0;

  const itemsByType = {
    objek: publishedItems.filter((item) => item.type === "objek").length,
    tradisi: publishedItems.filter((item) => item.type === "tradisi").length,
    kuliner: publishedItems.filter((item) => item.type === "kuliner").length,
  };

  const kabupatenCounts = publishedItems.reduce<Record<string, number>>(
    (acc, item) => {
      const kabupatenName = kabupatenById.get(item.kabupaten_id)?.name;

      if (!kabupatenName) {
        return acc;
      }

      acc[kabupatenName] = (acc[kabupatenName] || 0) + 1;

      return acc;
    },
    {},
  );

  const itemsByKabupaten = Object.entries(kabupatenCounts)
    .map(([kabupaten_name, count]) => ({ kabupaten_name, count }))
    .sort((a, b) => b.count - a.count);

  return {
    total_items: publishedItems.length,
    total_kabupatens: dataset.kabupatens.length,
    total_reviews: approvedReviews.length,
    average_rating: Number(averageRating.toFixed(1)),
    items_by_type: itemsByType,
    items_by_kabupaten: itemsByKabupaten,
  };
}

export async function searchBudayaItems(
  query: string,
  limit = 10,
): Promise<BudayaItemWithRelations[]> {
  const { items } = await getBudayaItems({
    search: query,
    limit,
    order_by: "rating",
  });

  return items;
}
