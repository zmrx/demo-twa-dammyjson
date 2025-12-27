import type { Product } from '~/types';

export default defineEventHandler(async (event) => {
  const { limit = 30, skip = 0 } = getQuery(event);

  try {
    const response = await $fetch('https://dummyjson.com/products', {
      params: {
        limit: Number(limit),
        skip: Number(skip)
      }
    });

    return response;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch products'
    });
  }
});
