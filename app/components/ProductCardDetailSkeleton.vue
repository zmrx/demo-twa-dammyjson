<script lang="ts" setup>
defineProps<{
  productId: number;
}>();
</script>

<template>
  <div class="pb-32 pt-10">
    <div class="p-8 flex flex-col items-center">
      <div class="w-full aspect-square bg-gray-100 animate-pulse rounded-2xl mb-6" />
      <div class="h-6 bg-gray-100 animate-pulse rounded w-3/4 mb-4" />
      <div class="h-4 bg-gray-100 animate-pulse rounded w-full mb-2" />
      <div class="h-4 bg-gray-100 animate-pulse rounded w-2/3" />
    </div>
  </div>
</template>
