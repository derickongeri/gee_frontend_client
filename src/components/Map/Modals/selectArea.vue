<template>
  <div class="q-pa-none" style="max-width: 600px">
    <q-card class="" style="background-color: #00000000">
      <q-tabs
        v-model="tab"
        dense
        inline-label
        class="text-grey-4 q-px-sm justify-left"
        align="justify"
        style="background-color: #00000088"
        indicator-color="transparent"
        active-color="orange"
      >
        <q-span class="row q-ml-none on-left">
          <q-tab name="mails" icon="bar_chart" label="Analysis" no-caps />
          <q-tab
            name="alarms"
            icon="mdi-selection-marker"
            label="Select Area"
            no-caps
          />
        </q-span>
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated style="background-color: #00000088">
        <q-tab-panel name="mails" class="q-pa-none">
          <div class="q-pa-none text-white">
            <q-list dark separator style="width: 318px">
              <q-expansion-item
                expand-separator
                icon="mdi-fire"
                label="Account settings"
                caption="John Doe"
              >
                <q-card>
                  <q-card-section>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Quidem, eius reprehenderit eos corrupti commodi magni
                    quaerat ex numquam, dolorum officiis modi facere maiores
                    architecto suscipit iste eveniet doloribus ullam aliquid.
                  </q-card-section>
                </q-card>
              </q-expansion-item>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label class="text-h6" style="font-size: 1.5em"
                    >Forest Fire</q-item-label
                  >
                  <q-item-label caption>Burn Severity Mapping</q-item-label>
                </q-item-section>

                <q-menu fit>
                  <div class="q-pa-md" style="max-width: 300px">
                    <div class="q-pb-sm">Pre-fire date range</div>
                    <q-input dark rounded outlined dense readonly>
                      <template v-slot:prepend>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            anchor="bottom left"
                            self="top left"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date v-model="date" range minimal dark>
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="Close"
                                  color="primary"
                                  flat
                                />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                        <q-span style="font-size: 0.5em">from:</q-span>
                        <q-chip
                          v-if="date"
                          dense
                          square
                          text-color="grey-2"
                          class="q-my-none q-ml-xs q-mr-none"
                          style="background-color: #00000000"
                        >
                          {{ date.from }}
                        </q-chip>
                        <q-span style="font-size: 0.5em">to:</q-span>
                        <q-chip
                          v-if="date"
                          dense
                          square
                          text-color="grey-2"
                          class="q-my-none q-ml-xs q-mr-none"
                          style="background-color: #00000000"
                        >
                          {{ date.to }}
                        </q-chip>
                      </template>
                    </q-input>
                  </div>
                  <div class="q-pa-md" style="max-width: 300px">
                    <div class="q-pb-sm">Post-fire date range</div>
                    <q-input dark rounded outlined dense readonly>
                      <template v-slot:prepend>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            anchor="bottom left"
                            self="top left"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date v-model="date" range minimal dark>
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="Close"
                                  color="primary"
                                  flat
                                />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                        <q-span style="font-size: 0.5em">from:</q-span>
                        <q-chip
                          v-if="date"
                          dense
                          square
                          text-color="grey-2"
                          class="q-my-none q-ml-xs q-mr-none"
                          style="background-color: #00000000"
                        >
                          <q-popup-proxy
                            anchor="bottom left"
                            self="top left"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date v-model="date" range minimal dark>
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="Close"
                                  color="primary"
                                  flat
                                />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                          {{ date.from }}
                        </q-chip>
                        <q-span style="font-size: 0.5em">to:</q-span>
                        <q-chip
                          v-if="date"
                          dense
                          square
                          text-color="grey-2"
                          class="q-my-none q-ml-xs q-mr-none"
                          style="background-color: #00000000"
                        >
                          {{ date.to }}
                        </q-chip>
                      </template>
                    </q-input>
                  </div>
                </q-menu>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label class="text-h6" style="font-size: 1.5em"
                    >Forest Fire</q-item-label
                  >
                  <q-item-label caption>Burn Severity Mapping</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label class="text-h6" style="font-size: 1.5em"
                    >Forest Fire</q-item-label
                  >
                  <q-item-label caption>Burn Severity Mapping</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <!-- <q-splitter v-model="splitterModel" style="height: 250px">
            <template v-slot:before>
              <q-tabs
                dense
                v-model="innerTab"
                vertical
                switch-indicator
                active-class="text-grey-1"
                class="text-grey"
              >
                <q-tab name="innerMails" icon="mdi-fire" label="Fire" />
                <q-tab name="innerAlarms" icon="alarm" label="Alarms" />
                <q-tab name="innerMovies" icon="movie" label="Movies" />
              </q-tabs>
            </template>

            <template v-slot:after>
              <q-tab-panels
                v-model="innerTab"
                animated
                transition-prev="slide-down"
                transition-next="slide-up"
                style="background-color: #00000000"
                class="text-grey-1"
              >
                <q-tab-panel name="innerMails">
                  <div class="text-h6 q-mb-md">Forestfire Assessment</div>
                  <div class="q-pa-md" style="max-width: 300px">
                    <q-input dark rounded outlined dense readonly>
                      <template v-slot:prepend>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            anchor="bottom left"
                            self="top left"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date v-model="date" range minimal dark>
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="Close"
                                  color="primary"
                                  flat
                                />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                        <q-span style="font-size: 0.5em">from:</q-span>
                        <q-chip
                          v-if="date"
                          dense
                          square
                          text-color="grey-2"
                          class="q-my-none q-ml-xs q-mr-none"
                          style="background-color: #00000000"
                        >
                          {{ date.from }}
                        </q-chip>
                        <q-span style="font-size: 0.5em">to:</q-span>
                        <q-chip
                          v-if="date"
                          dense
                          square
                          text-color="grey-2"
                          class="q-my-none q-ml-xs q-mr-none"
                          style="background-color: #00000000"
                        >
                          {{ date.to }}
                        </q-chip>
                      </template>
                    </q-input>
                  </div>
                  <div class="q-pa-md" style="max-width: 300px">
                    <q-input dark rounded outlined dense readonly>
                      <template v-slot:prepend>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            anchor="bottom left"
                            self="top left"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date v-model="date" range minimal dark>
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="Close"
                                  color="primary"
                                  flat
                                />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                        <q-span style="font-size: 0.5em">from:</q-span>
                        <q-chip
                          v-if="date"
                          dense
                          square
                          text-color="grey-2"
                          class="q-my-none q-ml-xs q-mr-none"
                          style="background-color: #00000000"
                        >
                          <q-popup-proxy
                            anchor="bottom left"
                            self="top left"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date v-model="date" range minimal dark>
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="Close"
                                  color="primary"
                                  flat
                                />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                          {{ date.from }}
                        </q-chip>
                        <q-span style="font-size: 0.5em">to:</q-span>
                        <q-chip
                          v-if="date"
                          dense
                          square
                          text-color="grey-2"
                          class="q-my-none q-ml-xs q-mr-none"
                          style="background-color: #00000000"
                        >
                          {{ date.to }}
                        </q-chip>
                      </template>
                    </q-input>
                  </div>
                </q-tab-panel>

                <q-tab-panel name="innerAlarms"> </q-tab-panel>

                <q-tab-panel name="innerMovies"> </q-tab-panel>
              </q-tab-panels>
            </template>
          </q-splitter> -->
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
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
  setup() {
    const store = useVectorStore();

    const selection = ref(true),
      date = ref({ from: "2020/07/08", to: "2020/07/17" }),
      daterange = ref(null),
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

    const setDateRange = function () {
      daterange.value = date.value.from.concat(" - ", date.value.to);
    };

    onMounted(() => {
      store.fetchRegionNames();
      daterange.value = date.value.from.concat(" - ", date.value.to);
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
      tab: ref("mails"),
      innerTab: ref("innerMails"),
      splitterModel: ref(20),
      date,
      daterange,
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
