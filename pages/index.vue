<template>
  <h1 class="text-3xl text-blue-400 font-bold underline">
    Hello World, {{name}}
  </h1>
</template>

<script lang="ts" setup>
import common from "~/plugins/common"

console.log('common : ', common);

const { $hello } = useNuxtApp();

$hello();

const name = 'Hoang Son'
</script>