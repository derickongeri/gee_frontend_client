<template>
  <div class="q-pa-none" style="position: relative; max-width: 250px; top: 10%">
    <q-list v-if="!mobileView">
      <q-item clickable v-ripple @click="seamless = !seamless">
        <q-item-section class="text-center">
          <q-item-label
            ><q-icon name="mdi-pine-tree-fire" color="grey-10" size="md"
          /></q-item-label>
          <q-item-label caption style="font-size: 0.75em"
            >BURNED <br/> AREA</q-item-label
          >
        </q-item-section>
        <q-popup-proxy anchor="top right" self="top left" :offset="[10, 0]">
          <q-card
            class="my-font"
            style="max-width: fit-content; background-color: #e7e4df00"
          >
            <q-card-section class="row items-center q-pb-none">
              <div
                class="text-h6"
                style="color: #3c4e3d; font-size: 1.2rem; font-weight: bold"
              >
                {{$t('burnedAreaAnalysis')}}
              </div>
              <q-space />
              <q-btn icon="close" size="sm" flat round dense v-close-popup />
            </q-card-section>

            <q-card-section>
              <forestfires />
            </q-card-section>
          </q-card>
        </q-popup-proxy>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section class="text-center">
          <q-item-label
            ><q-icon name="mdi-forest" color="grey-7" size="md"
          /></q-item-label>
          <q-item-label style="font-size: 0.75em" caption
            >FOREST <br /> LOSS</q-item-label
          >
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section class="text-center">
          <q-item-label
            ><q-icon name="mdi-fire-alert" color="grey-7" size="md"
          /></q-item-label>
          <q-item-label style="font-size: 0.75em" caption
            >FIRE <br /> ALERT</q-item-label
          >
        </q-item-section>
      </q-item>
    </q-list>

    <div v-else>
      <q-list class="row">
      <q-item clickable v-ripple @click="seamless = !seamless">
        <q-item-section class="text-center">
          <q-item-label
            ><q-icon name="mdi-fire" color="grey-10" size="md"
          /></q-item-label>
          <q-item-label caption style="font-size: 0.75em"
            >BURNED <br /> AREA</q-item-label
          >
        </q-item-section>
        <q-popup-proxy anchor="top right" self="top left" :offset="[10, 0]">
          <q-card
            class="bg-white my-font"
            style="max-width: fit-content; background-color: #e7e4df00"
          >
            <q-card-section class="row items-center q-pb-none">
              <div
                class="text-h6"
                style="color: #3c4e3d; font-size: 1.2rem; font-weight: bold"
              >
                Burned Area Analysis
              </div>
              <q-space />
              <q-btn icon="close" size="sm" flat round dense v-close-popup />
            </q-card-section>

            <q-card-section>
              <forestfires />
            </q-card-section>
          </q-card>
        </q-popup-proxy>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section class="text-center">
          <q-item-label
            ><q-icon name="mdi-forest" color="grey-7" size="md"
          /></q-item-label>
          <q-item-label style="font-size: 0.75em" caption
            >FOREST <br /> LOSS</q-item-label
          >
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section class="text-center">
          <q-item-label
            ><q-icon name="mdi-fire-alert" color="grey-7" size="md"
          /></q-item-label>
          <q-item-label style="font-size: 0.75em" caption
            >FIRE <br /> ALERT</q-item-label
          >
        </q-item-section>
      </q-item>
      </q-list>
    </div>
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
  getCurrentInstance,
  onBeforeMount,
} from "vue";

import { useIndicatorSelectionStore } from "src/stores/indicator_selection_store"; // user indicator selection store
//const { setExpansionItemSelections } = useIndicatorSelectionStore(); // action to set user form selections to the store

export default {
  components: {
    forestfires: require("../Analysis/Forms/forestfires.vue").default,
  },
  props: {
    active_indicator_selection: String,
  },
  setup(props) {
    const { setExpansionItemSelections } = useIndicatorSelectionStore(); // action to set user form selections to the store

    const indicator_expansions = ref({
      expand_forest_fire: false,
      expand_vegetation_indicators: false,
      expand_weather_climate_indicators: false,
      expand_surface_water_indicators: false,
      expand_landcover_indicators: false,
    });

    const updateUserSelection = () => {
      setExpansionItemSelections(indicator_expansions.value);
      console.log(indicator_expansions.value);
    };

    watch(props.active_indicator_selection, (val) => {
      if (!val) return;
      indicator_expansions.value[val] = true;
    });

    return {
      indicator_expansions,
      updateUserSelection,
      seamless: ref(false),
      mobileView: ref(window.matchMedia("(max-width: 768px)").matches)
    };
  },
};
</script>

<style scoped>
.indicator-header {
  font-size: 12pt;
  font-family: "Hanken Grotesk", sans-serif;
}
</style>
