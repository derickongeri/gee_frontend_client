<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal class="bg-grey-10">
      <q-toolbar>
        <q-btn flat @click="drawerLeft = !drawerLeft" round dense icon="menu" />
        <q-toolbar-title>Header</q-toolbar-title>
        <q-btn
          flat
          @click="drawerRight = !drawerRight"
          round
          dense
          icon="menu"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="">
        <mappanel />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
export default {
  name: "my-tour",
  components: {
    mappanel: require("components/Map/Map.vue").default,
    analysisTab: require("components/Analysis/analysis.vue").default,
  },
  setup() {
    return {
      drawer: ref(false),
      miniState: ref(true),
    };
  },
};
</script>

<style></style>
