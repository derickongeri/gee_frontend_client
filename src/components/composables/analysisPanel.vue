<template>
  <div>
    <div
      v-if="matchMediaDesktop"
      class="q-ma-none web-veiw"
      style="position: relative; min-height: 100%; width: 40%"
    >
      <q-scroll-area
        class="q-ma-none q-pa-none"
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
        style="position: relative; height: 88vh; width: 35vw"
      >
        <q-card flat bordered class="q-mb-sm q-mx-sm">
          <q-card-section class="bg-grey-4 text-grey-9">
            <div class="text-h6">Some Title Here</div>
            <div class="text-subtitle2">some caption here</div>
          </q-card-section>

          <q-separator />
          <q-card-section>
            <div class="text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              mollitia, molestiae quas vel sint commodi repudiandae consequuntur
            </div>
          </q-card-section>
        </q-card>

        <q-card flat bordered class="q-ma-sm">
          <q-card-section>
            <Analysis />
          </q-card-section>
        </q-card>
      </q-scroll-area>
    </div>

    <div v-else class="bg-white mobile-veiw">
      <q-scroll-area
        class="q-ma-none q-pa-none"
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
        style="position: relative; height: 50vh; width: 100vw"
      >
        <!-- <q-card flat bordered class="q-mb-sm q-mx-sm">
          <q-card-section class="bg-grey-4 text-grey-9">
            <div class="text-h6">Some Title Here</div>
            <div class="text-subtitle2">some caption here</div>
          </q-card-section>

          <q-separator />
          <q-card-section>
            <div class="text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              mollitia, molestiae quas vel sint commodi repudiandae consequuntur
            </div>
          </q-card-section>
        </q-card> -->

        <q-card flat bordered class="q-ma-sm">
          <q-card-section>
            <Analysis />
          </q-card-section>
        </q-card>
      </q-scroll-area>
    </div>
  </div>
</template>

<script>
import {
  computed,
  onBeforeMount,
  onMounted,
  onUpdated,
  provide,
  reactive,
  ref,
  watch,
} from "vue";

export default {
  components: {
    Analysis: require("../Analysis/Modals/sdg/sdg.vue").default,
  },

  setup() {
    const showAnalysismobile = ref(false);
    const matchMediaMobile = ref(false);
    const matchMediaDesktop = ref(true);

    const hideAnalysismobile = function (val) {
      showAnalysismobile.value = !showAnalysismobile.value;
    };

    onBeforeMount(() => {
      matchMediaMobile.value = window.matchMedia("(max-width: 768px)").matches;
      matchMediaDesktop.value = window.matchMedia("(min-width: 768px)").matches;
      console.log(matchMediaDesktop.value, matchMediaMobile.value);
    });

    return {
      thumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "#027be3",
        width: "4px",
        opacity: 0.75,
      },

      barStyle: {
        right: "2px",
        borderRadius: "9px",
        backgroundColor: "#027be300",
        width: "9px",
        opacity: 0.2,
      },
      showAnalysismobile,
      hideAnalysismobile,
      matchMediaMobile,
      matchMediaDesktop,
    };
  },
};
</script>

<style lang="scss">
.mobile-veiw {
  position: relative;
  top: 20%;
  min-height: 90%;
  width: 100%;
}

@media screen and (max-width: 768px) {
  .web-veiw {
    display: none;
  }
}

@media screen and (min-width: 768px) {
  .mobile-veiw {
    display: none;
  }
}
</style>
