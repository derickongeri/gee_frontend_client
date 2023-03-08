<template>
  <div class="q-pa-none q-ma-none text-lime-9" style="min-width: 15vw">
    <q-list
      padding
      class="rounded-borders q-pa-none q-ma-none"
    >
      <!-- --------------------------------FOREST FIRE INDICATORS---------------------------------------------   -->
      <q-expansion-item
        group="indicatorgroup"
        v-model="indicator_expansions.expand_forest_fire"
        @update:model-value="updateUserSelection"
      >
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar icon="mdi-fire" size="xl"/>
          </q-item-section>
          <q-item-section class="indicator-header text-h6">
            Forest Fire
          </q-item-section>
        </template>
        <q-card class="bg-grey-1">
          <q-card-section>
            <forestfires/>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- --------------------------------VEGETATION INDICATORS---------------------------------------------   -->
      <q-expansion-item
        group="indicatorgroup"
        v-model="indicator_expansions.expand_vegetation_indicators"
        @update:model-value="updateUserSelection"
      >
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar icon="mdi-fire" size="xl" />
          </q-item-section>
          <q-item-section class="indicator-header">
            Vegetation
          </q-item-section>
        </template>
        <q-card class="bg-grey-9" style="max-width:328px">
          <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem,
            eius reprehenderit eos corrupti commodi magni quaerat ex numquam,
            dolorum officiis modi facere maiores architecto suscipit iste
            eveniet doloribus ullam aliquid.
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-separator />
    </q-list>
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
      console.log(indicator_expansions.value)
    };

    watch(props.active_indicator_selection, (val) => {
      if (!val) return;
      indicator_expansions.value[val] = true;
    });

    return {
      indicator_expansions,
      updateUserSelection,
    };
  },
};
</script>

<style scoped>
.indicator-header{
  font-size: 12pt;
  font-family: 'Hanken Grotesk', sans-serif;
}
</style>
