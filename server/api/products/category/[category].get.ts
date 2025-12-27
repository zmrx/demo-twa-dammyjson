import type { Product } from "~/types";

export default defineEventHandler(async (event) => {
  const { category } = event.context.params || {};

  if (!category) {
    throw createError({
      statusCode: 400,
      message: "Category parameter is required",
    });
  }

  try {
    return await $fetch(`https://dummyjson.com/products/category/${category}`);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to fetch products by category",
    });
  }
});
