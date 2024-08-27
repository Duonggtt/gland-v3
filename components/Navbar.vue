<!-- components/Navbar.vue -->
<template>
    <div class="w-full bg-white shadow-md fixed top-0 z-10">
      <Toolbar>
        <template #start>
          <div class="flex items-center gap-2 px-4">
            <a href="/"><h1 class="text-2xl font-bold">Gland</h1></a>
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
  </template>
  
  <script setup>
    import { defineProps } from 'vue';

  const props = defineProps({
    theme: {
        type: String,
        default: 'light', // Mặc định là 'light'
    },
    });
  </script>
  
  <style scoped>
  /* Custom styles for Navbar if needed */
  </style>
  