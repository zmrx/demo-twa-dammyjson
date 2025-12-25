<script setup lang="ts">
import IconHome from "./IconHome.vue";
import IconCart from "./IconCart.vue";
import IconPerson from "./IconPerson.vue";
import { useCart } from "../stores/useCart";

const navigate = [
  {
    title: "Home",
    icon: IconHome,
    url: "/",
  },
  {
    title: "cart",
    icon: IconCart,
    url: "/cart",
  },
  {
    title: "Profile",
    icon: IconPerson,
    url: "/profile",
  },
];

const cart = useCart();
</script>

<template>
  <div
    class="fixed z-40 bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100"
  >
    <nav class="sm:max-w-120 sm:mx-auto px-6 py-3 flex items-center justify-between">
      <NuxtLink
        v-for="link in navigate"
        :to="link.url"
        class="relative flex flex-col items-center gap-1 text-gray-400 cursor-pointer"
        :active-class="'text-indigo-600'"
      >
        <div
          v-if="link.title === 'cart' && cart.state.length > 0"
          class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-[9px] text-white font-bold flex items-center justify-center rounded-full border border-white"
        >
          {{ cart.productsCount }}
        </div>

        <Component
          :is="link.icon"
          class="w-6 h-6"
        />

        <span class="text-[10px] font-bold uppercase">{{ link.title }}</span>
      </NuxtLink>
    </nav>
  </div>

  <div class="h-20" />
</template>
