<script setup lang="ts">
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
</script>

<template>
  <div class="flex flex-col min-h-screen bg-[#f8fafc]">
    <NuxtRouteAnnouncer />

    <AppHeader />

    <NuxtPage />

    <AppFooter />
  </div>
</template>
