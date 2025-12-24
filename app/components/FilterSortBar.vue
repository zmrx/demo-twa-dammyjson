<script lang="ts" setup>
import type { SortOption } from "~/types";

defineProps<{
  selectedCategory: string;
  sortBy: SortOption;
}>();

const emit = defineEmits<{
  (e: "sortChange", payload: SortOption): void;
}>();

const onChange = (e: Event) => {
  const htmlSelectElement = e.target as HTMLSelectElement;

  emit("sortChange", htmlSelectElement.value as SortOption);
};
</script>

<template>
  <div class="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
    <div class="px-4 pt-4 pb-2">
      <div class="flex items-center justify-between mb-4">
        <h1 class="text-2xl font-bold text-gray-900">Discover</h1>

        <div class="relative">
          <select
            :value="sortBy"
            @change="onChange($event)"
            class="appearance-none bg-gray-50 border-none pl-3 pr-8 py-2 rounded-xl text-sm font-medium text-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="default">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Highest Rated</option>
          </select>

          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <IconSort class="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      <div class="overflow-x-auto no-scrollbar flex gap-2 pb-2">
        <slot name="categories" />
      </div>
    </div>
  </div>
</template>

<style></style>
