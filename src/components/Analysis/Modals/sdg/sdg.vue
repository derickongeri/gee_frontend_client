<template>
  <!-- <q-scroll-area
    :thumb-style="thumbStyle"
    :content-style="contentStyle"
    :content-active-style="contentActiveStyle"
    style="height: 96vh; min-width: 300px; border-radius: 20px"
  > -->

  <div class="row items-center q-gutter-sm q-px-none q-mb-md" style="max-width: 400px">
    <div class="col text-grey-9 q-my-none">
      <strong> Burn Severity Classes</strong>
    </div>
    <q-space />
    <div id="chart-btns">
      <q-btn
        unelevated
        round
        flat
        dense
        size="9px"
        :color="activeBtn[0]"
        icon="mdi-chart-donut"
        @click="changeCharttype('pie')"
      >
        <q-tooltip
          class="bg-grey-9"
          anchor="top middle"
          self="bottom middle"
          :offset="[5, 5]"
          >switch to pie chart</q-tooltip
        >
      </q-btn>
      <q-btn
        style="transform: rotate(90deg)"
        unelevated
        round
        flat
        dense
        size="9px"
        :color="activeBtn[1]"
        icon="mdi-poll"
        @click="changeCharttype('bar')"
      >
        <q-tooltip
          class="bg-grey-9"
          anchor="top middle"
          self="bottom middle"
          :offset="[5, 5]"
          >switch to bar chart</q-tooltip
        >
      </q-btn>
      <q-btn
        unelevated
        round
        flat
        dense
        type="submit"
        size="9px"
        color="grey-4"
        icon="crop"
        @click="exportChart"
      >
        <q-tooltip
          class="bg-grey-9"
          anchor="top middle"
          self="bottom middle"
          :offset="[5, 5]"
          >download chart image</q-tooltip
        >
      </q-btn>
      <q-btn
        unelevated
        round
        flat
        dense
        type="submit"
        size="9px"
        color="grey-7"
        icon="mdi-download"
        @click="exportChart"
      >
        <q-tooltip
          class="bg-grey-9"
          anchor="top middle"
          self="bottom middle"
          :offset="[5, 5]"
          >download csv data
        </q-tooltip>
      </q-btn>
      <q-btn
        unelevated
        round
        flat
        dense
        size="9px"
        color="grey-7"
        icon="share"
        @click="share = true"
      >
        <q-dialog v-model="share">
          <socials />
        </q-dialog>
      </q-btn>
    </div>
  </div>

  <barChart id="chart-canvas" ref="chartRef" v-if="chartType === 'bar'" />
  <pieChart id="chart-canvas" ref="chartRef" v-if="chartType === 'pie'" />

  <!-- </q-scroll-area> -->
</template>

<script>
import {
  computed,
  onBeforeMount,
  onMounted,
  onUpdated,
  provide,
  reactive,
  ref,
  watch,
} from "vue";

import { Loading, QSpinnerFacebook, QSpinnerIos, QSpinnerOval } from "quasar";
import setChartMethods from "../../../../composables/chartMethods.js";

export default {
  components: {
    stackedBarChart: require("../../../charts/stackedBar.vue").default,
    pieChart: require("../../../charts/pieChart.vue").default,
    lineChart: require("../../../charts/lineChart.vue").default,
    barChart: require("../../../charts/barChart.vue").default,
    socials: require("../../../../components/socials/shareNetwork.vue").default,
  },

  setup() {
    const { stackBarChart } = setChartMethods();

    const chartType = ref("bar");
    const tsChartType = ref("bar-stacked");
    const selectedChartID = ref("stackedBar");
    const activeBtn = ref(["grey-7", "orange", "grey-7", "orange"]);
    const chartRef = ref(null);
    const stackedBarChartOptions = ref(stackBarChart(false));
    const stackedOption = ref(false);

    const stackChart = function () {
      stackedOption.value = !stackedOption.value;
      stackedBarChartOptions.value = stackBarChart(stackedOption);
    };

    const changeCharttype = function (val) {
      chartType.value = val;
      chartType.value === "pie"
        ? (activeBtn.value = [
            "orange",
            "grey-7",
            activeBtn.value[2],
            activeBtn.value[3],
          ])
        : (activeBtn.value = [
            "grey-7",
            "orange",
            activeBtn.value[2],
            activeBtn.value[3],
          ]);
    };

    const switchTimeSieriesCharttype = function (val) {
      tsChartType.value = val;
      tsChartType.value === "line"
        ? (activeBtn.value = [
            activeBtn.value[0],
            activeBtn.value[1],
            "orange",
            "grey-7",
          ])
        : (activeBtn.value = [
            activeBtn.value[0],
            activeBtn.value[1],
            "grey-7",
            "orange",
          ]);
    };

    const exportChart = (val) => {
      let elementIdname = val;
      chartType.value === "pie"
        ? (elementIdname = "pie-chart")
        : (elementIdname = "bar-chart");
      let chart = document.getElementById(elementIdname).toDataURL("image/png");
      let a = document.createElement("a");
      a.href = chart;
      a.download = "image-export.png";
      a.click();
      a = null;
    };

    return {
      value: ref(true),
      icon: ref(false),
      share: ref(false),
      activeBtn,
      chartType,
      tsChartType,
      model: ref("2015"),
      options: ["2015", "2016", "2017", "2018", "2019"],
      changeCharttype,
      switchTimeSieriesCharttype,
      chartRef,
      selectedChartID,
      exportChart,
      stackedBarChartOptions,
      stackChart,
      contentStyle: {
        backgroundColor: "rgba(0,0,0,0.0)",
        color: "#555",
      },

      contentActiveStyle: {
        backgroundColor: "#eee",
        color: "black",
      },

      thumbStyle: {
        right: "-2px",
        borderRadius: "5px",
        backgroundColor: "#027be3",
        width: "5px",
        opacity: "0.75",
      },
    };
  },
};
</script>

<style></style>
