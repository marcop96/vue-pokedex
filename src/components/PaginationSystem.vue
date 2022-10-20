<template>
  <n-pagination v-model:page="page" :page-count="numberOfPages" />
</template>

<script setup lang="ts">
import { NPagination } from "naive-ui";
import { ref } from "vue";
const page = ref(1);

// declares props for [component]
defineProps<{
  numberOfPages: number;
}>();
</script>
