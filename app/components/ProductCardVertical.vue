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
    class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full transition-transform"
    @click="$emit('click')"
  >
    <div class="relative aspect-square bg-gray-50 overflow-hidden">
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
      <div
        class="absolute top-2 right-2 bg-white/80 backdrop-blur-sm px-1.5 py-0.5 rounded-lg flex items-center gap-0.5 text-[11px] font-medium text-gray-700 shadow-sm"
      >
        <IconStar class="w-3 h-3 text-yellow-500" />
        {{ product.rating }}
      </div>
    </div>

    <div class="p-2 flex flex-col flex-1">
      <span
        class="text-[10px] text-indigo-600 font-semibold uppercase tracking-wider mb-1 line-clamp-1"
      >
        {{ product.category }}
      </span>

      <h3 class="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug mb-2 flex-1">
        {{ product.title }}
      </h3>

      <div class="mt-auto">
        <div class="flex items-baseline gap-1.5">
          <span class="text-lg font-bold text-gray-900">${{ product.price }}</span>

          <span
            v-if="product.discountPercentage > 0"
            class="text-[11px] text-gray-400 line-through"
          >
            ${{ productTotalPriceToFixed }}
          </span>
        </div>

        <div
          v-if="productInCart"
          class="mt-3 p-2 bg-indigo-600 rounded-xl text-xs flex items-center justify-between gap-2"
        >
          <button
            class="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition cursor-pointer active:scale-[0.9]"
            @click.stop="decreaseQuantity"
          >
            <IconMinus class="w-4 h-4 text-gray-900" />
          </button>

          <span class="text-sm font-semibold text-white w-6 text-center">
            {{ productInCart.quantity }}
          </span>

          <button
            class="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition cursor-pointer active:scale-[0.9]"
            @click.stop="increaseQuantity"
          >
            <IconPlus class="w-4 h-4 text-gray-900" />
          </button>
        </div>

        <button
          v-else
          class="w-full mt-3 bg-indigo-600 text-white text-sm font-semibold p-2.5 rounded-xl hover:bg-black transition cursor-pointer active:scale-[0.9]"
          @click.stop="addToCart"
        >
          Add to cart
        </button>
      </div>
    </div>
  </div>
</template>

<style></style>
