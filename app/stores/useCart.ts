import { defineStore } from "pinia";
import type { Product } from "~/types";

type CartProduct = {
  product: Product;
  quantity: number;
};

export const useCart = defineStore("cart", () => {
  const _state = ref(new Map<number, CartProduct>());

  const state = computed(() => {
    return [..._state.value.values()];
  });

  const priceSubtotal = computed(() =>
    state.value.reduce(
      (sum, cartProduct) =>
        sum +
        cartProduct.product.price *
          (1 + cartProduct.product.discountPercentage / 100) *
          cartProduct.quantity,
      0
    )
  );
  const priceTotal = computed(() =>
    state.value.reduce(
      (sum, cartProduct) => sum + cartProduct.product.price * cartProduct.quantity,
      0
    )
  );

  const priceSavings = computed(() => priceSubtotal.value - priceTotal.value);

  const productsCount = computed(() =>
    state.value.reduce((sum, product) => (sum += product.quantity), 0)
  );

  const productHas = (product: Product) => _state.value.has(product.id);

  const quantityIncrease = (product: Product) => {
    const productInCart = _state.value.get(product.id);

    if (productInCart) {
      productInCart.quantity += 1;
      return;
    }

    _state.value.set(product.id, { product, quantity: 1 });
  };

  const quantityDecrease = (product: Product) => {
    const productInCart = _state.value.get(product.id);

    if (!productInCart) {
      return;
    }

    if (productInCart.quantity > 1) {
      productInCart.quantity -= 1;

      return;
    }

    _state.value.delete(product.id);
  };

  return {
    state,
    priceSubtotal,
    priceTotal,
    priceSavings,
    productHas,
    productsCount,
    quantityIncrease,
    quantityDecrease,
  };
});
