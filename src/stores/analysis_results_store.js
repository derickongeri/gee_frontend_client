import { defineStore } from 'pinia';
import { storeToRefs } from 'pinia';
import {useVectorStore} from "src/stores/vector_store/index"

const {getCustomGeojson, getDatesSelected} = storeToRefs(useVectorStore())

export const useAnalysisResultsStore = defineStore('analysis_results_store', {
  state: () => ({
    results: "", //holds  analysis results
  }),
  getters: {
    getAnalysisResults: (state) => state.results, // get analysis results
  },
  actions: {
    // store the requested analysis results
    setAnalysisResults(results) {
      this.results = results
    },
    },
});
