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
        :class="{ buttonIsSubmitting: isSubmitting }"
        :disabled="isSubmitting"
      >
        <span>Envoyer</span>
        <span v-if="isSubmitting">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xml:space="preserve"
            viewBox="0 0 100 100"
          >
            <path
              fill="#131211"
              d="M73 50c0-12.7-10.3-23-23-23S27 37.3 27 50m3.9 0c0-10.5 8.5-19.1 19.1-19.1S69.1 39.5 69.1 50"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                dur="1s"
                from="0 50 50"
                repeatCount="indefinite"
                to="360 50 50"
                type="rotate"
              />
            </path>
          </svg>
        </span>
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
      <div v-else-if="isSubmitSuccessful">
        <p>Votre réponse a bien été prise en compte !</p>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore } from "@nanostores/vue";

import {
  submitEntry,
  $submitError,
  $isSubmitSuccessful,
} from "@/stores/submit";

import { getSuccess, getTotal, fetchStats } from "@/stores/stats";

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

const isSubmitting = ref<boolean>(false);
async function submit() {
  isSubmitting.value = true;
  await submitEntry(first.value, second.value, third.value, result.value);
  isSubmitting.value = false;
  await refreshData();
}

const submitError = useStore($submitError);
const isSubmitSuccessful = useStore($isSubmitSuccessful);
const hasError = computed<boolean>(() => {
  return submitError.value !== "";
});

const areDetailsDisplayed = ref<boolean>(false);
function toggleDetails() {
  areDetailsDisplayed.value = !areDetailsDisplayed.value;
}

async function refreshData() {
  await getSuccess();
  await getTotal();
  await fetchStats(1);
  await fetchStats(2);
  await fetchStats(3);
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

  .button {
    position: relative;

    > span:nth-child(2) {
      position: absolute;
      top: 50%;
      left: 50%;

      display: block;
      height: 3.4rem;

      transform: translate(-50%, -50%);

      svg {
        height: 100%;
        width: auto;
      }
    }

    &.buttonIsSubmitting {
      > span:first-child {
        color: transparent;
      }
    }
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
