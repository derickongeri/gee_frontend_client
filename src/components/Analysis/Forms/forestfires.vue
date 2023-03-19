<template>
  <q-form @submit="onSubmit">
    <div class="q-pa-xs" style="max-width: fit-content">
      <div class="q-pb-sm">Select Period Before the Fire</div>
      <q-input rounded outlined dense readonly>
        <template v-slot:prepend>
          <q-icon size="xs" name="event" class="cursor-pointer">
            <q-popup-proxy
              anchor="bottom left"
              self="top left"
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date v-model="preFiredates" mask="YYYY-MM-DD" range minimal>
                <div class="row items-center justify-end q-gutter-sm">
                  <q-btn label="Cancel" color="primary" flat v-close-popup />
                  <q-btn
                    label="OK"
                    color="primary"
                    flat
                    @click="save"
                    v-close-popup
                  />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
          <q-span style="font-size: 0.5em">from:</q-span>
          <q-chip
            v-if="preFiredates"
            dense
            square
            text-color="grey-9"
            class="q-my-none q-ml-xs q-mr-none"
          >
            {{ preFiredates.from }}
          </q-chip>
          <q-chip
            v-else
            dense
            square
            text-color="grey-9"
            class="q-my-none q-ml-xs q-mr-none"
          >
            YYYY-MM-DD
          </q-chip>
          <q-span style="font-size: 0.5em">to:</q-span>
          <q-chip
            v-if="preFiredates"
            dense
            square
            text-color="grey-9"
            class="q-my-none q-ml-xs q-mr-none"
          >
            {{ preFiredates.to }}
          </q-chip>
          <q-chip
            v-else
            dense
            square
            text-color="grey-9"
            class="q-my-none q-ml-xs q-mr-none"
          >
            YYYY-MM-DD
          </q-chip>
        </template>
      </q-input>
    </div>
    <div class="q-pa-xs" style="max-width: fit-content">
      <div class="q-pb-sm">Select Period After the Fire</div>
      <q-input rounded outlined dense readonly>
        <template v-slot:prepend>
          <q-icon size="xs" name="event" class="cursor-pointer">
            <q-popup-proxy
              anchor="bottom left"
              self="top left"
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                v-model="postFiredates"
                mask="YYYY-MM-DD"
                range
                :disable="disableDates"
                minimal
              >
                <div class="row items-center justify-end q-gutter-sm">
                  <q-btn label="Cancel" color="primary" flat v-close-popup />
                  <q-btn
                    label="OK"
                    color="primary"
                    flat
                    @click="save"
                    v-close-popup
                  />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
          <q-span style="font-size: 0.5em">from:</q-span>
          <q-chip
            v-if="postFiredates"
            dense
            square
            text-color="grey-9"
            class="q-my-none q-ml-xs q-mr-none"
          >
            {{ postFiredates.from }}
          </q-chip>
          <q-chip
            v-else
            dense
            square
            text-color="grey-9"
            class="q-my-none q-ml-xs q-mr-none"
          >
            YYYY-MM-DD
          </q-chip>
          <q-span style="font-size: 0.5em">to:</q-span>
          <q-chip
            v-if="postFiredates"
            dense
            square
            text-color="grey-9"
            class="q-my-none q-ml-xs q-mr-none"
          >
            {{ postFiredates.to }}
          </q-chip>
          <q-chip
            v-else
            dense
            square
            text-color="grey-9"
            class="q-my-none q-ml-xs q-mr-none"
          >
            YYYY-MM-DD
          </q-chip>
        </template>
      </q-input>
    </div>

    <div class="q-pt-sm">
      <q-space />
      <q-btn
        @click="daterangeSubmit"
        class="full-width"
        dense
        outline
        rounded
        label="Submit"
        color="lime-9"
      />
    </div>
  </q-form>
</template>

<script>
import { ref, defineComponent } from "vue";
import { Notify } from "quasar";
import moment from "moment/dist/moment.js";
import { useVectorStore } from "../../../stores/vector_store/index.js";

export default defineComponent({
  setup() {
    const store = useVectorStore()
    const preFiredates = ref(null),
      postFiredates = ref(null),
      closePopUp = ref(false);

    const daterangeSubmit = () => {
      let dates = [preFiredates.value, postFiredates.value];
      store.setDatesSelected(dates)
    };

    return {
      preFiredates,
      postFiredates,
      daterangeSubmit,
    };
  },
});
</script>
