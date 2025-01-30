<template>
  <section class="stats">
    <h2>Stats</h2>
    <ul>
      <li v-for="e in entries" :key="e.id">{{ e }}</li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { supabase } from "@/lib/supabaseClient";

import type { entry } from "@/types/types";

const entries = ref<entry[]>([]);

async function getEntries() {
  const { data } = await supabase.from("entries").select();
  if (data) {
    entries.value = data;
  }
}

onMounted(() => {
  getEntries();
});
</script>

<style lang="scss">
.stats {
  display: grid;
  padding-top: var(--space-medium);
  padding-bottom: var(--space-medium);

  h2 {
    font-weight: 400;
    text-align: center;
  }
}
</style>
