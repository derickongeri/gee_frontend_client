<template>
  <h6
    class="title bg-white q-px-md q-py-none"
    style="
      text-decoration: underline;
      display: none;
      top: 2px;
      width: 98.5%;
      position: fixed;
      z-index: 10000;
    "
    leaflet-browser-print-content
  >
    {{ selectedArea }} {{ $t("burnedArea") }}
    {{ fireDates[0].to.replace(/-/g, "/") }} -
    {{ fireDates[1].from.replace(/-/g, "/") }}
  </h6>
  <div
    class="north-arrow"
    style="
      width: fit-content;
      height: fit-content;
      display: none;
      position: absolute;
      z-index: 100000;
      top: 10%;
      right: 250px;
    "
    leaflet-browser-print-content
  >
    <q-avatar square size="50px" class="q-ma-none">
      <img
        src="~/src/assets/northarrow2.png"
        style="position: relative; width: 100%; height: 100%; left: -1%"
      />
    </q-avatar>
  </div>
  <div
    class="target-div"
    style="
      width: fit-content;
      height: fit-content;
      display: none;
      position: absolute;
      z-index: 100000;
      bottom: 4%;
      left: 3%;
    "
    leaflet-browser-print-content
  ></div>
  <div
    class="my-font sub-content q-mt-none q-ml-none q-pa-none"
    style="display: none"
    leaflet-browser-print-content
  >
    <div
      class="column justify-between q-ma-none q-px-xs"
      style="position: relative; height: 100%"
    >
      <h6 class="q-mt-none"></h6>
      <div class="q-pa-xs gutter-md">
        <h6 class="q-my-none" style="font-size: 1em; font-weight: bold">
          {{$t('note')}}
        </h6>
        <p class="text-justify" style="font-size: 0.75em; max-width: 200px">
          {{$t('burnedAreaNotes')}}
        </p>
        <div class="row" style="font-size: 0.75em; min-width: 200px">
          <div class="col-6"><b>{{$t('dataSource')}}</b></div>
          <div class="col-6"><b>Sentinel 2</b></div>
        </div>
        <div class="row" style="font-size: 0.75em; min-width: 200px">
          <div class="col-6"><b>{{$t('pre_fire_date')}}</b></div>
          <div class="col-6">
            <div class="row">
              <span>From:</span><q-space /><span>{{ fireDates[0].from }}</span>
            </div>
            <div class="row">
              <span>To:</span><q-space /><span>{{ fireDates[0].to }}</span>
            </div>
          </div>
        </div>
        <div
          class="row text-justify"
          style="font-size: 0.75em; min-width: 200px"
        >
          <div class="col-6"><b>{{$t('post_fire_date')}}</b></div>
          <div class="col-6">
            <div class="row">
              <span>From:</span><q-space /><span>{{ fireDates[1].from }}</span>
            </div>
            <div class="row">
              <span>To:</span><q-space /><span>{{ fireDates[1].to }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="row q-ma-none">
        <div class="q-pa-xs" style="border: 1px solid grey; min-width: 200px">
          <h6 class="q-my-none" style="font-size: 1em; font-weight: bold">
            {{$t('severity')}}
          </h6>
          <Maplegend />
        </div>
      </div>

      <div class="row q-mt-xs q-mb-xs">
        <div class="q-my-none q-pa-xs">
          <h6 class="q-my-none" style="font-size: 1em; font-weight: bold">
            {{$t('disclaimer')}}
          </h6>
          <p
            class="text-justify q-my-none"
            style="font-size: 0.75em; max-width: 200px"
          >
            {{$t('the_disclaimer')}}
          </p>
        </div>
      </div>

      <div
        class="row items-center q-mt-xs q-mb-xs"
        style="max-width: 100px; max-height: 100px"
      >
        <q-avatar square size="50px" class="q-ma-none">
          <img
            src="~/src/assets/africa.png"
            style="position: relative; width: 100%; height: 100%; left: -1%"
          />
        </q-avatar>
        <div
          class="col text-h6"
          style="color: #3c4e3d; font-size: 1.2rem; font-weight: bold"
        >
          GREEN<span style="color: #000000; font-weight: normal">EYE</span>
        </div>
        <span
          class="my-font"
          style="min-width: 200px; font-weight: light; font-size: 0.75em"
          >{{$t('createdby')}}
          <a href="https://derickongeri.github.io">Derick Ongeri</a></span
        >
      </div>
    </div>
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
import { useVectorStore } from "../../../../stores/vector_store/index.js";

export default {
  components: {
    Maplegend: require("../../Modals/legend.vue").default,
  },
  setup() {
    const store = useVectorStore();

    return{
      selectedArea: ref(store.getselectedRegion),
      fireDates: ref(store.getDatesSelected),
    }
  },
}
</script>
