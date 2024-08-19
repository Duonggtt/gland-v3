<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <div class="w-full bg-white shadow-md fixed top-0 z-10">
      <Toolbar>
        <template #start>
          <div class="flex items-center gap-2 px-4">
            <h1 class="text-2xl font-bold">Gland</h1>
          </div>
        </template>

        <template #end>
          <div class="flex items-center gap-2 px-4">
            <Avatar
              image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
              style="width: 32px; height: 32px"
            />
          </div>
        </template>
      </Toolbar>
    </div>

    <!-- Main Body (Sidebar + Content) -->
    <div class="flex flex-1 pt-[70px]">
      <!-- Sidebar Menu List -->
      <div class="shadow-lg rounded-lg flex-shrink-0 bg-white" style="flex: 2.5">
        <div class="p-2">
          <SidebarMenu />
        </div>
      </div>

      <!-- Main Content -->
      <div class="flex-grow pl-4 pr-4 pb-4" style="flex: 9">
        <ClientOnly fallback-tag="span" fallback="Loading content...">
          <slot></slot>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup>
import SidebarMenu from '@/components/SidebarMenu.vue';
</script>

<style scoped>
/* Custom styles if needed */
</style>
