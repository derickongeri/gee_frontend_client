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
          <h6
            class="q-px-md q-my-none q-pb-xs"
            style="font-weight: 700; font-size: 21px"
          >
            {{$t('registerNewAccount')}}
          </h6>
        </div>
        <div class="text-primary q-py-xs q-px-md q-pt-lg">
          <div>
            <!-- <q-label class="q-ma-md">Enter your name *</q-label> -->
            <div class="row q-pa-none q-gutter-sm">
              <div class="col">
                <q-input
                  rounded
                  outlined
                  dense
                  v-model="form.firstName"
                  :label="$t('firstName')"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Field is required *',
                  ]"
                />
              </div>
              <div class="col">
                <q-input
                  rounded
                  outlined
                  dense
                  v-model="form.lastName"
                  :label="$t('lastName')"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Field is required *',
                  ]"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="col text-primary q-gutter-xl q-py-xs q-px-md">
          <div>
            <!-- <q-label class="q-ma-md">Your Email *</q-label> -->
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
        </div>
        <div class="text-primary q-py-xs q-px-md">
          <div>
            <!-- <q-label class="q-ma-md">Password *</q-label> -->
            <q-input
              :type="isPwd ? 'password' : 'text'"
              rounded
              outlined
              dense
              v-model="form.password"
              :label="$t('password')"
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

          <div>
            <!-- <q-label class="q-ma-md">Confirm Password *</q-label> -->
            <q-input
              :type="isPwd ? 'password' : 'text'"
              rounded
              outlined
              dense
              v-model="confirmedpassword"
              :label="$t('password')"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Field is required *',
                (val) => val === form.password || 'passwords should match',
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
            style="font-weight: 400; font-size: 16px"
            no-caps
            type="submit"
            class="q-px-xl"
            unelevated
            rounded
            color="primary"
            :label="$t('signup')"
            @click="handleRegister"
          />
          <p
            class="q-mt-sm q-mb-xs text-grey"
            style="font-weight: 400; font-size: 16px"
          >
            {{$t('alreadyHaveAnAccount')}}<q-btn
              style="font-weight: 400; font-size: 16px"
              no-caps
              flat
              class="q-mt-none q-px-md"
              outline
              color="primary"
              :label="$t('login')"
              to="/login"
            />
          </p>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import userAuthUser from "src/composables/userAuthUser";
import useNotify from "src/composables/useNotify";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const { register } = userAuthUser();
    const { notifyError, notifySuccess } = useNotify();

    const confirmedpassword = ref("");

    //Object to hold the form data
    const form = ref({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      // confirmedpassword: "",
    });

    //method to handle login and redirect to dashboard
    const handleRegister = async () => {
      if (confirmedpassword.value === form.value.password) {
        try {
          await register(form.value);
          notifySuccess("Success");
          router.push({
            name: "email-confirmation",
            query: { email: form.value.email },
            // path: "/dashboard"
          });
        } catch (error) {
          notifyError(error.message);
        }
      } else {
        notifyError(`Your passwords do not match`);
      }
    };

    return {
      form,
      confirmedpassword,
      handleRegister,
      isPwd: ref(true),
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
