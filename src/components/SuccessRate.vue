<template>
  <section class="successRate">
    <dl>
      <dt>{{ successRate }}%</dt>
      <dd>des visiteurs ont la bonne réponse&nbsp;!</dd>
    </dl>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useStore } from "@nanostores/vue";

import { $successRate, getSuccess, getTotal } from "@/stores/stats";

const isLoading = ref<boolean>(true);
const successRate = useStore($successRate);

onMounted(async () => {
  await getSuccess();
  await getTotal();
  isLoading.value = false;
});
</script>

<style lang="scss" scoped>
.successRate {
  padding-top: var(--space-large);
  padding-bottom: var(--space-large);

  dl {
    dt {
      font-size: 7rem;
      font-weight: 700;
      text-align: center;
    }

    dd {
      margin: 0;

      color: var(--text-color-dim);
      text-align: center;
    }
  }
}
</style>
