<template>
  <q-card
    flat
    class="my-card"
    style="width: 450px; background-color: #b5caca00; border-radius: 20px"
  >
    <q-card-section
      class="text-white q-px-xs"
      style="background-color: #00000000"
    >
      <sdg />
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  components: {
    sdg: require("./Modals/sdg/sdg.vue").default,
  },
  setup() {
    return {};
  },
};
</script>

<style scoped></style>
