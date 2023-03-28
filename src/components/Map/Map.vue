<template>
  <div
    class="q-pa-none bg-grey-2 box"
    style="position: relative; min-height: 100%; min-width: 100%"
  >
    <div class="col bg-black q-mx-none map-content" id="mapid" style="">
      <div
        class="row items-center area-selection"
        style=""
        @mouseover="map.dragging.disable(), map.smoothWheelZoom.disable()"
        @mouseout="map.dragging.enable(), map.smoothWheelZoom.enable()"
        @pointerover="map.dragging.disable(), map.smoothWheelZoom.disable()"
        @pointerout="map.dragging.enable(), map.smoothWheelZoom.enable()"
      >
        <div class="" style="z-index: 3000; background-color: #00000000">
          <div class="q-pa-none q-px-md">
            <q-btn
              class="bg-white"
              size="md"
              round
              flat
              color="grey-9"
              icon="mdi-selection-drag"
              @click="toggleDrawingTools"
              ><q-tooltip class="bg-black">drawing tools</q-tooltip>
            </q-btn>
          </div>
        </div>
        <q-separator vertical inset />
        <div class="col" style="z-index: 3000; background-color: #00000000">
          <areaSelection
            @mouseover="map.dragging.disable()"
            @mouseout="map.dragging.enable()"
            @pointerover="map.dragging.disable()"
            @pointerout="map.dragging.enable()"
          />
        </div>
      </div>
      <div
        class="q-pa-none"
        style="
          position: absolute;
          z-index: 3000;
          bottom: 2%;
          left: 1%;
          max-width: 40%;
          max-height: 98%;
          border-radius: 10px;
          background-color: #ffffff;
        "
        @mouseover="map.dragging.disable(), map.smoothWheelZoom.disable()"
        @mouseout="map.dragging.enable(), map.smoothWheelZoom.enable()"
        @pointerover="map.dragging.disable(), map.smoothWheelZoom.disable()"
        @pointerout="map.dragging.enable(), map.smoothWheelZoom.enable()"
      >
        <div class="col q-pa-sm" style="border-radius: 15px">
          <div class="row">
            <span class="my-font q-px-xs q-ma-none" style="font-weight: bold"
              >Burnt Area</span
            >
            <q-space />
            <q-icon
              clickable
              name="mdi-circle-opacity"
              size="16px"
              class="cursor-pointer"
              @click="opacityslider = !opacityslider"
            />
          </div>
          <div class="row" v-show="opacityslider">
            <div class="row items-center bg-grey-2" style="min-width: 100%">
              <span class="my-font q-px-xs">Opacity</span>
              <q-slider
                dense
                :min="1"
                :max="10"
                :step="1"
                v-model="opacityValue"
                color="lime-9"
                track-size="2px"
                thumb-size="10px"
                class="col q-pa-sm"
                @mouseenter="handle_opacity"
              />
            </div>
          </div>
        </div>
        <Maplegend
          @mouseover="map.dragging.disable()"
          @mouseout="map.dragging.enable()"
          @pointerover="map.dragging.disable()"
          @pointerout="map.dragging.enable()"
        />
      </div>

      <div class="row zoom-controls q-gutter-xs" style="width: fit-content">
        <div class="row q-gutter-xs">
          <div class="col-2 q-gutter-sm q-py-sm" id="#v-step-1">
            <div class="row">
              <div
                class="bg-white q-pa-none q-ma-none"
                style="border-radius: 20px"
              >
                <div>
                  <q-btn
                    class="bg-white"
                    size="sm"
                    round
                    flat
                    color="lime-9"
                    icon="add"
                    @click="zoom_in"
                  />
                </div>

                <q-separator />
                <div>
                  <q-btn
                    class="bg-white"
                    size="sm"
                    round
                    flat
                    color="lime-9"
                    icon="mdi-refresh"
                    @click="resetZoomLevel"
                  />
                </div>
                <q-separator />

                <div>
                  <q-btn
                    class="bg-white"
                    size="sm"
                    round
                    flat
                    color="lime-9"
                    icon="remove"
                    @click="zoom_out"
                  />
                </div>
              </div>
            </div>
            <!-- <div class="row">
              <q-btn
                class="bg-white"
                size="sm"
                round
                flat
                color="lime-9"
                icon="mdi-select-drag"
                @click="toggleDrawingTools"
              />
            </div>
            <div class="row">
              <q-btn
                class="bg-white"
                size="sm"
                round
                flat
                color="lime-9"
                icon="mdi-chart-bar"
                @click="openCloseStats"
              />
            </div> -->
          </div>
        </div>
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
import { useVectorStore } from "../../stores/vector_store/index.js";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
// import "leaflet-draw";
import "leaflet-draw/dist/leaflet.draw-src";
import "leaflet-draw/dist/leaflet.draw-src.css";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import "./Modals/mask";
import "./Modals/smoothWheelZoom";
import "./WMTS";
import { Loading, QSpinnerOval, QSpinnerFacebook, QSpinnerGears } from "quasar";
import baselayers from "./Modals/baselayers";

