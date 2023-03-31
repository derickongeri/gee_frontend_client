import { useVectorStore } from "../../../stores/vector_store/index.js";
import { axios } from "src/boot/axios";


export default function setSelectedRaster() {

  const store = useVectorStore();

  const getRasterLayer = async function () {

    //await selectedVect()
    let eeLayer = null;
    let layerList = []

    //console.log(store.customGeojson, 'fetchRaster')
    let params = {geometry: store.customGeojson.toString(), dates: store.datesSelected}

    const response = await axios.post("http://78.141.234.158:3000/api/mapid", params, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    //console.log(response.data)

    const mapidList = response.data.tileList.reverse()

    //const mapidList = ["projects/earthengine-legacy/maps/873c0b5937d2adb49736554cc966df9a-b1d87d2ce20709815373b413dfeb270a","projects/earthengine-legacy/maps/416c60ec75e3c993e5aeb5f460ffa9d8-3b236b8f4e3ad110962c77c4a41eca79"]
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
          zIndex: mapidIndex + 2
        }
      );

      layerList.push(eeLayer)
    }

    for (let i = 0; i < mapidList.length; i++) {
      createTileLayer(i, mapidList[i])
    }
    return layerList;
  };

  return {
    getRasterLayer,
  };
}
