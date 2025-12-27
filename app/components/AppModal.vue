<script lang="ts" setup>
const { isOpen } = defineProps<{
  isOpen: boolean;
}>();

defineEmits<{
  (e: "update:isOpen", value: boolean): void;
}>();

watchEffect(() => {
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});

onUnmounted(() => {
  document.body.style.overflow = "";
})
</script>

<template>
  <div
    :class="`fixed inset-0 z-50 flex items-end justify-center transition-opacity duration-300 ${
      isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`"
  >
    <div
      class="absolute inset-0 bg-black/40 backdrop-blur-sm"
      @click="$emit('update:isOpen', false)"
    />

    <div
      :class="`relative bg-white w-full sm:max-w-120 rounded-t-4xl overflow-hidden shadow-2xl transform transition-transform duration-300 ease-out no-scrollbar ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      }`"
      style="max-height: 92vh"
    >
      <button
        @click="$emit('update:isOpen', false)"
        class="absolute top-4 right-4 z-50 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-lg text-gray-500 hover:text-gray-900 transition-all active:scale-90"
        aria-label="Close"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div class="overflow-y-auto max-h-[92vh] no-scrollbar">
        <slot />
      </div>
    </div>
  </div>
</template>

<style></style>
