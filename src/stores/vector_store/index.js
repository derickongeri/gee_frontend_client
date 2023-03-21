import { axios } from "boot/axios";
import { Loading, QSpinnerOval } from "quasar";
import { defineStore } from "pinia";

export const useVectorStore = defineStore({
  id: "vectorStore",
  state: () => ({
    regionNames: [],
    countryNames: [],
    subRegionNames: [],
    selectedRegion: "",
    slectedCountry: "",
    selectedSubregion: "",
    selectedYear: 2010,
    customGeojson: null,
    datesSelected: [
      { from: '2023-01-01', to: '2023-01-31' },
      { from: '2023-02-15', to: '2023-02-23' }
    ],
    statistics: {
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
    },
    statsVisibility: false,
  }),
  getters: {
    getRegionNames: (state) => state.regionNames,
    getselectedRegion: (state) => state.selectedRegion,
    getselectedCountry: (state) => state.slectedCountry,
    getselectedSubRegion: (state) => state.selectedSubregion,
    getYearSelected: (state) => state.selectedYear,
    getDatesSelected: (state) => state.datesSelected,
    getStoredStats: (state) => state.statistics,
    getCustomGeojson: (state) => state.customGeojson,
    getStatsVisibility: (state) => state.statsVisibility
  },
  actions: {
    async fetchRegionNames() {
      const { data, error } = await axios.get(
        "http://78.141.234.158/geoserver/kenyadata/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=kenyadata%3Akwsparks&maxFeatures=50&outputFormat=application%2Fjson"
      );

      const countriesArray = data.features;

      countriesArray.forEach((d) => {
        if (this.regionNames.indexOf(d.properties.NAME_1) === -1) {
          this.regionNames.push(d.properties.NAME_1);
        }
      });
    },

    async fetchSubRegionNames() {
      const { data, error } = await axios.get(
        "http://78.141.234.158/geoserver/Misland/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Misland%3AAfrica_adm_1&maxFeatures=900&outputFormat=application%2Fjson"
      );

      this.subRegionNames = data.features;
    },

    setCustomGeometryData(layer) {
      this.customGeojson = layer;
      console.log(typeof(this.customGeojson), "in store");
    },

    setDatesSelected(val) {
      this.datesSelected = val
    },

    setRegionSelected(val) {
      this.selectedRegion = val;
      console.log(this.selectedRegion)
    },
    setCountrySelected(val) {
      this.slectedCountry = val;
    },
    setSubRegionSelected(val) {
      this.selectedSubregion = val;
    },
    setSelectedYear(val) {
      this.selectedYear = val;
      console.log(this.selectedYear);
    },

    setStats(val){
      this.statistics = val
    },

    setStatsVisibility(val){
      this.statsVisibility = val
    }
  },
});
