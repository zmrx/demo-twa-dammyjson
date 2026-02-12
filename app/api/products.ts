// import { $fetch } from '#build';
// import { $fetch } from "#build";
import type { Product, Category } from "../types";


// Метод для получения списка продуктов с пагинацией
export const productsGetPath = (limit: number = 30, skip: number = 0) => {
  // Проверка максимального лимита
  const safeLimit = Math.min(limit, 100);
  return `/api/products?limit=${safeLimit}&skip=${skip}`;
};

export const productsGet = async (
  limit: number = 30,
  skip: number = 0
): Promise<{ products: Product[]; total: number; skip: number; limit: number }> => {
  const safeLimit = Math.min(limit, 100);
  return await $fetch(productsGetPath(safeLimit, skip));
};

// Метод для получения списка категорий
export const categoriesGetPath = `/api/products/categories`;
export const categoriesGet = async (): Promise<Category[]> => await $fetch(categoriesGetPath);

// Метод для получения продуктов по категории с пагинацией
export const productsByCategoryGetPath = (category: string, limit: number = 30, skip: number = 0) => {
  const safeLimit = Math.min(limit, 100);
  return `/api/products/category/${encodeURIComponent(category)}?limit=${safeLimit}&skip=${skip}`;
};

export const productsByCategoryGet = async (
  category: string,
  limit: number = 30,
  skip: number = 0
): Promise<{ products: Product[]; total: number; skip: number; limit: number; category: string }> => {
  const safeLimit = Math.min(limit, 100);
  return await $fetch(productsByCategoryGetPath(category, safeLimit, skip));
};

// Метод для получения конкретного продукта по ID
export const productByIdGetPath = (id: number) => `/api/products/${id}`;
export const productByIdGet = async (id: number): Promise<Product> => {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error('Product ID must be a positive integer');
  }
  return await $fetch(productByIdGetPath(id));
};

// Метод для поиска продуктов
export const productsSearchGetPath = (q: string, limit: number = 30, skip: number = 0) => {
  const safeLimit = Math.min(limit, 100);
  return `/api/products/search?q=${encodeURIComponent(q)}&limit=${safeLimit}&skip=${skip}`;
};

export const productsSearchGet = async (
  q: string,
  limit: number = 30,
  skip: number = 0
): Promise<{ products: Product[]; total: number; skip: number; limit: number; query: string }> => {
  if (!q || typeof q !== 'string') {
    throw new Error('Search query must be a non-empty string');
  }

  const safeLimit = Math.min(limit, 100);
  return await $fetch(productsSearchGetPath(q, safeLimit, skip));
};

// Метод для получения списка доступных тегов (если поддерживается)
export const productsTagsGetPath = `/api/products/tags`;
export const productsTagsGet = async (): Promise<string[]> => await $fetch(productsTagsGetPath);

// Метод для получения продуктов по тегу
export const productsByTagGetPath = (tag: string, limit: number = 30, skip: number = 0) => {
  const safeLimit = Math.min(limit, 100);
  return `/api/products/tag/${encodeURIComponent(tag)}?limit=${safeLimit}&skip=${skip}`;
};

export const productsByTagGet = async (
  tag: string,
  limit: number = 30,
  skip: number = 0
): Promise<{ products: Product[]; total: number; skip: number; limit: number }> => {
  if (!tag || typeof tag !== 'string') {
    throw new Error('Tag must be a non-empty string');
  }

  const safeLimit = Math.min(limit, 100);
  return await $fetch(productsByTagGetPath(tag, safeLimit, skip));
};
