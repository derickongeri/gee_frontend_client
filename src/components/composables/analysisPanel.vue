<template>
  <q-card class="q-mb-sm q-mx-sm">
    <q-card-section class="bg-grey-4 text-grey-9">
      <div class="text-h6">Some Title Here</div>
      <div class="text-subtitle2">some caption here</div>
    </q-card-section>

    <q-separator />
    <q-card-section>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
        mollitia, molestiae quas vel sint commodi repudiandae consequuntur
        voluptatum laborum numquam blanditiis harum quisquam eius sed odit
        fugiat iusto fuga praesentium optio, eaque rerum! Provident similique
        accusantium nemo autem.
      </div>
    </q-card-section>
  </q-card>

  <q-card class="q-ma-sm">
    <q-card-section>
      <Analysis />
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  components: {
    Analysis: require("../Analysis/Modals/sdg/sdg.vue").default,
  },

  setup() {},
};
</script>
