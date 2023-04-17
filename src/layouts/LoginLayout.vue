<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-white q-ma-none text-grey-10">
      <q-toolbar class="q-ma-none">
        <q-avatar square size="50px" class="q-ml-xl">
          <img
            src="~/src/assets/logo4.png"
            style="position: relative; width: 80%; height: 80%; left: -1%"
          />
        </q-avatar>
        <q-separator vertical inset />
        <!-- <div square class="q-ma-none" style="max-width: 100px">
          <img
            src="~/src/assets/logo4.png"
            style="position: relative; width: 100%; height: 100%; left: -1%"
          />
        </div> -->
        <q-toolbar-title
          class="text-h6 my-font q-pa-none q-ma-none item-center"
          style="color: #3c4e3d; font-size: 1.2rem; font-weight: bold"
        >
          <div
            class="row items-end q-pl-xs q-ma-none q-gutter-none"
            style="max-height: 50px"
          >
            <img src="~/src/assets/logoname.svg" />
          </div>
        </q-toolbar-title>
        <!-- <q-btn
          id="tour-btn"
          flat
          round
          dense
          icon="mdi-human-male-board"
          @click="this.$tours['myTour'].start()"
        />
        <q-btn flat round dense icon="mdi-information-outline" /> -->
      </q-toolbar>
    </q-header>
    <q-page-container style="padding-bottom: 0px" class="my-font">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "LoginLayout",

  setup() {
    return {
    };
  },
});
</script>
