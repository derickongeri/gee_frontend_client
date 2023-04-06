<template>
  <div class="mobile-socials-button">
    <q-fab color="white" direction="up" padding="xs">
      <template v-slot:icon="{ opened }">
        <q-icon
          :class="{ 'example-fab-animate--hover': opened !== true }"
          name="mdi-share-variant"
          color="lime-9"
          size="xs"
        />
      </template>

      <template v-slot:active-icon="{ opened }">
        <q-icon
          :class="{ 'example-fab-animate--hover': opened !== true }"
          name="mdi-share-variant"
          color="lime-9"
          size="xs"
        />
      </template>
      <q-fab-action
        color="white"
        @click="clipboard"
        padding="5px"
      >
      <template v-slot>
        <q-icon
          name="mdi-content-copy"
          color="lime-9"
          size="xs"
        />
      </template>
      </q-fab-action>
      <q-fab-action
        color="white"
        @click="facebook"
        padding="5px"
      >
      <template v-slot>
        <q-icon
          name="mdi-facebook"
          color="lime-9"
          size="xs"
        />
      </template>
      </q-fab-action>
      <q-fab-action
        color="white"
        @click="twitter"
        padding="5px"
      >
      <template v-slot>
        <q-icon
          name="mdi-twitter"
          color="lime-9"
          size="xs"
        />
      </template>
      </q-fab-action>
      <q-fab-action
        color="white"
        @click="linkedin"
        padding="5px"
     >
      <template v-slot>
        <q-icon
          name="mdi-linkedin"
          color="lime-9"
          size="xs"
        />
      </template>
      </q-fab-action>
    </q-fab>
  </div>

  <q-card class="card web-view-socials" style="min-width: 25vw" flat>
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h5 q-pl-xl">Share this page</div>
      <q-space />
      <q-btn icon="close" flat round dense size="xs" v-close-popup />
    </q-card-section>
    <q-card-section>
      <div class="text-grey-9 q-px-xl q-py-md">
        Click to copy and paste link in email or chart
      </div>
      <div class="rrow justify-evenly items-center q-px-xl">
        <q-btn-group outlined rounded flat>
          <q-btn
            align="between"
            class="btn-fixed-width"
            no-caps
            outline
            color="lime-9"
            @click="clipboard"
            ><span>{{ url }}</span></q-btn
          >
          <q-btn rounded color="lime-9" label="Copy" @click="clipboard" />
        </q-btn-group>
      </div>
    </q-card-section>
    <q-card-section class="justify-left items-left">
      <div class="row justify-left q-gutter-lg items-left q-px-xl">
        <q-btn
          round
          flat
          color="grey-8"
          size="lg"
          icon="mdi-facebook"
          @click="facebook"
        />
        <q-btn
          round
          flat
          color="grey-8"
          size="lg"
          icon="mdi-linkedin"
          @click="linkedin"
        />
        <q-btn
          round
          flat
          color="grey-8"
          size="lg"
          icon="mdi-twitter"
          @click="twitter"
        />
        <q-btn
          round
          flat
          color="grey-8"
          size="lg"
          icon="mdi-content-copy"
          @click="clipboard"
        />
      </div>
    </q-card-section>
  </q-card>
</template>
<script>
export default {
  props: ["821923318980328"],
  data() {
    return {
      showDialog: false,
      message: `Use Earth Observation data to monitor and track environmental changes, helping you stay informed about our planet's health`,
      url: "http://derickongeri.com/greenpulse/#/",
      resolve: null,
      reject: null,
    };
  },
  methods: {
    show(message, url) {
      this.message = message;
      this.url = url;
      this.showDialog = true;
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    cancel() {
      this.showDialog = false;
      this.reject();
    },
    facebook() {
      window.open(
        "https://www.facebook.com/dialog/share?app_id=821923318980328&display=popup&href=" +
          encodeURIComponent(this.url) +
          "&quote=" +
          encodeURIComponent(this.message)
      );
      this.showDialog = false;
      this.resolve();
    },
    linkedin() {
      window.open(
        "https://www.linkedin.com/sharing/share-offsite/?url=" +
          encodeURIComponent(this.url) +
          "&message=" +
          encodeURIComponent(this.message)
      );
      this.showDialog = false;
      this.resolve();
    },
    twitter() {
      window.open(
        "https://twitter.com/intent/tweet?url=" +
          encodeURIComponent(this.url) +
          "&text=" +
          encodeURIComponent(this.message)
      );
      this.showDialog = false;
      this.resolve();
    },
    clipboard() {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(this.message + " " + this.url);
      } else {
        let textArea = document.createElement("textarea");
        textArea.value = this.message + " " + this.url;
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      this.$q.notify({
        message: "Copied to clipboard: " + /*this.message + */ " " + this.url,
        timeout: 2000,
      });
      this.showDialog = false;
      this.resolve();
    },
  },
};
</script>

<style>
@media screen and (min-width: 768px) {
  .mobile-socials-button {
    display: none;
  }
}

@media screen and (max-width: 768px) {
  .web-view-socials {
    display: none;
  }
}
</style>
