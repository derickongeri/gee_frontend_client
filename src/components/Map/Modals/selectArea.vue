<template>
  <div
    style="
      min-width: 250px;
      background-color: #b5caca00;
      border-radius: 20px;
    "
  >
  <div class="q-px-sm text-grey-4 text-h6" style="height: 5vh"></div>
  <div class="q-px-sm text-grey-4 text-h6">Select Area</div>
    <q-select
      class="q-px-sm q-py-sm"
      bg-color="white"
      dense
      standout
      hide-dropdown-icon
      clear-icon="mdi-close"
      color="grey-9"
      input-class="input-option"
      options-selected-class="text-green-7"
      popup-content-class="selection-options"
      v-model="selectedRegion"
      :options="filterOptions"
      @filter="filterFn1"
      @update:model-value="getselectedRegion"
    >
      <template v-slot:prepend>
        <q-icon size="xs" color="grey-9" name="mdi-selection-marker" @click.stop />
      </template>
      <template v-slot:append>
        <q-icon color="grey-9" name="arrow_drop_down" @click.stop />
      </template>
      <template v-slot:selected>
        <template v-if="selectedRegion">
          <div
            style="font-size: 1em"
            class="selection-content q-px-sm text-grey-9"
          >
            {{ selectedRegion }}
          </div>
        </template>
        <template v-else>
          <div style="font-size: 1em" class="selection-content text-grey-9">
            Select Region
          </div>
        </template>
      </template>
    </q-select>
  </div>
</template>

<script>
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  defineComponent,
  watch,
} from "vue";
import { useVectorStore } from "src/stores/vector_store/index.js";

export default defineComponent({
  components: {
    indicatorSelector: require("../../composables/indicatorSelection.vue")
      .default,
  },
  setup() {
    const store = useVectorStore();

    const selection = ref(true),
      filterOptions = ref([]),
      selectedRegion = ref(store.getselectedRegion);

    const regionNameOptions = computed(() => {
      let regionList = [];
      let regionName = store.regionNames;

      regionName.map((d) => {
        regionList.push(d);
      });
      return regionList.sort();
    });

    const filterFn1 = function (val, update) {
      update(() => {
        if (val === "") {
          filterOptions.value = regionNameOptions.value;
        } else {
          const needle = val.toLowerCase();
          filterOptions.value = regionNameOptions.value.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    };

    onMounted(() => {
      store.fetchRegionNames();
    });

    const getselectedRegion = function (val) {
      val = selectedRegion.value;
      store.setRegionSelected(val);
    };

    const fillSelection = computed(() => {
      return store.getselectedRegion;
    });

    watch(fillSelection, () => {
      selectedRegion.value = store.getselectedRegion;
    });

    return {
      selection,
      filterOptions,
      filterFn1,
      selectedRegion,
      getselectedRegion,
    };
  },
});
</script>

<style>
.selection-options::-webkit-scrollbar {
  width: 2px; /* width of the entire scrollbar */
  min-height: 200px;
}

.selection-options::-webkit-scrollbar-track {
  background: rgb(255, 166, 0, 0.1); /* color of the tracking area */
}

.selection-options::-webkit-scrollbar-thumb {
  background-color: rgb(219, 250, 43); /* color of the scroll thumb */
  border-radius: 20px; /* roundness of the scroll thumb */
  border: 3px solid rgba(255, 166, 0, 0); /* creates padding around scroll thumb */
}

.input-option {
  color: white;
  font-size: 2em;
  /* height: fit-content; */
  /*max-width: 300px;*/
}
.selected-option {
  color: white;
}

.selection-options {
  max-height: 350px;
}

.selection-content {
  font-size: 1em;
  max-width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* .q-field__marginal {
  height: 56px;
  color: rgb(255 255 255);
  font-size: 24px;
} */
</style>
