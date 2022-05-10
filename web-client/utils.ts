import { Category, PostType } from "./dto/types";

const categoryMap: Record<Category, string> = {
  accomodation: "Mieszkanie",
  food: "Żywność",
  misc: "Inne",
};

export const formatCategory = (category: Category) => categoryMap[category];

export const formatPostType = (postType: PostType) =>
  postType === "needs" ? "Potrzebuję" : "Oferuję";
