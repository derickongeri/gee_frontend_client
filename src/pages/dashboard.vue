<template>
  <!-- <q-layout view="hHh lpR fFf">
    <q-page-container style="padding-bottom: 0px"> -->
      <q-page class="row bg-grey-2">
        <div
          class="col bg-grey-2 q-my-sm items-center web-view"
          style="
            max-width: fit-content;
            max-height: inherit;
            border-radius: 0 15px 0 0;
          "
        >
          <selectionsTab />
        </div>
        <div class="col">
          <mappanel />
        </div>

        <div v-if="matchMediaDesktop">
          <analysisPanel
            class="col q-my-sm web-view"
            style="
              max-width: fit-content;
              max-height: inherit;
              border-radius: 0 15px 0 0;
            "
          />
        </div>
        <!-- <div v-show="showAnalysismobile" class="analysis-panel-mobile bg-white">
          <div class="row">
            <h6 class="q-pa-md q-ma-none">Statistics</h6>
            <q-space />
            <div class="show-stats-btn-mobile q-pa-md" style="">
              <q-btn
                class="p-py-sm"
                icon="expand_more"
                flat
                round
                dense
                @click="showAnalysismobile = !showAnalysismobile"
              />
            </div>
          </div>
          <div>
            <analysisPanel class="" style="" />
          </div>
        </div> -->

        <div
          v-show="showLayerSelection"
          style="
            position: absolute;
            bottom: 0%;
            min-height: 50vh;
            z-index: 5000;
          "
        >
          <!-- <div style="position:absolute; bottom:0%;max-height: 50vh; width: 100vw">
            <div class="row bg-white">
              <h6 class="my-font q-pa-md q-ma-none">Layer Settings</h6>
              <q-space />
              <div class="show-stats-btn-mobile q-pa-md" style="">
                <q-btn
                  class="p-py-sm"
                  icon="expand_more"
                  flat
                  round
                  dense
                  @click="showLayerSelection = !showLayerSelection"
                />
              </div>
            </div>
            <div clickable @click="showLayerSelection = !showLayerSelection" class="bg-white q-py-md" style="min-height: 25vh">
              <selectionsTab />
            </div>
          </div> -->

          <q-tab-panels
            class="q-pa-none q-ma-none"
            v-model="tab"
            animated
            keep-alive
            style="
              position: absolute;
              bottom: 0vh;
              border-radius: 15px 15px 0px 0px;
            "
          >
            <q-tab-panel name="mails" class="q-pa-none q-ma-none">
              <div class="row bg-white">
                <h6 class="my-font q-pa-md q-ma-none">Layer Settings</h6>
                <q-space />
                <div class="show-stats-btn-mobile q-pa-md" style="">
                  <q-btn
                    class="p-py-sm"
                    icon="expand_more"
                    flat
                    round
                    dense
                    @click="showLayerSelection = !showLayerSelection"
                  />
                </div>
              </div>
              <div
                clickable
                @click="showLayerSelection = !showLayerSelection"
                class="bg-white q-py-md"
                style="min-height: 25vh; min-width: 100vw"
              >
                <selectionsTab />
              </div>
            </q-tab-panel>

            <q-tab-panel name="alarms" class="q-pa-none q-ma-none">
              <div class="row bg-white">
                <h6 class="my-font q-pa-md q-ma-none">Statistics</h6>
                <q-space />
                <div class="show-stats-btn-mobile q-pa-md" style="">
                  <q-btn
                    class="p-py-sm"
                    icon="expand_more"
                    flat
                    round
                    dense
                    @click="showLayerSelection = !showLayerSelection"
                  />
                </div>
              </div>
              <div
                class="bg-white q-py-none"
                style="min-height: 25vh; min-width: 100vw"
              >
                <analysisPanel class="" style="" />
              </div>
            </q-tab-panel>

            <q-tab-panel name="movies">
              <div class="text-h6">Movies</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>
          </q-tab-panels>
        </div>
        <q-dialog v-model="confirm" persistent>
          <q-card class="my-font q-pa-md" style="min-width: fit-content">
            <q-card-section
              class="row items-center q-pb-none"
              style="min-width: 25vw"
            >
              <div class="text-h6" style="font-size: 1em; font-weight: bold">
                {{$t('welcome')}}
              </div>
              <q-space />
              <q-btn
                icon="close"
                color="grey-7"
                flat
                round
                dense
                v-close-popup
                size="sm"
              />
            </q-card-section>

            <q-card-section class="row items-center">
              <span class="q-ml-none"
                >{{$t('welcomeMsg')}}?</span
              >
            </q-card-section>

            <q-card-actions align="right">
              <q-btn
                outline
                :label="$t('start_tour')"
                color="primary"
                @click="this.$tours['myTour'].start()"
                v-close-popup
              />
              <q-btn flat :label="$t('skip_tour')" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-page>
    <!-- </q-page-container> -->

    <q-footer bordered class="mobile-veiw bg-white">
      <q-toolbar>
        <q-tabs
          style="min-width: 100%"
          v-model="tab"
          dense
          class="bg-wite text-grey-10"
          align="justify"
          narrow-indicator
          @click="showLayerSelection = true"
        >
          <q-tab
            class="layer-selection"
            name="mails"
            icon="mdi-map-plus"
            label="Layers"
          />
          <q-tab
            class="toggle-statistics"
            name="alarms"
            icon="mdi-poll"
            label="Analysis"
          />
        </q-tabs>
        <!-- <div class="row" style="min-width: 100%">
          <div class="col">
            <q-item>
              <q-item-section class="items-center">
                <q-item-label>
                  <q-btn
                    id="show-stats-btn"
                    @click="showLayerSelection = !showLayerSelection"
                    flat
                    round
                    color="grey-10"
                    icon="mdi-layers"
                    size="sm"
                  />
                </q-item-label>
                <q-item-label class="text-grey-10" style="font-size: 0.75em"
                  >LAYERS</q-item-label
                >
              </q-item-section>
            </q-item>
          </div>
          <div class="col">
            <q-item>
              <q-item-section class="items-center">
                <q-item-label>
                  <q-btn
                    id="show-stats-btn"
                    @click="showAnalysismobile = !showAnalysismobile"
                    flat
                    round
                    color="grey-10"
                    icon="mdi-poll"
                    size="sm"
                  />
                </q-item-label>
                <q-item-label class="text-grey-10" style="font-size: 0.75em"
                  >ANALYSIS</q-item-label
                >
              </q-item-section>
            </q-item>
          </div>
        </div> -->
      </q-toolbar>
    </q-footer>
    <tour />
  <!-- </q-layout> -->
