<script setup lang="ts">
import {
  productsGet,
  categoriesGet,
  productsByCategoryGet,
  categoriesGetPath,
  productsByCategoryGetPath,
  productsGetPath,
} from "../api/products";
import type { Category, Product, SortOption } from "../types";
import FilterSortBar from "../components/FilterSortBar.vue";
import FilterButton from "../components/FilterButton.vue";
import ProductCard from "../components/ProductCardVertical.vue";
import ProductCardSkeleton from "../components/ProductCardSkeleton.vue";
import { useCart } from "../stores/useCart";

const cart = useCart();

const limit = ref(100);
const selectedCategory = ref("all");
const sortBy = ref<SortOption>("default");

const {
  data: categories,
  pending: categoriesPending,
  error: categoriesError,
  execute: categoriesExecute,
} = await useLazyFetch<Category[]>(categoriesGetPath, {
  cache: "force-cache",
});

const {
  data: productsResponse,
  pending: productsPeding,
  error: productsError,
  execute: productsExecute,
} = await useLazyFetch<{ products: Product[]; total: number }>(
  () => {
    // console.log("selectedCategory:", selectedCategory.value);

    if (selectedCategory.value !== "all") {
      return productsByCategoryGetPath(selectedCategory.value);
    }

    return productsGetPath(30);
  },
  {
    watch: [selectedCategory],
    cache: "force-cache",
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

const log = (...arg: unknown[]) => console.log(...arg);
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
          <template
            v-for="product in productsResponse?.products"
            :key="product.id"
          >
            <ProviderBoolean>
              <template #default="{ value: isOpen, setValue: setIsOpen }">
                <ProductCard
                  :product="product"
                  @add-to-cart="cart.quantityIncrease(product)"
                  @click="setIsOpen(true)"
                />

                <AppModal
                  :is-open="isOpen"
                  @update:is-open="setIsOpen($event)"
                >
                  <ProductCardDetail :product="product" />
                </AppModal>
              </template>
            </ProviderBoolean>
          </template>
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
