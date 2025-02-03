export interface ChartData {
  labels: string[];
  datasets: Dataset[];
}

interface Dataset {
  label: string;
  data: Array<number | null>;
  backgroundColor?: string | string[];
  tension?: number;
  borderWidth?: number | number[];
  borderColor?: string | string[];
  pointBackgroundColor?: string | string[];
  pointBorderColor?: string | string[];
  pointBorderWidth?: number;
  pointRadius?: number;
}

export interface DoughnutChartData {
  labels: string[];
  datasets: DoughnutDataset[];
}

interface DoughnutDataset {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
  tension?: number;
  borderWidth?: number | number[];
  borderColor?: string | string[];
  pointBackgroundColor?: string | string[];
  pointBorderColor?: string | string[];
  pointBorderWidth?: number;
  pointRadius?: number;
}
