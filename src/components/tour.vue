<template>
  <div class="site-tour">
    <v-tour
      name="myTour"
      :steps="steps"
      :options="{ highlight: true }"
    ></v-tour>
  </div>
</template>

<script>
import "vue3-tour/dist/vue3-tour.css";

export default {
  name: "mytour",

  data() {
    return {
      // mapid drawingtools selectarea maplegend mapcontorls
      steps: [
        // {
        //   target: "#mapid",
        //   content: `Use the layers control to change the opacity and change the background/basemap layer, and download the map.`,
        // },
        {
          target: "#drawingtools",
          content: `click on the <strong>draw polygon tool</strong> to toggle drawing tools. The drawing tools can be used to draw custom polygons for analysis`,
        },
        {
          target: "#selectarea",
          content: `Use this <strong>select National park dropdonw</strong> to select National parks or National reserve boundary.`,
        },
        {
          target: "#maplegend",
          content: `This section contains the map legend. You can also set the layer opacity using the opacity toool on the top-right conner of the legend <img src="https://www-it.fmi.uni-sofia.bg/courses/maten/module1/image1.gif" style="width: 250px"/>`,
        },
        {
          target: "#mapcontrols",
          content: `Click on the listed chart items to visualize the ratio between specific items of interest eg ratio of sugarcan and tea <img src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg" style="width: 250px"/>`,
        },
      ],
    };
  },

  mounted: function () {
    //this.$tours["myTour"].start();
  },
};
</script>

<style>
.stie-tour {
  position: absolute;
  z-index: 40000;
}
.v-tour__target--highlighted {
  box-shadow: 0 0 0 99999px rgba(0, 0, 0, 0.5);
  z-index: 4200;
}
</style>
