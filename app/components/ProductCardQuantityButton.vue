<script lang="ts" setup>
const { quantity } = defineProps<{
  quantity: number;
}>();

const emit = defineEmits<{
  (e: "increase"): void;
  (e: "decrease"): void;
}>();

const handleIncrease = () => {
  emit("increase");
};

const handleDecrease = () => {
  emit("decrease");
};
</script>

<template>
  <div
    class="h-10 p-1 bg-indigo-600 rounded-xl text-xs inline-flex items-center justify-between gap-2"
  >
    <Transition
      name="fade"
      mode="out-in"
    >
      <div
        v-if="quantity > 0"
        class="flex items-center justify-between gap-2"
      >
        <button
          class="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition cursor-pointer active:scale-[0.9]"
          @click.stop="handleDecrease"
        >
          <IconMinus class="w-4 h-4 text-gray-900" />
        </button>

        <span class="text-sm font-semibold text-white w-6 text-center">
          {{ quantity }}
        </span>
      </div>
    </Transition>

    <button
      class="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition cursor-pointer active:scale-[0.9]"
      @click.stop="handleIncrease"
    >
      <IconPlus class="w-4 h-4 text-gray-900" />
    </button>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
