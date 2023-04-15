<template>
  <q-page class="flex flex-center">
    <div v-if="user">
      <p>Hello {{ user.user_metadata.firstName}}</p>
    </div>
    <div v-else>Not logged in</div>
  </q-page>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import userAuthUser from "src/composables/userAuthUser";

export default defineComponent({
  name: "mePage",

  setup() {
    const { user } = userAuthUser();

    onMounted(() => {
      console.log(user.value);
    });

    return {user};
  },
});
</script>
