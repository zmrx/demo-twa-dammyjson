<template>
  <div class="flex items-center space-x-2">
    <!-- Previous button -->
    <button
      :disabled="currentPage <= 1"
      @click="$emit('pageChange', currentPage - 1)"
      class="px-3 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Previous
    </button>

    <!-- First page button -->
    <button
      v-if="startPage > 1"
      @click="$emit('pageChange', 1)"
      :class="[
        'px-3 py-2 rounded-md border text-sm font-medium',
        currentPage === 1 ? 'border-indigo-500 bg-indigo-50 text-indigo-600' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
      ]"
    >
      1
    </button>

    <!-- Ellipsis before current page -->
    <span v-if="startPage > 2" class="px-1 text-sm font-medium text-gray-700">...</span>

    <!-- Page buttons around current page -->
    <button
      v-for="page in visiblePages"
      :key="page"
      @click="$emit('pageChange', page)"
      :class="[
        'px-3 py-2 rounded-md border text-sm font-medium',
        currentPage === page ? 'border-indigo-500 bg-indigo-50 text-indigo-600' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
      ]"
    >
      {{ page }}
    </button>

    <!-- Ellipsis after current page -->
    <span v-if="endPage < totalPages - 1" class="px-1 text-sm font-medium text-gray-700">...</span>

    <!-- Last page button -->
    <button
      v-if="endPage < totalPages"
      @click="$emit('pageChange', totalPages)"
      :class="[
        'px-3 py-2 rounded-md border text-sm font-medium',
        currentPage === totalPages ? 'border-indigo-500 bg-indigo-50 text-indigo-600' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
      ]"
    >
      {{ totalPages }}
    </button>

    <!-- Next button -->
    <button
      :disabled="currentPage >= totalPages"
      @click="$emit('pageChange', currentPage + 1)"
      class="px-3 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
}

interface Emits {
  (e: 'pageChange', page: number): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const { currentPage, totalItems, itemsPerPage } = toRefs(props);

// Calculate total pages
const totalPages = computed(() => Math.ceil(unref(totalItems) / unref(itemsPerPage)));

// Calculate visible page range (show max 5 pages at a time)
const visiblePagesCount = 5;
const startPage = computed(() => {
  const half = Math.floor(visiblePagesCount / 2);
  let start = unref(currentPage) - half;
  if (start < 1) start = 1;
  const end = start + visiblePagesCount - 1;
  if (end > totalPages.value) {
    start = Math.max(1, totalPages.value - visiblePagesCount + 1);
  }
  return start;
});

const endPage = computed(() => {
  const end = startPage.value + visiblePagesCount - 1;
  return Math.min(end, totalPages.value);
});

const visiblePages = computed(() => {
  const pages = [];
  for (let i = startPage.value; i <= endPage.value; i++) {
    pages.push(i);
  }
  return pages;
});
</script>