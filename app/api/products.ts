// import { $fetch } from '#build';
// import { $fetch } from "#build";
import type { Product, Category } from "../types";

const BASE_URL = "https://dummyjson.com";

export const productsGet = async (
  limit: number = 30,
  skip: number = 0
): Promise<{ products: Product[]; total: number }> =>
  await $fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);

export const categoriesGet = async (): Promise<Category[]> =>
  await $fetch(`${BASE_URL}/products/categories`);

export const productsByCategoryGet = async (category: string): Promise<{ products: Product[] }> =>
  await $fetch(`${BASE_URL}/products/category/${category}`);
