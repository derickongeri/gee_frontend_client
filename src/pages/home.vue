<template>
  <q-page padding class="row items-center page-tint" id="hero">
    <div class="absolute-center jumbotron" style="min-height: 50%">
      <div class="column justify-around" style="min-height: 70%">
        <div class="row justify-center">
          <div
            class="head-text my-font text-center text-white q-pa-md q-pt-xl"
            style="font-weight: 700; background: none"
          >
            {{$t("tagline")}}
          </div>
        </div>
        <div class="text-center text-white" style="font-weight:700; font-size:16px"> <p class="self-center q-pa-md">Launch Application</p></div>
        <div class="row justify-center">

          <div class="text-center q-pa-md q-gutter-md" style="min-width: 400px">
            <q-btn size="lg"  color="primary" :label="$t('forest')" to="/dashboard"/>
            <q-btn size="lg"  color="primary" :label="$t('agro')" />
            <q-btn size="lg"  color="primary" :label="$t('water')" />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";

export default {
  components: {
    sitenav: require("components/Website/navigation.vue").default,
  },
  setup() {
    return {
      slide: ref(3),
      tab: ref("mails"),
    };
  },
};
</script>

<style>
/* *{
  box-sizing: border-box;
  outline: 3px solid limegreen !important;
} */

.page-tint{
  background-color: rgba(107, 107, 107, 0.89);
  background-blend-mode: multiply;
}

#hero {
  background-image: url("~/src/assets/hero2.jpg");
  background-size: 100%;
  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  /* animation-name: beat;
  animation-duration: 1.5s;
  animation-iteration-count: 5; */
}

/* #pulse {
  animation-name: beat;
  animation-duration: 1.5s;
  animation-iteration-count: 5;
} */

@keyframes beat {
  from {
    background-size: cover;
  }
  to {
    background-size: 150%;
  }
}

.jumbotron {
  height: 100%;
  background-size: cover;
  /* background-color: rgb(51, 51, 51, 0.1);
  box-shadow: inset 0 0 0 2000px rgba(0, 0, 0, 0.1); */
}

.content-card {
  height: 80vh;
  background-size: cover;
  background: #ffffff;
  box-shadow: 0 0 3rem 0 rgb(0 0 0 / 10%);
}

@media screen and (max-width: 768px) {
  .head-text {
    font-size: 28px;
  }
}

@media screen and (min-width: 768px) {
  .head-text {
    font-size: 56px;
  }
}
</style>
