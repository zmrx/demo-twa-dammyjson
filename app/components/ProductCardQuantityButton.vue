<script lang="ts" setup>
const { quantity, size = "small" } = defineProps<{
  quantity: number;
  size?: "small" | "medium";
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
    class="h-10 p-1 bg-indigo-600 rounded-full text-xs inline-flex items-center justify-between gap-2"
    :class="{
      'h-10': size === 'small',
      'h-12': size === 'medium',
    }"
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
          class="rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition cursor-pointer active:scale-[0.9]"
          :class="{
            'w-8 h-8': size === 'small',
            'w-10 h-10': size === 'medium',
          }"
          @click.stop="handleDecrease"
        >
          <IconMinus class="w-6 h-6 text-gray-900" />
        </button>

        <span class="text-lg font-semibold text-white w-6 text-center">
          {{ quantity }}
        </span>
      </div>
    </Transition>

    <button
      class="rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition cursor-pointer active:scale-[0.9]"
      :class="{
        'w-8 h-8': size === 'small',
        'w-10 h-10': size === 'medium',
      }"
      @click.stop="handleIncrease"
    >
      <IconPlus class="w-6 h-6 text-gray-900" />
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
