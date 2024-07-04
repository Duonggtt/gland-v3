<template>
  <h1 class="text-3xl text-blue-400 font-bold underline">
    Hello World, {{name}}
  </h1>
  <div>
    <PrimeButton label="Primary" icon="pi pi-check" severity="contrast"></PrimeButton>
  </div>
  <div class="card flex justify-center">
    <PrimeListbox v-model="selectedCity" :options="cities" optionLabel="name" :invalid="selectedCity === null"  class="w-full md:w-56" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const { $hello } = useNuxtApp();
$hello();

const name = 'Hoang Son';
const selectedCity = ref();
const cities = ref([
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' }
]);
</script>
