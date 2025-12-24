<script setup lang="ts">
import { productsGet, categoriesGet, productsByCategoryGet } from "../api/products";
import type { Category, SortOption } from "../types";
import FilterSortBar from "../components/FilterSortBar.vue";
import FilterButton from "../components/FilterButton.vue";
import ProductCard from "../components/ProductCard.vue";
import ProductCardSkeleton from "../components/ProductCardSkeleton.vue";

const limit = ref(100);
const selectedCategory = ref("all");
const sortBy = ref<SortOption>("default");

const {
  data: categories,
  pending: categoriesPending,
  error: categoriesError,
  execute: categoriesExecute,
} = await useAsyncData("categories", () => categoriesGet());
const {
  data: productsResponse,
  pending: productsPeding,
  error: productsError,
  execute: productsExecute,
} = await useAsyncData(
  `products?category=${selectedCategory.value}`,
  () => {
    // console.log("selectedCategory:", selectedCategory.value);

    if (selectedCategory.value !== "all") {
      return productsByCategoryGet(selectedCategory.value);
    }

    return productsGet(30);
  },
  {
    watch: [selectedCategory],
  }
);

const refetch = () => {
  if (categoriesError.value) {
    categoriesExecute();
  }

  if (productsError.value) {
    productsExecute();
  }
};
</script>

<template>
  <FilterSortBar
    :sort-by="sortBy"
    :selected-category="selectedCategory"
    @sort-change="sortBy = $event"
  >
    <template #categories>
      <FilterButton
        :selected="selectedCategory === 'all'"
        @click="selectedCategory = 'all'"
      >
        All Items
      </FilterButton>

      <FilterButton
        v-for="category in categories"
        :key="category.slug"
        :selected="selectedCategory === category.slug"
        @click="selectedCategory = category.slug"
      >
        {{ category.name }}
      </FilterButton>
    </template>
  </FilterSortBar>

  <AppWrapper>
    <div class="grid grid-cols-2 gap-4">
      <template v-if="categoriesPending || productsPeding">
        <ProductCardSkeleton
          v-for="i in 6"
          :key="i"
        />
      </template>

      <template v-else>
        <template v-if="!productsError && !categoriesError">
          <ProductCard
            v-for="product in productsResponse?.products"
            :key="product.id"
            :product="product"
          />
        </template>

        <template v-else>
          <div
            class="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-white"
          >
            <h2 class="text-xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>

            <button
              @click="refetch"
              class="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-semibold"
            >
              Try Again
            </button>
          </div>
        </template>
      </template>
    </div>
  </AppWrapper>
</template>
