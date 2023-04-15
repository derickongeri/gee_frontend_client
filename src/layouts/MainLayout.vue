<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-white q-ma-none text-grey-10">
      <q-toolbar class="q-ma-none">
        <q-avatar square size="50px" class="q-ma-none">
          <img
            src="~/src/assets/logo4.png"
            style="position: relative; width: 80%; height: 80%; left: -1%"
          />
        </q-avatar>
        <q-separator vertical inset />
        <!-- <div square class="q-ma-none" style="max-width: 100px">
          <img
            src="~/src/assets/logo4.png"
            style="position: relative; width: 100%; height: 100%; left: -1%"
          />
        </div> -->
        <q-toolbar-title
          class="text-h6 q-pa-none q-ma-none item-center"
          style="color: #3c4e3d; font-size: 1.2rem; font-weight: bold"
        >
          <!-- GREEN<span style="font-weight: light"
            ><q-icon
              id="pulse"
              square
              size="md"
              class="q-ma-none q-pa-none"
              name="mdi-pulse"
          /></span> -->
        </q-toolbar-title>
        <!-- <q-btn
          id="tour-btn"
          flat
          round
          dense
          icon="mdi-human-male-board"
          @click="this.$tours['myTour'].start()"
        />
        <q-btn flat round dense icon="mdi-information-outline" /> -->
        <q-btn
          class="my-font"
          style="font-weight: bold"
          flat
          no-caps
          color="black"
          label="Home"
          to="/home"
        ></q-btn>
        <q-btn
          class="my-font"
          style="font-weight: bold"
          flat
          no-caps
          color="black"
          label="Dashboard"
          to="/dashboard"
        >
        </q-btn>
        <q-btn
          class="my-font"
          style="font-weight: bold"
          flat
          no-caps
          color="black"
          icon="mdi-account-outline"
          :label="user.user_metadata.firstName"
        >
          <q-menu fit>
            <q-list>
              <q-item clickable v-close-popup to="/me">
                <q-item-section>
                  <q-item-label>My Profile</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="handleLogout">
                <q-item-section>
                  <q-item-label>Logout</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container style="padding-bottom: 0px" class="my-font">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

import userAuthUser from "src/composables/userAuthUser";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "MainLayout",

  // components: {
  //   EssentialLink,
  // },

  setup() {
    const $q = useQuasar();

    const router = useRouter();

    const { logout, user } = userAuthUser();

    const handleLogout = async () => {
      $q.dialog({
        title: "Logout",
        message: "Do you really want to leave?",
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        await logout();
        router.replace({ name: "login" });
      });
    };

    return {
      handleLogout,
      user,
    };
  },
});
</script>
