<template>
  <form class="form">
    <div class="form__sentence">
      <select v-model="first">
        <option v-for="k in Object.keys(firstWords)" :key="k" :value="k">
          {{ firstWords[k] }}
        </option>
      </select>
      c'est
      <select v-model="second">
        <option v-for="k in Object.keys(secondWords)" :key="k" :value="k">
          {{ secondWords[k] }}
        </option>
      </select>
      qui t'a assassiné<span><span v-if="isEDisplayed" class="e">e</span></span
      >,&nbsp;
      <select v-model="third">
        <option v-for="k in Object.keys(thirdWords)" :key="k" :value="k">
          {{ thirdWords[k] }}
        </option>
      </select>
      .
    </div>
    <div class="form__submit">
      <button
        type="button"
        @click.prevent="submit"
        class="button button--primary"
      >
        Envoyer
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const first = ref<string>("et");
const second = ref<string>("amor");
const third = ref<string>("mathias");

const firstWords = ref<{ [key: string]: string }>({
  et: "Et",
  mais: "Mais",
});

const secondWords = ref<{ [key: string]: string }>({
  amour: "l'amour",
  amor: "l'amor",
  mort: "la mort",
});

const thirdWords = ref<{ [key: string]: string }>({
  mathia: "Mathia",
  mathias: "Mathias",
  marcia: "Marcia",
});

const isEDisplayed = computed<boolean>(() => {
  return third.value === "marcia";
});

const result = computed<string>(() => {
  return `${firstWords.value[first.value]} c'est ${secondWords.value[second.value]} qui t'a assassiné${isEDisplayed.value ? "e" : ""}, ${thirdWords.value[third.value]}.`;
});

async function submit() {
  console.log(result.value);
}
</script>

<style lang="scss">
:root {
  --select-border-color: var(--text-color-dim);
}

.form {
  display: grid;
  place-content: center;
  height: 80%;

  // padding-top: var(--space-large);
  // padding-bottom: var(--space-large);

  font-size: clamp(3.2rem, 3.2vw, 12rem);
  font-weight: 700;
  text-align: center;

  select {
    appearance: none;

    background-color: transparent;
    border: 0.1rem dashed var(--select-border-color);
    border-radius: 0.4rem;
    cursor: pointer;

    color: var(--text-accent);
    font-weight: inherit;
    text-align: center;
  }
}
</style>
