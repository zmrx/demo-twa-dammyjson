<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { retrieveLaunchParams, type User, isTMA } from "@tma.js/sdk-vue";

const { tgWebAppData } = retrieveLaunchParams();
console.log("tgWebAppData:", tgWebAppData);
const user = ref<undefined | User>();

onMounted(() => {
  if (tgWebAppData) {
    user.value = tgWebAppData.user;
  }
});
</script>

<template>
  <AppWrapper>
    <div v-if="isTMA()">
      <span>{{ isTMA() }}</span>

      <div class="flex items-center gap-4">
        <NuxtImg
          :src="user?.photo_url"
          class="h-12 w-12 object-cover rounded-[100%]"
          height="3rem"
          width="3rem"
        />

        <span class="text-lg font-bold">{{ user?.first_name }}</span>
      </div>

      <pre>{{ user }}</pre>
    </div>
  </AppWrapper>
</template>

<style></style>
