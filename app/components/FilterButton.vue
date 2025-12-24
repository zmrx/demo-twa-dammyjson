<script lang="ts" setup>
defineProps<{
  selected: boolean;
}>();
</script>

<template>
  <button
    :class="`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap cursor-pointer
          ${
            selected
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
              : 'bg-white border border-gray-200 text-gray-600'
          }`"
  >
    <slot />
  </button>
</template>
