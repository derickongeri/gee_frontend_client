<template>
  <q-page padding>
    <div class="q-pa-md login-card absolute-center" style="max-width: 100%">
      <q-form @submit.prevent="">
        <!-- <div class="text-primary row">
        <div style="width: 450px"></div>
        <q-space />
        <q-btn icon="close" size="8px" outline round dense v-close-popup />
      </div> -->
        <div class="text-center text-primary" style="height: fit-content">
          <h6 class="q-px-md q-my-none q-pb-xs">Log in</h6>
        </div>

        <div class="col text-primary q-gutter-xl q-py-xs q-px-md">
          <div>
            <q-label class="q-ma-md">Your Email *</q-label>
            <q-input
              rounded
              outlined
              dense
              v-model="form.email"
              label="Email"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Field is required *',
              ]"
            />
          </div>
        </div>
        <div class="text-primary q-py-xs q-px-md">
          <div>
            <q-label class="q-ma-md">Password *</q-label>
            <q-input
              :type="isPwd ? 'password' : 'text'"
              rounded
              outlined
              dense
              v-model="form.password"
              label="Password"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Field is required *',
              ]"
            ><template v-slot:append>
                <q-icon
                size="xs"
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                /> </template
            ></q-input>
          </div>
        </div>
        <div class="col q-gutter-md text-center q-ma-none">
          <q-btn
            type="submit"
            class="q-mt-none q-px-xl"
            unelevated
            dense
            no-caps
            rounded
            color="primary"
            label="Log in"
            @click="handleLogin"
          />
          <p class="q-mt-sm q-mb-xs text-grey">Don't have an acount?</p>
          <q-btn
            class="q-px-xl"
            outline
            rounded
            dense
            no-caps
            color="primary"
            label="Sign up"
            to="/register"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import userAuthUser from "src/composables/userAuthUser";
import useNotify from 'src/composables/useNotify'
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const { login, isLoggedIn } = userAuthUser();

    const { notifyError, notifySuccess } = useNotify()

    //Object to hold the form data
    const form = ref({
      email: "",
      password: "",
    });

    // onMounted(() => {
    //   if (isLoggedIn) {
    //     router.push({ name: "me" });
    //   }
    // });

    //method to handle login and redirect to dashboard
    const handleLogin = async () => {
      try {
        await login(form.value);
        notifySuccess('Login successfully!')
        router.push({
          name: "dashboard",
        });
      } catch (error) {
        notifyError(error.message)
      }
    };

    return {
      form,
      handleLogin,
      isPwd: ref(true)
    };
  },
});
</script>

<style>
@media screen and (max-width: 768px) {
  .login-card {
    width: 100%;
  }
}

@media screen and (min-width: 768px) {
  .login-card {
    width: 40%;
  }
}
</style>
