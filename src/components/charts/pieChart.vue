<template>
  <div class="q-my-none q-mt-none " style="
      max-width: 80%;
      left: 10%;
      border: 0px solid rgb(160, 160, 160);
      border-radius: 20px;
      position: relative;
    ">
    <Pie :chartData="chartData" :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId"
      :dataset-id-key="datasetIdKey" :plugins="plugins" :css-classes="cssClasses" :styles="styles" :width="width"
      :height="height"/>
  </div>
</template>

<script>
import { Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  Plugin
} from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  Title, Tooltip, Legend, ArcElement, CategoryScale, ChartDataLabels
);

export default {
  name: "BarChart",
  components: { Pie },
  props: {
    chartOptions: {
      type: Object,
      default: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          datalabels: {
            display: 'auto',
            anchor: 'center',
            align: 'center',
            offset: 4,
            opacity: 0.7,
            formatter: (val, ctx) => {
              // Grab the label for this value
              const label = ctx.chart.data.labels[ctx.dataIndex];

              // Format the number with 2 decimal places
              const formattedVal = Intl.NumberFormat('en-US', {
                minimumFractionDigits: 1,
              }).format(val);

              // Put them together
              return `${formattedVal} Ha`;
            },
            borderRadius: 5,
            leftborderWidth: 2,
            borderColor: ['#b71c1c', '#2e7d32', '#fff9b4'],
            color: '#404040',
            size: '8',
            backgroundColor: '#fff',
          },
          legend: {
            display: true,
            position: "left",
            labels: {
              font: {
                fontColor: "#EEEEEE",
              },
              usePointStyle: true,
              padding: 25
            },
          },
          title: {
            display: false,
            align: 'start',
            text: "Crop Area in Ha",
            position: "top",
            color: "#404040",
          },
        },
      }
    },
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
        datasets: [{
          backgroundColor: [
        "#ffffff",
        "#7a8737",
        "#acbe4d",
        "#0ae042",
        "#fff70b",
        "#ffaf38",
        "#ff641b",
        "#a41fd6",
      ],
          borderColor: "rgba(0, 0, 0, 0)",
          borderRadius: 0,
          borderWidth: 0,
          spacing: 0,
          cutout: "50",
          radius: "75%",
          data: [0, 0, 0, 0, 0, 0, 0, 0]
        }],
      },
      required: true
    },
    chartId: {
      type: String,
      default: 'pie-chart'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 300
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => { }
    },
    plugins: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // chartOptions: {
      //   responsive: true,
      //   plugins: {
      //     legend: {
      //       display: true,
      //       position: "right",
      //       labels: {
      //         font: {
      //           fontColor: "#EEEEEE",
      //         },
      //       },
      //     },
      //     title: {
      //       display: false,
      //       text: "Crop Area in Ha",
      //       position: "left",
      //       color: "#EEEEEE",
      //     },
      //   },
      // },
    };
  },
};
</script>
