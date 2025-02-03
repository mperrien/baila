<template>
  <div class="chart">
    {{ word }}
  </div>
</template>

<script setup lang="ts">
import { toRefs, ref, onMounted } from "vue";
import { useStore } from "@nanostores/vue";

import { fetchStats } from "@/stores/stats";

const props = defineProps<{
  word: number;
}>();
const { word } = toRefs(props);

const view = ref<string>("first");

const stats = useStore;

onMounted(async () => {
  await fetchStats(word.value);
});
</script>
