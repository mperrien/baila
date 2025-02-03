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

import type { Entry, stats } from "@/types/types";

const entries = ref<Entry[]>([]);
const stats = ref<stats>({
  first: {
    et: 0,
    mais: 0,
  },
  second: {
    amor: 0,
    amour: 0,
    mort: 0,
  },
  third: {
    mathia: 0,
    mathias: 0,
    marcia: 0,
  },
});

async function getEntries() {
  const { data } = await supabase.from("entries").select();
  if (data) {
    entries.value = data;
  }
}

async function getStats() {
  const words: ("first" | "second" | "third")[] = ["first", "second", "third"];
  for (const word of words) {
    const { data } = await supabase.from(word).select();
    if (data) {
      console.log(data);
      // data.forEach((w) => {
      //   stats.value[word];
      // });
    }
  }
  // console.log(stats.value);
}

onMounted(() => {
  getStats();
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
