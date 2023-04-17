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
          GREEN<span style="font-weight: light"
            ><q-icon
              id="pulse"
              square
              size="md"
              class="q-ma-none q-pa-none"
              name="mdi-pulse"
          /></span>
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
    </q-header>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" style="z-index: 5000">
      <div
        class="bg-primary"
        style="position: absolute; height: 100vh; width: 100%; z-index: 5000"
      >
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar color="grey-5" text-color="white"> R </q-avatar>
          </q-item-section>

          <q-item-section>Letter avatar-type</q-item-section>
        </q-item>
        <q-list padding class="rounded-borders text-white my-font">
          <q-item
            clickable
            v-ripple
            :active="link === 'inbox'"
            @click="link = 'inbox'"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon size="xs" name="inbox" />
            </q-item-section>

            <q-item-section>Home</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            :active="link === 'outbox'"
            @click="link = 'outbox'"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon size="xs" name="send" />
            </q-item-section>

            <q-item-section>Outbox</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            :active="link === 'trash'"
            @click="link = 'trash'"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon size="xs" name="delete" />
            </q-item-section>

            <q-item-section>Trash</q-item-section>
          </q-item>

          <q-separator class="q-mx-lg" spaced />

          <q-item
            clickable
            v-ripple
            :active="link === 'settings'"
            @click="link = 'settings'"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="settings" />
            </q-item-section>

            <q-item-section>Settings</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            :active="link === 'help'"
            @click="link = 'help'"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="help" />
            </q-item-section>

            <q-item-section>Help</q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-drawer> -->

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

