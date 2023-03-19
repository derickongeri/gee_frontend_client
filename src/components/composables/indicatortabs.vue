<template>
  <div class="q-pa-none" style="border-radius: 0 0 10px 10px">
    <q-tabs
      class="bg-white"
      active-bg-color="grey-4"
      indicator-color="transparent"
      v-model="tab"
      dense
      no-caps
      inline-label
      align="left"
      :breakpoint="0"
    >
      <q-tab class="text-grey-9" name="statistics" icon="mdi-layers" label="Legend" />
      <q-tab class="text-grey-9" name="analysis" icon="mdi-cog" label="Analysis" />
    </q-tabs>


    <q-tab-panels v-model="tab" style="border-radius: 0 0 15px 15px">
      <q-tab-panel name="statistics">
        <Legend />
      </q-tab-panel>
      <q-tab-panel name="analysis">
        <Selection />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  components: {
   // Stats: require("../Analysis/analysis.vue").default,
    Selection: require("./indicatorSelection.vue").default,
    Legend: require("../Map/Modals/legend.vue").default,
  },
  setup() {
    return {
      tab: ref("statistics"),
    };
  },
};
</script>
