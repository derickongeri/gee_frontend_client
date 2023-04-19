<template>
  <router-view />
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "App",
  setup() {
    const $q = useQuasar();
    $q.lang.getLocale(); // returns a string
    onMounted(
      ()=>{
        console.log($q.lang.getLocale())
      }
    )
  },
});
</script>
