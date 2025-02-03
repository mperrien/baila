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
    <div class="form__error">
      <div v-if="hasError">
        <p>
          Oups ! Il y a un problème.
          <button type="button" @click.prevent="toggleDetails">
            {{ areDetailsDisplayed ? "Masquer" : "Afficher" }} les détails
          </button>
        </p>
        <p v-if="areDetailsDisplayed">{{ submitError }}</p>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore } from "@nanostores/vue";

import { submitEntry, $submitError } from "@/stores/submit";

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
  marcia: "Marcia",
  mathias: "Mathias",
  mathia: "Mathia",
});

const isEDisplayed = computed<boolean>(() => {
  return third.value === "marcia";
});

const result = computed<string>(() => {
  return `${firstWords.value[first.value]} c'est ${secondWords.value[second.value]} qui t'a assassiné${isEDisplayed.value ? "e" : ""}, ${thirdWords.value[third.value]}.`;
});

async function submit() {
  console.log(result.value);
  await submitEntry(first.value, second.value, third.value, result.value);
}

const submitError = useStore($submitError);
const hasError = computed<boolean>(() => {
  return submitError.value !== "";
});

const areDetailsDisplayed = ref<boolean>(false);
function toggleDetails() {
  areDetailsDisplayed.value = !areDetailsDisplayed.value;
}
</script>

<style lang="scss">
:root {
  --select-border-color: var(--text-color-dim);
}
</style>

<style lang="scss" scoped>
.form {
  grid-column: 1 / span 12;

  display: grid;
  place-content: center;
  height: calc(100vh - 16rem);
  min-height: 36rem;

  // padding-top: var(--space-large);
  // padding-bottom: var(--space-large);

  font-size: clamp(3.2rem, 3.2vw, 5rem);
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

  &__error {
    height: 12rem;

    font-size: 2rem;
    font-weight: 400;

    button {
      background-color: transparent;
      border: none;
      cursor: pointer;

      color: var(--text-accent);
      text-decoration: underline;
    }
  }
}
</style>
