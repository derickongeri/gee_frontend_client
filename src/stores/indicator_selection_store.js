import { useVectorStore } from "./vector_store/index.js";
import { defineStore } from "pinia";

const vectStore = useVectorStore();

export const useIndicatorSelectionStore = defineStore(
  "indicator_selection_store",
  {
    state: () => ({
      firePeriod: {},
      geometryData: null,
    }),
    getters: {
      getFirePeriod: (state) => state.firePeriod,
      getGeometryData: (state) => state.geometryData,
    },
    actions: {
      
    },
  }
);
