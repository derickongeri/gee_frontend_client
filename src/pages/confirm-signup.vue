<template>
  <q-page padding>
    <div class="message absolute-center" style="">
      <h6 class="q-pb-none q-mb-md">
        <strong>Thank you for registering with us!</strong>
      </h6>
      <div class="text-justify q-pa-none q-ma-none">
        <p>
          We're excited to have you on board. Your account has been activated.
        </p>
        <p>
          <a :href="$route.query.confirmation_url">
            Proceed to Login
            <span><q-icon name="mdi-arrow-right"></q-icon></span
          ></a>
        </p>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ConfirmSignup",
});
</script>
