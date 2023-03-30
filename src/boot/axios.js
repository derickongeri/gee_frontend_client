import { boot } from 'quasar/wrappers'
import axios from 'axios'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

let baseURL;
if (process.env.DEV) {
  // baseURL = 'http://41.227.30.139:1337/' //oss
  baseURL = 'http://127.0.0.1:3000/' //oss
  // baseURL = 'http://194.163.176.189:1337/' //contabo
}
else {
  // baseURL = 'http://194.163.176.189:1337/' //contabo
  // baseURL = 'http://41.227.30.139:1337/' //oss
  baseURL = 'http://78.141.234.158:3000/' //oss
}

const api = axios.create({ baseURL })

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api, baseURL, axios }
