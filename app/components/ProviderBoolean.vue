<script setup lang="ts">
const value = ref(false);

const setValue = (newValue: boolean) => {
  value.value = newValue;
};

defineExpose({
  value,
  setValue,
});
</script>

<template>
  <slot v-bind="{ value, setValue }" />
</template>
