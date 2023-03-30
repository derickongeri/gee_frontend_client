import { Notify } from "quasar";
import { useVectorStore } from "../../../stores/vector_store/index.js";
import { api, baseURL, axios } from "src/boot/axios";
import setSelectedVect from "../../Map/Modals/fetchVectors";

export default function setLayerStats() {
  const { selectedVect } = setSelectedVect();
  const store = useVectorStore();

  const getRasterStats = async function () {
    try {
      let layerStats = null;
      let classes = [];
      let area = [];
      let color = [];
      let statsObj = {};

      await selectedVect();

      //console.log(store.customGeojson, 'fetchRaster')
      let params = {
        geometry: store.customGeojson.toString(),
        dates: store.datesSelected,
      };

      //store.setStats(null);
      if (process.env.DEV) console.log(params);

      const response = await api.post(`${baseURL}api/stats`, params, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (process.env.DEV) console.log(response.data);
      layerStats = response.data.stats;

      const createStatsObj = (classname, area_ha, classColor) => {
        classes.push(classname);
        area.push(area_ha);
        color.push(classColor);
      };

      for (let i = 0; i < layerStats.length; i++) {
        createStatsObj(
          layerStats[i].Class,
          layerStats[i].Hectares,
          layerStats[i].color
        );
      }

      statsObj = {
        labels: classes,
        data: area,
        palette: color,
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
        message: `${error} Error fetching chart!`,
        color: "red",
      });
    }
  };

  return {
    getRasterStats,
  };
}