import setSelectedVect from "./Modals/fetchVectors";
import setSelectedRaster from "./Modals/fetchRaster";

export default defineComponent({
  components: {
    selectionTab: require("components/Layerselections.vue").default,
    analysisPanel: require("../composables/analysisPanel.vue").default,
    areaSelection: require("../Map/Modals/selectArea.vue").default,
    Maplegend: require("./Modals/legend.vue").default,
    socials: require("components/socials/shareNetwork.vue").default,
  },

  setup() {
    const store = useVectorStore();
    const { selectedVect } = setSelectedVect();
    const { getRasterLayer } = setSelectedRaster();

    const rightDrawerOpen = ref(false);
    const map = ref(null),
      statisticsPanel = ref(false),
      center = ref([1, 10]), // set initial map center
      baseMaps = ref([]),
      current_top_base_layer = ref(null), //holds the top tile layer on the map
      showBaseMapList = ref(false), //show or hide base layers
      base_map_ctrl_cliked = ref(false),
      opacityValue = ref(10),
      currentRasterLayer = ref(null),
      currentBaseLayer = ref(null),
      currentVectLayer = ref(null),
      //editableLayer = ref(null),
      customGeometry = ref(null),
      currentFeatureLayer = ref(null),
      rasterYear = ref(null),
      opacityslider = ref(false);

    let drawingTools = ref(false);
    let layerControl = ref(null);

    let setLabels = ref(false);
    let mapLabels = ref(null);
    let selectedPopupFeature = ref(null);

    const setLeafletMap = async function () {
      const { osmTiles, darkMap, satellite, USGS_Imagery } = baselayers;

      console.log(osmTiles);

      baseMaps.value = {
        OSM: osmTiles,
        satellite: satellite,
        darkMap: darkMap,
        imagery: USGS_Imagery,
      };

      map.value = L.map("mapid", {
        zoomControl: false,
        layersControl: true,
        center: center.value,
        zoom: 3.5,
        zoomAnimation: true,
        fadeAnimation: true,
        scrollWheelZoom: false,
        smoothWheelZoom: true,
        smoothSenesitivity: 0.5,
        minZoom: 3,
        maxZoom: 17,
        layers: [satellite],
        attributionControl: false,
      });

      map.value.scrollWheelZoom = true;

      L.control.layers(baseMaps.value).addTo(map.value);

      current_top_base_layer.value = "satellite";

      // L.control
      //   .attribution({
      //     position: "bottomright",
      //   })
      //   .addTo(map.value);
      L.control.scale({ position: "bottomright" }).addTo(map.value);
      // ///////////////////hide layers control
      let layerControl = document.getElementsByClassName(
        "leaflet-control-layers"
      );
      layerControl[0].style.visibility = "hidden";
      // statisticsPanel.value = true;
      setUpGeoman();
    };

    const zoom_in = function () {
      map.value.setZoom(map.value.getZoom() + 1);
    };

    const switchLayer = (selectedLayer) => {
      const layer1 = currentRasterLayer.value.getLayers()[0];
      const layer2 = currentRasterLayer.value.getLayers()[1];
      if (selectedLayer === "layer1" && !map.value.hasLayer(layer1)) {
        map.value.removeLayer(layer2);
        map.value.addLayer(layer1);
      } else if (selectedLayer === "layer2" && !map.value.hasLayer(layer2)) {
        map.value.removeLayer(layer1);
        map.value.addLayer(layer2);
      }
    };

    const zoom_out = function () {
      map.value.setZoom(map.value.getZoom() - 1);
    };

    const showListofBaseMaps = function () {
      return (showBaseMapList.value = !showBaseMapList.value);
    };

    const handle_base_layers = function () {
      setTimeout(() => {
        if (base_map_ctrl_cliked.value === false) showBaseMapList.value = false;
      }, 3000);
    };

    //get the base map object of leaflet according to the selection clicked
    const change_base_map = function (basemap) {
      const selected_base_map = baseMaps.value[basemap];
      map.value.addLayer(selected_base_map);
      selected_base_map.bringToFront();
      currentBaseLayer.value.bringToFront();
      currentRasterLayer.value.bringToFront();
      currentVectLayer.value.bringToFront();
    };

    const setUpGeoman = function () {
      let editableLayer = new L.FeatureGroup();
      //map.value.addLayer(editableLayer).bringToFront();

      // Initialise the draw control and pass it the FeatureGroup of editable layers
      map.value.addControl(
        new L.Control.Draw({
          position: "topleft",
          draw: {
            polygon: {
              allowIntersection: false, // Restricts shapes to simple polygons
              drawError: {
                color: "#e1e100", // Color the shape will turn when intersects
                message:
                  "<strong>Polygon draw does not allow intersections!<strong> (allowIntersection: false)", // Message that will show when intersect
              },
              shapeOptions: {
                fillOpacity: 0,
                fillColor: "#424242",
                weight: 1.5,
                color: "#484c4d",
              },
            },
            rectangle: {
              shapeOptions: {
                fillOpacity: 0,
                fillColor: "#424242",
                weight: 1.5,
                color: "#484c4d",
              },
            },
            circle: false,
            marker: false,
            polyline: false,
            circlemarker: false,
          },
          edit: {
            featureGroup: editableLayer,
            //remove: true,
          },
        })
      );

      map.value.on(L.Draw.Event.CREATED, function (e) {
        var type = e.layerType,
          layer = e.layer;
        if (type === "polygon") {
          layer.bindPopup("A popup!");
        }
        editableLayer.addLayer(layer);
        map.value.addLayer(editableLayer);
        drawCustomPolygon(layer);
        setRasterLayer();
      });

      map.value.on("draw:deleted", function (e) {
        map.value.removeLayer(currentBaseLayer.value);
        map.value.removeLayer(currentRasterLayer.value);
        map.value.removeLayer(customGeometry.value);
        customGeometry.value = null;
        // store.setCustomGeometryData("");
        setCurrentVector();
        //setRasterLayer();
      });
    };

    const toggleDrawingTools = function () {
      const box = document.getElementsByClassName(
        "leaflet-top leaflet-left"
      )[0];
      if (box.style.display === "none") {
        box.style.display = "block";
      } else {
        box.style.display = "none";
      }
    };

    const drawCustomPolygon = function (layer) {
      if (currentVectLayer.value) {
        map.value.removeLayer(currentVectLayer.value);
      }
      if (customGeometry.value) map.value.removeLayer(customGeometry.value);
      if (customGeometry.value) customGeometry.value = null;
      if (currentBaseLayer.value) map.value.removeLayer(currentBaseLayer.value);
      if (currentRasterLayer.value)
        map.value.removeLayer(currentRasterLayer.value);
      const geojson = JSON.stringify(layer.toGeoJSON().geometry);
      console.log(geojson, "custom area");
      store.setCustomGeometryData(geojson);
      customGeometry.value = layer;
      map.value.fitBounds(customGeometry.value.getBounds(), {
        setZoom: 2,
      });
    };

    const setCurrentVector = async function () {
      try {
        if (currentVectLayer.value) {
          map.value.removeLayer(currentVectLayer.value);
          currentVectLayer.value = null;
        }
        if (currentBaseLayer.value) {
          map.value.removeLayer(currentBaseLayer.value);
        }
        if (currentRasterLayer.value) {
          map.value.removeLayer(currentRasterLayer.value);
        }

        let vectLayer = await selectedVect();

        store.setCustomGeometryData(
          JSON.stringify(vectLayer.features[0].geometry)
        );

        currentVectLayer.value = new L.geoJSON([vectLayer], {
          style: {
            fillOpacity: 0,
            fillColor: "#424242",
            weight: 2,
            color: "#484c4d",
          },
          onEachFeature: function (feature, layer) {
            feature = layer.bindPopup(
              "<br><strong>" +
                feature.properties.NAME_1 +
                "</strong><br><br> <button id='pop-up-selector' class='pop-up-btn'>Analyze</button>"
            );
          },
        });

        currentVectLayer.value.addTo(map.value);
        map.value.fitBounds(currentVectLayer.value.getBounds(), {
          // paddingBottomRight: [0, 0],
          setZoom: 2,
        });
      } catch (error) {
        console.log(error);
      }
    };

    const resetZoomLevel = function () {
      if (customGeometry.value) {
        map.value.fitBounds(customGeometry.value.getBounds(), {
          //
          setZoom: 2,
        });
      } else {
        map.value.fitBounds(currentVectLayer.value.getBounds(), {
          // paddingBottomRight: [600, 0],
          setZoom: 2,
        });
      }
    };

    const handle_opacity = function () {
      if (currentRasterLayer.value)
        currentRasterLayer.value.options.opacity = opacityValue.value / 10;
      if (currentRasterLayer.value)
        map.value.removeLayer(currentRasterLayer.value);
      currentRasterLayer.value.addTo(map.value); //add layer to map
      //currentRasterLayer.value.bringToFront();
      currentVectLayer.value.bringToFront();
    };

    const setRasterLayer = async function () {
      try {
        Loading.show({
          spinner: QSpinnerGears,
          spinnerSize: "xl",
          message: "Fetching map data...",
        });

        if (currentBaseLayer.value) {
          map.value.removeLayer(currentBaseLayer.value);
        }
        if (currentRasterLayer.value) {
          map.value.removeLayer(currentRasterLayer.value);
        }

        //let rasterLayers = [];

        let rasterLayers = await getRasterLayer(store.customGeojson);

        currentBaseLayer.value = rasterLayers[0];
        currentRasterLayer.value = rasterLayers[1];

        currentRasterLayer.value.addTo(map.value);

        currentBaseLayer.value.addTo(map.value).on("load", () => {
          Loading.hide();
        });
        //Loading.hide();

        // getRasterStats();
      } catch (error) {
        Loading.hide();
        console.log(error);
      }
    };

    const addLabels = function (val) {
      if (val) {
        mapLabels.value = L.tileLayer(
          "https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png",
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: "abcd",
            //maxZoom: 20,
          }
        );
        mapLabels.value.addTo(map.value).bringToFront();
        //console.log("layer added");
      } else {
        map.value.removeLayer(mapLabels.value);
        //console.log("layer removed");
      }
    };

    watch(setLabels, () => {
      //console.log(setLabels.value);
      addLabels(setLabels.value);
    });

    const setPopuFeature = computed(() => {
      return selectedPopupFeature.value;
    });

    watch(setPopuFeature, () => {
      let el = document.getElementById("pop-up-selector");

      el.addEventListener("click", () => {
        store.slectedCountry
          ? store.setSubRegionSelected(selectedPopupFeature.value)
          : store.setCountrySelected(selectedPopupFeature.value);
        map.value.closePopup();
      });
    });

    const selecteVector = computed(() => {
      return store.getselectedRegion;
    });

    watch(selecteVector, () => {
      setCurrentVector().then(() => {
        //setRasterLayer();
      });
    });

    const selecteDates = computed(() => {
      return store.getDatesSelected;
    });

    watch(selecteDates, () => {
      setCurrentVector();
      setRasterLayer();
    });

    watch(customGeometry.value, () => {
      () => {
        map.value.removeLayer(currentVectLayer.value);
        setRasterLayer();
      };
    });

    const setRasterYear = computed(() => {
      return store.getYearSelected;
    });

    watch(setRasterYear, () => {
      console.log(`year changed to ${store.getYearSelected}`);
      setRasterLayer();
    });

    onMounted(() => {
      setLeafletMap().then(() => {
        toggleDrawingTools()
      });
      setCurrentVector().then(() => {
        setRasterLayer();
      });
    });

    const openCloseStats = function () {
      statisticsPanel.value = !statisticsPanel.value;
    };

    return {
      map,
      statisticsPanel,
      rightDrawerOpen,
      openCloseStats,
      showBaseMapList,
      zoom_in,
      zoom_out,
      showListofBaseMaps,
      handle_base_layers,
      change_base_map,
      opacityValue,
      baseMaps,
      drawCustomPolygon,
      toggleDrawingTools,
      value: ref(true),
      resetZoomLevel,
      handle_opacity,
      setLabels,
      layerControl,
      opacityslider,
    };
  },
});
</script>

