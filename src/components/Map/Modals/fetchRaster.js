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

    //console.log(store.customGeojson, 'fetchRaster')

    const response = await axios.post("http://127.0.0.1:3000/api/mapid", store.customGeojson.toString(), {
      headers: {
        "Content-Type": "application/json",
      },
    })

    const mapid = response.data

    eeLayer = L.tileLayer(
      `https://earthengine.googleapis.com/v1alpha/${mapid}/tiles/{z}/{x}/{y}`,
      {
        //layers: `${mapid}`,
        transparent: true,
        crs: L.CRS.EPSG4326,
        format: "image/png",
        attribution: "google earth engine",
      }
    );

    return eeLayer;
  };

  return {
    getRasterLayer,
  };
}
