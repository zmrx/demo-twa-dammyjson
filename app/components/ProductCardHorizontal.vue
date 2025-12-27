<script lang="ts" setup>
import IconStar from "./IconStar.vue";
import IconPlus from "./IconPlus.vue";
import IconMinus from "./IconMinus.vue";
import type { Product } from "~/types";
import { useCart } from "~/stores/useCart";

const { product } = defineProps<{
  product: Product;
}>();

defineEmits<{
  (e: "click"): void;
}>();

const cart = useCart();

const productInCart = computed(() => {
  return cart.state.find((item) => item.product.id === product.id);
});

const productDiscountPercentageRounded = computed(() => Math.round(product.discountPercentage));
const productTotalPrice = computed(() => product.price * (1 + product.discountPercentage / 100));
const productTotalPriceToFixed = computed(() => productTotalPrice.value.toFixed(2));

const addToCart = () => {
  cart.quantityIncrease(product);
};

const increaseQuantity = () => {
  cart.quantityIncrease(product);
};

const decreaseQuantity = () => {
  cart.quantityDecrease(product);
};
</script>

<template>
  <div
    class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex gap-4 h-full transition-transform"
    @click="$emit('click')"
  >
    <!-- Image section -->
    <div class="w-28 bg-gray-50 overflow-hidden relative">
      <LazyNuxtImg
        :src="product.thumbnail"
        :alt="product.title"
        class="w-full h-full object-cover"
        loading="lazy"
        :preload="false"
      />

      <div
        v-if="product.discountPercentage > 10"
        class="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full"
      >
        -{{ productDiscountPercentageRounded }}%
      </div>
    </div>

    <!-- Content section -->
    <div class="p-2 flex flex-col flex-1">
      <div class="flex justify-between items-start mb-1">
        <div class="text-[10px] text-indigo-600 font-semibold uppercase tracking-wider mb-1">
          {{ product.category }}
        </div>

        <div
          class="bg-white/80 backdrop-blur-sm px-1.5 py-0.5 rounded-lg flex items-center gap-0.5 text-[11px] font-medium text-gray-700 shadow-sm"
        >
          <IconStar class="w-3 h-3 text-yellow-500" />
          {{ product.rating }}
        </div>
      </div>

      <h3 class="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug mb-2 flex-1">
        {{ product.title }}
      </h3>

      <div class="mt-auto flex flex-col">
        <div class="flex items-baseline gap-1.5">
          <span class="text-lg font-bold text-gray-900">${{ product.price }}</span>

          <span
            v-if="product.discountPercentage > 0"
            class="text-[11px] text-gray-400 line-through"
          >
            ${{ productTotalPriceToFixed }}
          </span>
        </div>

        <ProductCardQuantityButton
          :quantity="productInCart?.quantity ?? 0"
          @increase="cart.quantityIncrease(product)"
          @decrease="cart.quantityDecrease(product)"
          class="mt-3 self-end"
        />
      </div>
    </div>
  </div>
</template>
