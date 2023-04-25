<template>
  <q-page padding class="page-tint bg-white" id="hero">
    <div
      class="q-pa-md login-card absolute-center"
      style="max-width: 100%; border-radius: 15px"
    >
      <q-form @submit.prevent="">
        <!-- <div class="text-primary row">
        <div style="width: 450px"></div>
        <q-space />
        <q-btn icon="close" size="8px" outline round dense v-close-popup />
      </div> -->
        <div
          class="text-center text-primary q-my-xl"
          style="height: fit-content"
        >
          <h6
            class="q-px-md q-my-none q-pb-xs"
            style="font-weight: 700; font-size: 21px"
          >
            {{ $t("passwordReset") }}
          </h6>
        </div>

        <div class="col text-primary q-gutter-xl q-py-xs q-px-md">
          <div>
            <!-- <q-label class="q-ma-md" style="font-weight: 700; font-size: 16px"
              >Your Email *</q-label
            > -->
            <q-input
              rounded
              outlined
              dense
              v-model="form.email"
              :label="$t('emailAddress')"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Field is required *',
              ]"
            />
          </div>
          <p
            class="q-mt-none q-mb-xs text-grey"
            style="font-size: 16px; font-weight: 400"
          >
            <q-btn
              style="font-size: 16px; font-weight: 700px"
              class="q-px-xs"
              flat
              dense
              no-caps
              color="primary"
              :label="$t('backtologin')"
              to="/login"
            />
          </p>
        </div>

        <div class="col q-gutter-md text-center q-ma-none q-my-lg">
          <q-btn
            style="font-size: 16px; font-weight: 700"
            type="submit"
            class="q-mt-none q-px-xl q-mb-lg"
            unelevated
            dense
            no-caps
            rounded
            color="primary"
            :label="$t('submit')"
            @click="handlePasswordResset"
          />
          <p
            class="q-mt-sm q-mb-xs text-grey"
            style="font-size: 16px; font-weight: 400"
          >
            {{ $t("dontHaveAnAccount") }}
            <q-btn
              style="font-size: 16px; font-weight: 700px"
              class="q-px-xs"
              flat
              dense
              no-caps
              color="primary"
              :label="$t('signup')"
              to="/register"
            />
          </p>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import userAuthUser from "src/composables/userAuthUser";
import useNotify from "src/composables/useNotify";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const { login, isLoggedIn, sendPasswordRestEmail } = userAuthUser();

    const { notifyError, notifySuccess } = useNotify();

    //Object to hold the form data
    const form = ref({
      email: "",
      // password: "",
    });

    //method to handle login and redirect to dashboard
    const handlePasswordResset = async () => {
      console.log('email', form.value.email)
      try {
        await sendPasswordRestEmail(form.value.email);
        notifySuccess("Password reset email sent!");
        router.push({
          name: "reset-password-confirmation",
          query: { email: form.value.email },
        });
      } catch (error) {
        notifyError(error.message);
      }
    };

    return {
      form,
      handlePasswordResset,
      isPwd: ref(true),
    };
  },
});
</script>

<style>
/* .page-tint{
  background-color: rgba(107, 107, 107, 0.89);
  background-blend-mode: multiply;
} */

#hero {
  /* background-image: url("~/src/assets/hero2.jpg"); */
  background-blend-mode: multiply;
  background-size: 100%;
  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  /* animation-name: beat;
  animation-duration: 1.5s;
  animation-iteration-count: 5; */
}

@media screen and (max-width: 768px) {
  .login-card {
    width: 100%;
    background-color: rgba(0, 0, 0, 0);
  }
}

@media screen and (min-width: 768px) {
  .login-card {
    width: 40%;
    background-color: rgba(255, 255, 255, 0);
  }
}
</style>
