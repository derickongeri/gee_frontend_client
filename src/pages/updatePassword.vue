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
            {{$t('updatePassword')}}
          </h6>
        </div>

        <!-- <div class="col text-primary q-gutter-xl q-py-xs q-px-md">
          <div>
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
        </div> -->
        <div class="text-primary q-py-xs q-px-md q-mt-lg">
          <div>
            <!-- <q-label class="q-ma-md">Password *</q-label> -->
            <q-input
              :type="isPwd ? 'password' : 'text'"
              rounded
              outlined
              dense
              v-model="form.password"
              :label="$t('newPassword')"
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
              :label="$t('confirmPassword')"
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
            :label="$t('submit')"
            @click="updatePassword"
          />
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
    const { register, updateUserPassword } = userAuthUser();
    const { notifyError, notifySuccess } = useNotify();

    const confirmedpassword = ref("");

    //Object to hold the form data
    const form = ref({
      // firstName: "",
      // lastName: "",
      // email: "",
      password: "",
      // confirmedpassword: "",
    });

    //method to handle login and redirect to dashboard
    const updatePassword = async () => {
      if (confirmedpassword.value === form.value.password) {
        try {
          await updateUserPassword(form.value.password);
          notifySuccess("Success");
          router.push({
            name: "home",
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
      updatePassword,
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
