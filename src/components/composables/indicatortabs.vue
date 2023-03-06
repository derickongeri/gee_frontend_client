<template>
  <div class="q-pt-sm">
      <q-card class="q-pa-none">
        <q-tabs v-model="tab" dense no-caps inline-label align="left" :breakpoint="0">
          <q-tab name="analysis" icon="mdi-cog" label="Analysis" />
          <q-tab name="statistics" label="Statistics" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" >
          <q-tab-panel name="analysis">
            <Selection />
          </q-tab-panel>

          <q-tab-panel name="statistics">
            <Stats />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  components: {
    Stats: require("../Analysis/analysis.vue").default,
    Selection: require("./indicatorSelection.vue").default,
  },
  setup() {
    return {
      tab: ref("statistics"),
    };
  },
};
</script>
