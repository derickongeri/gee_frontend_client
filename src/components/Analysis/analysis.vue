<template>
  <q-card
    flat
    class="my-card"
    style="width: 100%; background-color: #b5caca00; border-radius: 20px"
  >
    <q-card-section>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
        mollitia, molestiae quas vel sint commodi repudiandae consequuntur
        voluptatum laborum numquam blanditiis harum quisquam eius sed odit
        fugiat iusto fuga praesentium optio, eaque rerum! Provident similique
        accusantium nemo autem.
      </div>
    </q-card-section>
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
