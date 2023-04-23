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
          style="color: #3c4e3d; font-size: 21px; font-weight: bold"
        >
          <div
            class="row items-end q-pl-xs q-ma-none q-gutter-none"
            style="font-size: 21px"
          >
            <img src="~/src/assets/logoname.svg" />
          </div>
        </q-toolbar-title>
        <q-btn
          class="my-font"
          style="font-weight: 700; font-size: 16px"
          flat
          no-caps
          color="grey-9"
          icon="mdi-home"
          :label="$t(`home`)"
          to="/home"
        ></q-btn>
        <q-btn
          class="my-font"
          style="font-weight: 700; font-size: 16px"
          flat
          no-caps
          color="grey-9"
          icon="mdi-view-dashboard"
          :label="$t('dashboard')"
          to="/dashboard"
        >
        </q-btn>
        <q-btn
          v-if="user"
          class="my-font q-mr-lg"
          style="font-weight: 700; font-size: 16px"
          flat
          no-caps
          color="grey-9"
          icon="mdi-account"
          icon-right="mdi-menu-down"
          :label="user.user_metadata.firstName"
        >
          <q-menu fit>
            <q-list>
              <q-item clickable v-close-popup to="/me">
                <q-item-section>
                  <q-item-label>{{ $t("profile") }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="handleLogout">
                <q-item-section>
                  <q-item-label>{{ $t("logout") }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <q-btn
          v-else
          class="my-font q-mr-lg"
          style="font-weight: 700; font-size: 16px"
          flat
          no-caps
          color="grey-9"
          icon="mdi-account"
          :label="$t('login')"
          to="/login"
        />

        <div class="my-font q-mr-xl" style="font-weight: 700">
          <q-select
            label-color="grey-9"
            v-model="locale"
            :options="localeOptions"
            :label="$t('select_language')"
            dense
            borderless
            emit-value
            map-options
            style="min-width: 150px; font-weight: 700; font-size: 16px"
          >
            <template v-slot:prepend
              ><q-icon size="xs" name="mdi-web"
            /></template>
          </q-select>
        </div>
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

        <q-btn dense flat icon="menu" @click="toggleRightDrawer" />
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
        class="column justify-between bg-grey-1 text-lime-9"
        style="position: absolute; height: 100%; width: 100%; z-index: 5000"
      >
        <div class="row" style="width: 100%">
          <q-list
            padding
            class="rounded-borders text-lime-9 my-font"
            style="width: 100%; font-size: 16px; font-weight: bold"
          >
            <q-item class="q-my-lg q-pt-lg">
              <!-- <q-item-section>
                <q-item-label
                  class="text-h6"
                  style="font-size: 21px; font-weight: bold"
                  >Login</q-item-label
                >
                <q-item-label caption style="font-size: 12px">{{
                  user.email
                }}</q-item-label>
              </q-item-section>

              <q-item-section avatar>
                <q-avatar color="primary" text-color="grey-1"
                  >{{ user.user_metadata.firstName.charAt(0)
                  }}{{ user.user_metadata.lastName.charAt(0) }}</q-avatar
                >
              </q-item-section> -->
            </q-item>

            <q-separator spaced />

            <q-item clickable v-ripple to="home">
              <q-item-section avatar>
                <q-icon size="xs" name="mdi-home" />
              </q-item-section>

              <q-item-section>{{ $t("home") }}</q-item-section>
            </q-item>

            <q-item clickable v-ripple to="dashboard">
              <q-item-section avatar>
                <q-icon size="xs" name="mdi-view-dashboard" />
              </q-item-section>

              <q-item-section>{{ $t("dashboard") }}</q-item-section>
            </q-item>

            <q-item
              clickable
              v-ripple
              @click="toggleSettings = !toggleSettings"
            >
              <q-item-section avatar>
                <q-icon size="xs" name="mdi-cog" />
              </q-item-section>

              <q-item-section>{{ $t("settings") }}</q-item-section>
            </q-item>

            <q-separator spaced />

            <q-list
              v-if="toggleSettings"
              class="q-mx-md"
              style="min-width: 100px"
            >
              <q-item clickable v-ripple to="me">
                <q-item-section avatar>
                  <q-icon size="xs" name="mdi-account-cog" />
                </q-item-section>

                <q-item-section>{{ $t("my_profile") }}</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section avatar>
                  <q-icon size="xs" name="mdi-translate" />
                </q-item-section>
                <q-item-section>
                  <q-select
                    label-color="grey-9"
                    v-model="locale"
                    :options="localeOptions"
                    :label="$t('select_language')"
                    dense
                    borderless
                    emit-value
                    map-options
                    options-dense
                    style="min-width: 150px"
                  >
                  </q-select>
                </q-item-section>

                <!-- <q-item-section>Language</q-item-section> -->
              </q-item>
            </q-list>
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
import { ref, defineComponent } from "vue";

import userAuthUser from "src/composables/userAuthUser";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "LoginLayout",

  // components: {
  //   EssentialLink,
  // },

  setup() {
    const $q = useQuasar();

    const router = useRouter();

    const { logout, user } = userAuthUser();

    const { locale } = useI18n({ useScope: "global" });

    const rightDrawerOpen = ref(false);

    const toggleRightDrawer = () => {
      rightDrawerOpen.value = !rightDrawerOpen.value;
      //console.log(router.currentRoute.value.path);
    };

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
      currentPath: ref(router.currentRoute.value.path),
      handleLogout,
      user,
      toggleRightDrawer,
      link: ref("inbox"),
      toggleSettings: ref(false),
      locale,
      localeOptions: [
        { value: "en-US", label: "English" },
        { value: "fr", label: "French" },
        { value: "es-ES", label: "Spanish" },
        { value: "sw", label: "Swahili" },
      ],
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
