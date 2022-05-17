import { Category, PostType } from "./dto/types";

const categoryMap: Record<Category, string> = {
  accommodation: "Mieszkanie",
  food: "Żywność",
  misc: "Inne",
};

export const formatCategory = (category: Category) => categoryMap[category];

export const formatPostType = (postType: PostType) =>
  postType === "needs" ? "Potrzebuję" : "Oferuję";

const categoryImageMap: Record<Category, string> = {
  accommodation: "/accommodation.png",
  food: "/food.png",
  misc: "/food.png",
};

export const getCategoryImage = (category: Category) =>
  categoryImageMap[category];

export const isUrl = (string: string) => {
  const afterProtocol = string.match(/^(?:\w+:)?\/\/(\S+)$/)?.[1];

  if (!afterProtocol) return false;

  return (
    /^localhost[\:?\d]*(?:[^\:?\d]\S*)?$/.test(afterProtocol) ||
    /^[^\s\.]+\.\S{2,}$/.test(afterProtocol)
  );
};

export const removeNullish = <T extends Record<string, unknown>>(obj: T): T =>
  Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => ![null, undefined, ""].includes(v))
  ) as any;
