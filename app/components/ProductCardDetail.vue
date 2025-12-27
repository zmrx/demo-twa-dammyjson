<script lang="ts" setup>
import type { Product } from "~/types";
import IconStar from "./IconStar.vue";
import IconPlus from "./IconPlus.vue";
import IconMinus from "./IconMinus.vue";
import { useCart } from "~/stores/useCart";

// Определяем пропс для продукта
const props = defineProps<{
  product: Product;
}>();

// Реактивное состояние для отслеживания активного изображения
const activeImage = ref(0);

// Используем хранилище корзины
const cart = useCart();

// Проверяем, есть ли товар в корзине
const productInCart = computed(() => {
  return cart.state.find((item) => item.product.id === props.product.id);
});

// Функция для переключения активного изображения
const setActiveImage = (index: number) => {
  activeImage.value = index;
};

// Функции для взаимодействия с корзиной
const addToCart = () => {
  cart.quantityIncrease(props.product);
};

const increaseQuantity = () => {
  cart.quantityIncrease(props.product);
};

const decreaseQuantity = () => {
  cart.quantityDecrease(props.product);
};

const onClose = () => {
  // Логика закрытия модального окна
  console.log("Закрытие модального окна");
};
</script>

<template>
  <div class="pb-32 pt-10">
    <div>
      <div class="px-4 mb-6">
        <div
          class="relative aspect-square bg-gray-50 rounded-3xl overflow-hidden mb-3 shadow-inner"
        >
          <LazyNuxtImg
            :src="product.images[activeImage] || product.thumbnail"
            class="w-full h-full object-contain"
            :alt="product.title"
            loading="lazy"
            :preload="false"
          />
        </div>
        <div
          v-if="product.images.length > 1"
          class="flex gap-2 overflow-x-auto no-scrollbar px-1"
        >
          <button
            v-for="(img, idx) in product.images"
            :key="idx"
            @click="setActiveImage(idx)"
            :class="`w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
              activeImage === idx ? 'border-indigo-600 scale-95' : 'border-transparent opacity-60'
            }`"
          >
            <LazyNuxtImg
              :src="img"
              class="w-full h-full object-cover"
              :alt="`${product.title} view ${idx}`"
              loading="lazy"
              :preload="false"
            />
          </button>
        </div>
      </div>

      <div class="px-6 pb-6">
        <div class="flex justify-between items-start mb-2">
          <div class="flex-1 pr-10">
            <span class="text-xs font-bold text-indigo-600 uppercase tracking-widest">{{
              product.category
            }}</span>
            <h2 class="text-2xl font-bold text-gray-900 leading-tight">{{ product.title }}</h2>
          </div>
          <div class="bg-yellow-50 px-2 py-1 rounded-lg flex items-center gap-1 shrink-0">
            <IconStar class="w-4 h-4 text-yellow-500" />

            <span class="text-sm font-bold text-yellow-700">{{ product.rating }}</span>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-2 mb-6">
          <span class="px-3 py-1 bg-gray-10 rounded-full text-[11px] font-semibold text-gray-600">
            Brand: {{ product.brand || "Generic" }}
          </span>
          <span
            :class="`px-3 py-1 rounded-full text-[11px] font-semibold ${
              product.stock > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`"
          >
            {{ product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock" }}
          </span>
        </div>

        <div class="mb-6">
          <h4 class="text-sm font-bold text-gray-900 mb-2">Description</h4>
          <p class="text-gray-600 text-sm leading-relaxed">{{ product.description }}</p>
        </div>
      </div>

      <!-- Sticky-like footer within the scrollable modal -->
      <div
        class="absolute z-50 bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 p-4 flex items-center justify-between pb-8"
      >
        <div>
          <p class="text-xs text-gray-400 font-medium">Price</p>
          <div class="flex items-baseline gap-2">
            <span class="text-2xl font-bold text-gray-900">${{ product.price }}</span>
            <span
              v-if="product.discountPercentage > 0"
              class="text-sm text-gray-400 line-through"
            >
              ${{ Math.round(product.price * (1 + product.discountPercentage / 100)) }}
            </span>
          </div>
        </div>

        <div
          v-if="productInCart"
          class="mt-3 p-1 bg-indigo-600 rounded-xl text-xs flex items-center justify-between gap-2"
        >
          <button
            class="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition cursor-pointer active:scale-[0.9]"
            @click="decreaseQuantity"
          >
            <IconMinus class="w-4 h-4 text-gray-900" />
          </button>

          <span class="text-sm font-semibold text-white w-6 text-center">
            {{ productInCart.quantity }}
          </span>

          <button
            class="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition cursor-pointer active:scale-[0.9]"
            @click="increaseQuantity"
          >
            <IconPlus class="w-4 h-4 text-gray-900" />
          </button>
        </div>

        <button
          v-else
          @click="
            () => {
              addToCart();
              onClose();
            }
          "
          class="bg-indigo-600 text-white text-sm font-semibold p-2.5 rounded-xl hover:bg-black transition cursor-pointer active:scale-[0.9] mt-3"
        >
          Add to cart
        </button>
      </div>
    </div>
  </div>
</template>
