<template>
  <div class="min-h-screen flex flex-col box-border">
    <!-- Header -->
    <Navbar v-if="!isLoginPage" :theme="currentTheme"/>

    <!-- Main Body (Sidebar + Content) -->
    <div :class="{'pt-[80px] pl-5 pb-5': !isLoginPage, 'pt-0': isLoginPage}" class="flex flex-1">
      <!-- Sidebar Menu List -->
      <div v-if="!isLoginPage" class="shadow-lg rounded-lg flex-shrink-0 bg-gray-50 dark:bg-gray-950 h-screen box-border" style="flex: 2.2; overflow-y: auto;">
        <div class="p-2">
          <SidebarMenu />
        </div>
      </div>

      <!-- Main Content -->
      <div :class="{'pl-5 pr-5': !isLoginPage, 'p-4': isLoginPage}" class="flex-grow" style="flex: 9">
        <ClientOnly>
          <template #fallback>
            <div class="flex items-center justify-center h-full">
              <img class="w-64 h-64" src="/static/img/loading.png" alt="loading..." />
            </div>
          </template>
          <slot></slot>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup>
import SidebarMenu from '@/components/SidebarMenu.vue';
import Navbar from '@/components/Navbar.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

// Kiểm tra xem trang hiện tại có phải là trang login không
const route = useRoute();
const isLoginPage = computed(() => route.path === '/auth/login');

const currentTheme = computed(() => {
  return 'light'; 
});
</script>

<style scoped>
/* Custom styles if needed */
</style>