</template>

<script>
import { ref, onBeforeMount, onMounted } from "vue";
import { useQuasar } from "quasar";
export default {
  name: "my-tour",
  components: {
    mappanel: require("components/Map/Map.vue").default,
    selectionsTab: require("components/composables/indicatorSelection.vue")
      .default,
    analysisPanel: require("../components/composables/analysisPanel.vue")
      .default,
    tour: require("components/tour.vue"),
  },
  setup() {
    // const $q = useQuasar();

    // function alert() {
    //   $q.dialog({
    //     title: "Confirm",
    //     message: "Would you like to take a tour?",
    //     cancel: true,
    //     persistent: true,
    //   })
    //     .onOk(() => {
    //       // console.log('OK')
    //       const el = document.getElementById("tour-btn");
    //       el.click();
    //     })
    //     .onOk(() => {
    //       // console.log('>>>> second OK catcher')
    //     })
    //     .onCancel(() => {
    //       // console.log('Cancel')
    //     })
    //     .onDismiss(() => {
    //       // console.log('I am triggered on both OK and Cancel')
    //     });
    // }

    const matchMediaDesktop = ref(false),
      matchMediaMobile = ref(false),
      confirm = ref(false);

    onBeforeMount(() => {
      matchMediaMobile.value = window.matchMedia("(max-width: 768px)").matches;
      matchMediaDesktop.value = window.matchMedia("(min-width: 768px)").matches;
      console.log(matchMediaDesktop.value, matchMediaMobile.value);
    });

    onMounted(() => {
      confirm.value = true;
    });
    return {
      drawer: ref(false),
      miniState: ref(true),
      seamless: ref(false),
      showAnalysismobile: ref(false),
      showLayerSelection: ref(false),
      matchMediaDesktop,
      matchMediaMobile,
      tab: ref("mails"),
      confirm,
    };
  },
};
</script>

<style lang="scss">
#pulse {
  animation-name: beat;
  animation-duration: 1.5s;
  animation-iteration-count: 5;
}

@keyframes beat {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.q-dialog_top25 .q-dialog_inner-top {
  top: 600px;
}

.analysis-panel-mobile {
  position: absolute;
  background-color: rgba(50, 121, 44, 0);
  width: 100%;
  right: 0%;
  bottom: 0%;
  z-index: 5000;
  max-height: 50vh;
  border-radius: 15px 15px 0 0;
}

@media screen and (max-width: 768px) {
  .web-view {
    display: none;
  }
}

@media screen and (min-width: 768px) {
  .analysis-panel-mobile {
    display: none;
  }
}
</style>