<style lang="scss">
// * {
//   box-sizing: border-box;
//   outline: 3px solid limegreen !important;
// }

.scroll-area::-webkit-scrollbar {
  width: 2px;
  /* width of the entire scrollbar */
  min-height: 200px;
}

.scroll-area::-webkit-scrollbar-track {
  background: rgb(255, 166, 0, 0.1);
  /* color of the tracking area */
}

.scroll-area::-webkit-scrollbar-thumb {
  background-color: rgb(219, 250, 43);
  /* color of the scroll thumb */
  border-radius: 20px;
  /* roundness of the scroll thumb */
  border: 3px solid rgba(255, 166, 0, 0);
  /* creates padding around scroll thumb */
}

.header {
  background-color: #000000c9;
  backdrop-filter: blur(7px);
}

.zoom-controls {
  position: absolute;
  // background: rgb(153, 150, 150);
  z-index: 2000;
  //width: 300px;
  // height: 20px;
  right: 1vw;
  top: 2%;
  width: fit-content;
}

.pop-up-btn {
  background: #dca257;
  color: white;
  text-align: center;
  border-radius: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  width: 100%;
  border-width: 0px;
}

.pop-up-btn:hover {
  background-color: #dca2578a;
  /* Green */
  color: white;
}

.leaflet-popup-content-wrapper {
  background: #f1f8e9;
  color: #333;
  box-shadow: 0 3px 14px rgb(0 0 0 / 40%);
  border-radius: 0%;
  min-width: 200px;
}

