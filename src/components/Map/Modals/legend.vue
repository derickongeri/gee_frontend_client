<template>
  <div ref="draggableContainer" id="draggable-container" class="legend">
    <!-- <div class="col" id="draggable-header" @touchstart="dragMouseDown" @mousedown="dragMouseDown">
      <p class="my-font q-pa-sm q-ma-none" style="font-weight: bold">Burnt Area</p>
    </div> -->
    <div class="col q-pa-sm q-ma-none q-gutter-none" style="max-width:fit">
      <div class=" q-gutter-xs q-pa-xs" v-for="(landcover, key) in legendData" :key="key" style="min-width:12vw">
        <!-- <div
          class="legend-item"
          :style="`border-color:` + landcover.color"
          style="width: 50px"
        ></div>
        <div class="text-center" style="font-size: 0.65rem">
          {{ landcover.landcover }}
        </div> -->
        <i :style="`background:` + landcover.color" class="q-px-sm q-my-xs"
          style="font-size:0.75em; border: 0px outset black; border-radius: 12px;"></i>
        <span class="my-font q-px-sm q-my-sm" style="font-size:0.75rem; font-weight: normal;">{{ landcover.landcover }}</span>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, $refs, onMounted, computed, watch } from "vue";
import createLegend from "./setLegend.js"

export default defineComponent({
  setup() {
    const { setLegendColors } = createLegend()
    const legendData = ref([])
    const positions = ref({
      clientX: undefined,
      clientY: undefined,
      movementX: 0,
      movementY: 0,
    })
    const draggableContainer = ref(null)

    const setLegendData = function () {
      legendData.value = setLegendColors("burnedArea");
    };

    onMounted(() => {
      setLegendData();
    });

    const dragMouseDown = function (event) {
      event.preventDefault();
      // get the mouse cursor position at startup:
      positions.value.clientX = event.clientX;
      positions.value.clientY = event.clientY;
      document.onpointermove = elementDrag;
      document.onpointerup = closeDragElement;
    }

    function elementDrag(event) {
      event.preventDefault();
      positions.value.movementX = positions.value.clientX - event.clientX;
      positions.value.movementY = positions.value.clientY - event.clientY;
      positions.value.clientX = event.clientX;
      positions.value.clientY = event.clientY;
      // set the element's new position:
      draggableContainer.value.style.top =
        draggableContainer.value.offsetTop -
        positions.value.movementY +
        "px";
      draggableContainer.value.style.left =
        draggableContainer.value.offsetLeft -
        positions.value.movementX +
        "px";
    }
    function closeDragElement() {
      document.onpointerup = null;
      document.onpointermove = null;
    }
    return {
      legendData,
      draggableContainer,
      dragMouseDown
    }
  }
});
</script>

<style lang="scss">
#draggable-container {
  background: #fffffffd;
  border-radius: 10px;
  //position: absolute;
  // position: absolute;
  // bottom: 1%;
  // left: 1%;
  //max-width: fit-content;
  z-index: 3000;
  min-width: 10vw;
  // max-width: 250px;
  max-height: fit-content;
  // right: 2%;
  // bottom: 15%;
}
</style>
