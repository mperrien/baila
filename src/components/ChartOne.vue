<template>
  <div class="chart">
    <TheLoader v-if="isLoading" />
    <div v-else class="chart__content">
      <div class="chart__chart">
        <Pie :data="chartData" :options="opt" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" scoped>
import { ref, computed, onMounted } from "vue";
import { useStore } from "@nanostores/vue";

import { $first, fetchStats } from "@/stores/stats";

import TheLoader from "@/components/TheLoader.vue";

import type { DoughnutChartData } from "@/types/charts";
import type { ChartOptions } from "chart.js";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip, Legend);

const stats = useStore($first);

const isLoading = ref<boolean>(true);

const COLORS: string[] = ["#ff0000", "#c50000", "#830000"];

const chartData = computed<DoughnutChartData>(() => {
  return {
    labels: ["Et", "Mais"],
    datasets: [
      {
        label: "",
        data: [
          stats.value["et"] ? stats.value["et"] : 0,
          stats.value["mais"] ? stats.value["mais"] : 0,
        ],
        backgroundColor: COLORS,
      },
    ],
  };
});

const chartOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  borderColor: "transparent",
  plugins: {
    tooltip: {
      boxPadding: 5,
      callbacks: {
        label: function (context: any) {
          let v = context.formattedValue || "";
          const data = context.dataset.data;
          const total = data.reduce(
            (partialSum: number, a: number) => partialSum + a,
            0,
          );
          const percent =
            Math.round(((context.raw * 100) / total + Number.EPSILON) * 100) /
            100;

          if (v) {
            v = `${percent}%`;
          }
          return v;
        },
      },
    },
    legend: {
      labels: {
        boxHeight: 12,
        color: "#edefed",
        font: {
          family: "'Poppins', sans-serif",
          size: 20,
        },
        usePointStyle: true,
        pointStyleWidth: 17,
      },
    },
  },
};

const opt = chartOptions as any;

onMounted(async () => {
  await fetchStats(1);
  isLoading.value = false;
});
</script>