.leaflet-popup-tip {
  background: #f1f8e9;
}

.box {
  display: flex;
  flex-flow: row;
  height: 100%;
}

.box .row.map-selection {
  flex: 0 1 auto;
  /* The above is shorthand for:
  flex-grow: 0,
  flex-shrink: 1,
  flex-basis: auto
  */
}

.box .row.map-content {
  flex: 1 1 auto;
}

.leaflet-right .leaflet-control {
  float: right;
}

.leaflet-left .leaflet-control {
  float: left;
}

.leaflet-control {
  position: relative;
  bottom: 50%;
  z-index: 800;
  pointer-events: visiblePainted;
  pointer-events: auto;
}

// overwrite the leaflet top control
.leaflet-top {
  margin: 7vh 0px;
  display: none;
}

//
.custom-map-tools-section {
  position: absolute;
  right: 0;
  margin: 50px 20px 0px 0px;
  z-index: 500;
  border-radius: 10px;
  padding: 10px;
}

//custom draw button
.custom-tool {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 500;
  border-radius: 10px;
  padding: 7px;
  background-color: white;
  cursor: pointer;
}

.layer-control {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.65);
  padding: 10px;
}
.layer-control label {
  display: block;
  margin-bottom: 5px;
  z-index: 50000;
}
.layer-control input[type="radio"] {
  margin-right: 5px;
}
.map-container {
  height: 500px;
}

@media screen and (max-width: 768px) {
  .map-content {
    min-width: 70%;
    border-radius: 0px;
  }

  .area-selection {
    position: absolute;
    z-index: 3000;
    top: 0%;
    left: 0%;
    min-width: 100%;
    border-radius: 0px;
    background-color: #fffdfd;
  }

  .zoom-controls {
    position: absolute;
    // background: rgb(153, 150, 150);
    z-index: 2000;
    //width: 300px;
    // height: 20px;
    right: 2vw;
    top: 7vh;
    width: fit-content;
  }
}

@media screen and (min-width: 768px) {
  .area-selection {
    position: absolute;
    z-index: 3000;
    top: 2%;
    left: 1%;
    max-width: 60%;
    max-height: 98%;
    border-radius: 10px;
    background-color: #ffffff;
  }
  .map-content {
    min-width: 70%;
    border-radius: 15px;
    margin-top: 8px;
    margin-bottom: 8px;
  }
}
</style>
