import { axios } from "boot/axios";
import { Loading, QSpinnerOval } from "quasar";
import { defineStore } from "pinia";

export const useVectorStore = defineStore({
  id: "vectorStore",
  state: () => ({
    regionNames: [],
    countryNames: [],
    subRegionNames: [],
    selectedRegion: "Aberdare NP",
    slectedCountry: "",
    selectedSubregion: "",
    selectedYear: 2010,
    customGeojson: null,
  }),
  getters: {
    getRegionNames: (state) => state.regionNames,
    getselectedRegion: (state) => state.selectedRegion,
    getselectedCountry: (state) => state.slectedCountry,
    getselectedSubRegion: (state) => state.selectedSubregion,
    getYearSelected: (state) => state.selectedYear,
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

    setRegionSelected(val) {
      this.selectedRegion = val;
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
  },
});
