import type { Category } from "~/types";

export default defineEventHandler(async (event) => {
  try {
    return await $fetch("https://dummyjson.com/products/categories");
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to fetch categories",
    });
  }
});
