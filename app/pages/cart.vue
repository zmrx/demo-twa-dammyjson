<script setup lang="ts">
import { useCart } from "../stores/useCart";
import ProductCardHorizontal from "~/components/ProductCardHorizontal.vue";

const cart = useCart();
</script>

<template>
  <AppWrapper>
    <div
      v-if="!cart.state.length"
      class="flex flex-col items-center justify-center py-20 px-6 text-center h-[70vh]"
    >
      <div class="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
        <IconShoppingBag class="w-10 h-10 text-gray-300" />
      </div>

      <h2 class="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>

      <p class="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>

      <NuxtLink
        to="/"
        class="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg shadow-indigo-100 active:scale-95 transition-transform"
      >
        Start Shopping
      </NuxtLink>
    </div>

    <div
      v-else
      class="flex flex-col min-h-full"
    >
      <div class="py-6">
        <h1 class="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h1>

        <div class="flex flex-col gap-4">
          <template
            v-for="cartProduct in cart.state"
            :key="cartProduct.product.id"
          >
            <ProviderBoolean>
              <template #default="{ value: isOpen, setValue: setIsOpen }">
                <ProductCardHorizontal
                  :product="cartProduct.product"
                  @add-to-cart="cart.quantityIncrease(cartProduct.product)"
                  @click="setIsOpen(true)"
                />

                <AppModal
                  :is-open="isOpen"
                  @update:is-open="setIsOpen($event)"
                >
                  <ProductCardDetail :product="cartProduct.product" />
                </AppModal>
              </template>
            </ProviderBoolean>
          </template>
        </div>
      </div>

      <div class="mt-auto bg-white border-t border-gray-100 p-6 pb-28">
        <div class="space-y-3 mb-6">
          <div class="flex justify-between text-sm text-gray-500">
            <span>Subtotal</span>
            <span>${{ cart.priceSubtotal.toFixed(2) }}</span>
          </div>

          <div class="flex justify-between text-sm text-green-600">
            <span>Discount Savings</span>
            <span>-${{ cart.priceSavings.toFixed(2) }}</span>
          </div>

          <div class="h-px bg-gray-100 w-full my-2" />
          <div class="flex justify-between text-lg font-bold text-gray-900">
            <span>Total</span>
            <span>${{ cart.priceTotal.toFixed(2) }}</span>
          </div>
        </div>
        <button
          class="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-indigo-100 active:scale-[0.98] transition-all cursor-pointer"
        >
          Checkout Now
        </button>
      </div>
    </div>
  </AppWrapper>
</template>
