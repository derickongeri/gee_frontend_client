import { Notify } from 'quasar';
import { storeToRefs } from 'pinia';
import {useVectorStore} from "src/stores/vector_store/index"

const {getCustomGeojson, getDatesSelected} = storeToRefs(useVectorStore())

// post reqest to get raster
const requestAnalysis = async ({payload, uri, indicator}) => {
  try {
    payload = {getCustomGeojson, getDatesSelected};
    uri = "http://127.0.0.1:3000/api" + indicator

    const response = await axios.post(uri, payload, {
      headers: {
        "Content-Type": "application/json",
      }
    })

    return response
  }catch(error){
    Notify.create({
      message: `${error} Error fetching chart response!`,
      color: 'red'
    });
  }
}

const requestRaster = await requestAnalysis(payload, url, `raster`)
