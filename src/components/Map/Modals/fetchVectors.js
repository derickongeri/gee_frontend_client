import { useVectorStore } from "../../../stores/vector_store/index.js";
import { axios } from "src/boot/axios";

export default function setSelectedVect() {

  const store = useVectorStore();

  const selectedVect = async function () {
    let region = store.getselectedRegion;

    const regionsWfsURL =
      "http://78.141.234.158/geoserver/kenyadata/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=kenyadata%3Akwsparks&maxFeatures=50&outputFormat=application%2Fjson&";

    region = region.replace(/'/g, "%27").replace(/ /g, "%20");

    let wfsURL = regionsWfsURL + "CQL_FILTER=NAME_1" + "='" + region + "'";

    console.log(wfsURL);

    let response = await axios.get(wfsURL);

    let vectLayer = response.data;

    return vectLayer;
  };

  const customVector = function () {

  }

  return {
    selectedVect,
  };
}
