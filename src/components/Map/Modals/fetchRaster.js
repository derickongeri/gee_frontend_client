import { Loading, QSpinnerOval, QSpinnerFacebook, QSpinnerGears } from "quasar";
import { useVectorStore } from "../../../stores/vector_store/index.js";
import { axios } from "src/boot/axios";
import setSelectedVect from "./fetchVectors";

export default function setSelectedRaster() {
  const { selectedVect} = setSelectedVect();
  const store = useVectorStore();

  const getRasterLayer = async function () {

    await selectedVect()
    let eeLayer = null;
    let layerList = []

    //console.log(store.customGeojson, 'fetchRaster')

    // const response = await axios.post("http://127.0.0.1:3000/api/mapid", store.customGeojson.toString(), {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })

    //const mapidList = response.data.tileList.reverse()

    const mapidList = [
      "projects/earthengine-legacy/maps/133e3cec43eb01b4e0049a2727d0297c-4aa469c1fdc3d4011fc0f2c6004e56fe",
      "projects/earthengine-legacy/maps/9b08401ed0b0825029fc6e287f0e8742-dd17fb3271ec193022e9b217b0242e24"
      ]
    //console.log(response.data)


    const createTileLayer = (mapidIndex, mapid) => {
      eeLayer = L.tileLayer(
        `https://earthengine.googleapis.com/v1alpha/${mapid}/tiles/{z}/{x}/{y}`,
        {
          //layers: `${mapid}`,
          transparent: true,
          crs: L.CRS.EPSG4326,
          format: "image/png",
          attribution: "google earth engine",
          zIndex: mapidIndex + 1
        }
      );

      layerList.push(eeLayer)
    }

    for (let i = 0; i < mapidList.length; i++) {
      createTileLayer(i, mapidList[i])
    }

    const rasterGroup = L.layerGroup(layerList)

    return rasterGroup;
  };

  return {
    getRasterLayer,
  };
}
