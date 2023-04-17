<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-white q-ma-none text-grey-10">
      <q-toolbar class="q-ma-none web-view">
        <q-avatar square size="50px" class="q-ml-xl">
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
          class="text-h6 my-font q-pa-none q-ma-none item-center"
          style="color: #3c4e3d; font-size: 1.2rem; font-weight: bold"
        >
          <div
            class="row items-end q-pl-xs q-ma-none q-gutter-none"
            style="max-height: 50px"
          >
            <img src="~/src/assets/logoname.svg" />
          </div>
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
          class="my-font q-mr-xl"
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
      <q-toolbar class="q-ma-none mobile-view">
        <q-avatar square size="50px" class="q-ma-none">
          <img
            src="~/src/assets/logo4.png"
            style="position: relative; width: 80%; height: 80%; left: -1%"
          />
        </q-avatar>
        <q-separator vertical inset />
        <q-toolbar-title
          class="text-h6 my-font q-pa-none q-ma-none item-center"
          style="color: #3c4e3d; font-size: 1.2rem; font-weight: bold"
        >
          <div
            class="row items-end q-pl-xs q-ma-none q-gutter-none"
            style="max-height: 50px"
          >
            <img src="~/src/assets/logoname.svg" />
          </div>
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>
    <!-- <q-header bordered class="bg-white q-ma-none text-grey-10 mobile-view">
      <q-toolbar class="q-ma-none">
        <q-avatar square size="50px" class="q-ma-none">
          <img
            src="~/src/assets/logo4.png"
            style="position: relative; width: 80%; height: 80%; left: -1%"
          />
        </q-avatar>
        <q-separator vertical inset />
        <q-toolbar-title
          class="text-h6 my-font q-pa-none q-ma-none item-center"
          style="color: #3c4e3d; font-size: 1.2rem; font-weight: bold"
        >
          <div
            class="row items-end q-pl-xs q-ma-none q-gutter-none"
            style="max-height: 50px"
          >
            <img src="~/src/assets/logoname.svg" />
          </div>
        </q-toolbar-title>

        <q-btn
          class="my-font q-mr-xl"
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
        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header> -->

    <q-drawer
      class="mobile-view"
      v-model="rightDrawerOpen"
      side="right"
      style="z-index: 5000"
    >
      <div
        class="row"
        style="position: absolute; z-index: 5001; left: -5%; top: 2%"
      >
        <q-btn
          color="grey-1"
          text-color="lime-9"
          round
          unelevated
          icon="mdi-chevron-right"
          size="md"
          @click="toggleRightDrawer"
        ></q-btn>
      </div>
      <div
        class="column justify-between bg-grey-1 text-grey-9"
        style="position: absolute; height: 100vh; width: 100%; z-index: 5000"
      >
        <div class="row" style="width: 100%">
          <q-list
            padding
            class="rounded-borders text-lime-9 my-font"
            style="width: 100%"
          >
            <q-item class="q-my-lg q-pt-lg">
              <q-item-section>
                <q-item-label class="text-h6"
                  >{{ user.user_metadata.firstName }}
                  {{ user.user_metadata.lastName }}</q-item-label
                >
                <q-item-label caption style="font-size: 0.75em">{{
                  user.email
                }}</q-item-label>
              </q-item-section>

              <q-item-section avatar>
                <q-avatar color="grey-5" text-color="lime-9"
                  >{{ user.user_metadata.firstName.charAt(0)
                  }}{{ user.user_metadata.lastName.charAt(0) }}</q-avatar
                >
              </q-item-section>
            </q-item>

            <q-separator spaced />

            <q-item clickable v-ripple to="home">
              <q-item-section avatar>
                <q-icon size="xs" name="mdi-home" />
              </q-item-section>

              <q-item-section>Home</q-item-section>
            </q-item>

            <q-item clickable v-ripple to="dashboard">
              <q-item-section avatar>
                <q-icon size="xs" name="mdi-view-dashboard" />
              </q-item-section>

              <q-item-section>Dashboard</q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon size="xs" name="mdi-cog" />
              </q-item-section>

              <q-item-section>Settings</q-item-section>

              <q-menu class="my-font" no-focus fit>
                <q-list style="min-width: 100px">
                  <q-item clickable>
                    <q-item-section avatar>
                      <q-icon size="xs" name="mdi-translate" />
                    </q-item-section>

                    <q-item-section>Language</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section avatar>
                      <q-icon size="xs" name="mdi-account-cog" />
                    </q-item-section>

                    <q-item-section>My Profile</q-item-section>
                  </q-item>
                </q-list></q-menu
              >
            </q-item>
          </q-list>
        </div>

        <div class="row">
          <q-list
            padding
            class="rounded-borders text-lime-9 my-font"
            style="width: 100%"
          >
            <q-separator spaced />
            <q-item
              clickable
              v-ripple
              :active="link === 'help'"
              @click="handleLogout"
            >
              <q-item-section avatar>
                <q-icon size="xs" name="logout" />
              </q-item-section>

              <q-item-section>Logout</q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </q-drawer>

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

    const rightDrawerOpen = ref(false);

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
      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
      link: ref("inbox"),
    };
  },
});
</script>

<style lang="scss">
.my-menu-link {
  color: white;
  background: #f2c037;
}

@media screen and (max-width: 768px) {
  .web-view {
    display: none;
  }
}

@media screen and (min-width: 768px) {
  .mobile-view {
    display: none;
  }
}
</style>
