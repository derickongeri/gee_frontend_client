<template>
  <div
    class="q-my-none q-mt-none"
    style="
      width: 100%;
      heiht: 70%;
      border: 0px solid rgb(160, 160, 160);
      position: relative;
    "
  >
    <Bar
      :chartData="chartData"
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "BarChart",
  components: { Bar },
  props: {
    chartData: {
      type: Object,
      default: {
        labels: [
          "Regrowth, High",
          "Regrowth, Low",
          "Unburned",
          "Low Severity",
          "Moderate Severity",
          "High Severity",
          "Very High Severity",
          "NA",
        ],
        datasets: [
          {
            backgroundColor: [
              "#7a8737",
              "#acbe4d",
              "#0ae042",
              "#fff70b",
              "#ffaf38",
              "#ff641b",
              "#a41fd6",
              "#ffffff",
            ],
            data: [6, 364, 487171, 113675, 89094, 617, 3, 0],
            barPercentage: 0.75,
            categoryPercentage: 0.75,
          },
        ],
      },
    },
    chartId: {
      type: String,
      default: "bar-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 300,
    },
    height: {
      type: Number,
      default: 200,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      chartOptions: {
        layout: {
          padding: 0,
        },
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          datalabels: {
            display: "auto",
            anchor: "end",
            align: "end",
            offset: 10,
            opacity: 0.9,
            formatter: (val, ctx) => {
              // Grab the label for this value
              const label = ctx.chart.data.labels[ctx.dataIndex];

              // Format the number with 2 decimal places
              const formattedVal = Intl.NumberFormat("en-US", {
                minimumFractionDigits: 1,
              }).format(val);

              // Put them together
              return `${formattedVal}`;
            },
            borderRadius: 5,
            leftborderWidth: 2,
            borderColor: ["#b71c1c", "#2e7d32", "#fff9b4"],
            color: "#404040",
            size: "11",
            backgroundColor: "#fff",
          },
          legend: {
            display: false,
            position: "bottom",
            labels: {
              font: {
                fontColor: "#EEEEEE",
              },
            },
          },
          title: {
            display: true,
            text: "Land Area",
            position: "bottom",
            color: "#9e9d24",
          },
        },
        indexAxis: "y",
        elements: {
          bar: {
            borderWidth: 0,
            inflateAmount: 0,
            borderRadius: 20,
            borderSkipped: false,
          },
        },
        scales: {
          x: {
            min: 0,
            max: 700000,
            ticks: {
              callback: function (value) {
                value = value.toFixed() / 1000;
                return `${value}`;
              },
              color: "black",
            },
            grid: {
              color: "",
            },
          },
          y: {
            ticks: {
              color: "black",
              tickLength: 0,
            },
            grid: {
              color: "#9e9d24",
              borderDash: [1, 10],
              drawBorder: false,
              tickLength: 0,
              tickWidth: 0,
            },
          },
        },
      },
    };
  },
};
</script>
