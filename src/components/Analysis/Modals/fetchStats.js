import { Notify } from "quasar";
import { useVectorStore } from "../../../stores/vector_store/index.js";
import { axios } from "src/boot/axios";
import setSelectedVect from "../../Map/Modals/fetchVectors";

export default function setLayerStats() {
  const { selectedVect } = setSelectedVect();
  const store = useVectorStore();

  const getRasterStats = async function () {
    try {
      let layerStats = null;
      let classes = [];
      let area = [];
      let statsObj = {};

      await selectedVect();

      //console.log(store.customGeojson, 'fetchRaster')
      let params = {
        geometry: store.customGeojson.toString(),
        dates: store.datesSelected,
      };

      //store.setStats(null);

      const response = await axios.post(
        "http://127.0.0.1:3000/api/stats",
        params,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      layerStats = response.data.stats;

      // layerStats = [
      //   { Class: "NA", Pixels: 0 },
      //   { Class: "High Severity", Pixels: 24 },
      //   { Class: "Moderate-high Severity", Pixels: 15261 },
      //   { Class: "Moderate-low Severity", Pixels: 149024 },
      //   { Class: "Low Severity", Pixels: 199547 },
      //   { Class: "Unburned", Pixels: 496483 },
      //   { Class: "Enhanced Regrowth, Low", Pixels: 3251 },
      //   { Class: "Enhanced Regrowth, High", Pixels: 274 },
      // ];

      const createStatsObj = (classname, val) => {
        classes.push(classname);
        area.push(val);
      };

      for (let i = 0; i < layerStats.length; i++) {
        createStatsObj(layerStats[i].Class, layerStats[i].Pixels);
      }
      console.log(layerStats);

      let classColors = [
        "#7a8737",
        "#acbe4d",
        "#0ae042",
        "#fff70b",
        "#ffaf38",
        "#ff641b",
        "#a41fd6",
      ];

      classColors = classColors.reverse();

      statsObj = {
        labels: classes,
        data: area,
        palette: classColors,
      };

      console.log(statsObj);

      // store.setStats(statsObj).then(() => {
      //   store.setStatsVisibility(true)
      // });

      return statsObj;
    } catch (error) {
      // Notify.create("Danger, Will Robinson! Danger!");
      // or with a config object:
      Notify.create({
        message: `${error} Error fetching chart response!`,
        color: 'red'
      });
    }
  };

  return {
    getRasterStats,
  };
}
