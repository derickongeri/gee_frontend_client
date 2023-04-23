<template>
  <div>
    <div
      class="row items-center q-gutter-sm q-px-none q-mb-md"
      style="max-width: inherit"
    >
      <div class="col text-grey-9 q-my-none">
        <strong> {{$t('burnedAreaAnalysis')}}</strong>
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
            >{{$t('switchtopie')}}</q-tooltip
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
            >{{$t('switchtobar')}}</q-tooltip
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
            >{{$t('downloadImage')}}</q-tooltip
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
            >{{$t('downloadCsv')}}
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

    <div class="sub-content">
      <div class="text-justify my-font">
        <!-- <p class="my-font" style="font-size: 16px"> -->
          <!-- The <b>total burned area</b> was <b>{{ totalArea }}Ha</b>, which
          coresponds to the sum of all burn Severity categories i.e very high
          severity <b>{{ arealist[0] }}Ha</b>, High severity
          <b>{{ arealist[1] }}Ha</b>, Moderate severity
          <b>{{ arealist[2] }}Ha</b> and the Low severity
          <b>{{ arealist[3] }}Ha</b>. -->
          <div style="font-size: 16px" v-html="$t('burnt_area_summary', { totalBurnedArea: `<b>${totalArea}</b>`, veryHighSeverity: `<b>${arealist[0]}</b>`, highSeverity: `<b>${arealist[1]}</b>`, moderateSeverity: `<b>${arealist[2]}</b>`, lowSeverity: `<b>${arealist[3]}</b>` })"></div>
        <!-- </p> -->
      </div>

      <div>
        <barChart
          :chartData="barchartData"
          id="chart-canvas"
          ref="chartRef"
          v-if="chartType === 'bar'"
        />
      </div>

      <pieChart
        :chartData="piechartData"
        id="chart-canvas"
        ref="chartRef"
        v-if="chartType === 'pie'"
      />
    </div>

    <div>
      <q-inner-loading
        :showing="visible"
        style="background-color: #eaf0f055; backdrop-filter: blur(5px)"
        label="Fetching Statistics. This may take a while. Please wait..."
        label-class="text-teal"
        label-style="font-size: 1.1em"
        dark
      >
        <template v-slot:default>
          <q-spinner-dots size="50px" color="primary" />
          <span class="text-grey-9 text-center"
            ><b>{{$t('computing')}}</b>.<br />
            {{$t('loadingMsg')}}.<br />
            <i>{{$t('wati')}}...</i></span
          >
        </template>
      </q-inner-loading>
    </div>
  </div>
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
import setChartMethods from "../../../composables/chartMethods.js";
import setLayerStats from "./fetchStats";
import { useVectorStore } from "../../../stores/vector_store/index.js";

export default {
  components: {
    stackedBarChart: require("../../charts/stackedBar.vue").default,
    pieChart: require("../../charts/pieChart.vue").default,
    lineChart: require("../../charts/lineChart.vue").default,
    barChart: require("../../charts/barChart.vue").default,
    socials: require("../../socials/shareNetwork.vue").default,
  },

  setup() {
    const store = useVectorStore();
    const { stackBarChart } = setChartMethods();
    const { getRasterStats } = setLayerStats();

    const chartType = ref("bar");
    const totalArea = ref(0);
    const arealist = ref([0, 0, 0, 0]);
    const tsChartType = ref("bar-stacked");
    const selectedChartID = ref("stackedBar");
    const activeBtn = ref(["grey-7", "orange", "grey-7", "orange"]);
    const chartRef = ref(null);
    const stackedBarChartOptions = ref(stackBarChart(false));
    const stackedOption = ref(false);
    const visible = ref(false);
    const showSimulatedReturnData = ref(false);
    const barchartData = ref({
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
          data: [0, 0, 0, 0, 0, 0, 0, 0],
          barPercentage: 0.75,
          categoryPercentage: 0.75,
        },
      ],
    });
    const piechartData = ref({
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
          radius: "80%",
          data: [0, 0, 0, 0, 0, 0, 0, 0],
        },
      ],
    });
    const selectedVector = ref(null);

    const fetchChartData = async () => {
      try {
        let chartDataProps = await getRasterStats();

        console.log(chartDataProps, "data");
        barchartData.value = {
          labels: chartDataProps.labels,
          datasets: [
            {
              backgroundColor: chartDataProps.palette,
              data: chartDataProps.data,
              barPercentage: 0.75,
              categoryPercentage: 0.75,
            },
          ],
        };
        piechartData.value = {
          labels: chartDataProps.labels,
          datasets: [
            {
              backgroundColor: chartDataProps.palette,
              borderColor: "rgba(0, 0, 0, 0)",
              borderRadius: 0,
              borderWidth: 0,
              spacing: 0,
              cutout: "75",
              radius: "80%",
              data: chartDataProps.data,
            },
          ],
        };
        console.log(barchartData.value, "updated");

        arealist.value = chartDataProps.data;

        totalArea.value = chartDataProps.data.reduce((a, b) => a + b, 0);

        return barchartData.value;
      } catch (error) {}
    };

    const showTextLoading = () => {
      visible.value = true;
      showSimulatedReturnData.value = false;
      fetchChartData().then(() => {
        visible.value = false;
        showSimulatedReturnData.value = true;
      });
    };

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

    onMounted(() => {
      showTextLoading();
    });

    const vector = computed(() => {
      selectedVector.value = store.getCustomGeojson;
      return selectedVector.value;
    });

    watch(vector, () => {
      showTextLoading();
    });

    return {
      visible,
      showSimulatedReturnData,
      value: ref(true),
      icon: ref(false),
      share: ref(false),
      activeBtn,
      chartType,
      barchartData,
      showTextLoading,
      fetchChartData,
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
      piechartData,
      totalArea,
      arealist,
    };
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400&family=Raleway:wght@100&display=swap");
</style>
