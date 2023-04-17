<template>
  <q-page padding>
    <div class="message absolute-center" style="">
      <h6 class=" q-pb-none q-mb-md">
        <strong>Thank you for registering with us!</strong>
      </h6>
      <div class="text-justify q-pa-none q-ma-none">
        <p>
          We're excited to have you on board. To complete your registration and
          access all of our platform's features, please check your eamil:</p>
<p><strong>{{ $route.query.email }}</strong></p>


          <p>You will find a link to confirm your registration. If you can't find
          the email in your inbox, please check your spam folder.
        </p>
        <p>
          Thank you for choosing on the platform, and we look forward to seeing
          you around!
        </p>
        <p>Best regards,</p>
        <p>The GreenPulse</p>
        <p><a href="">  Proceed to Login <span><q-icon name="mdi-arrow-right"></q-icon></span></a></p>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EmailConfrimationPage",
});
</script>
