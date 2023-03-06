<template>
  <div class="q-pa-xs" style="max-width: 300px">
    <div class="q-pb-sm">Period Before Fire</div>
    <q-input  rounded outlined dense readonly>
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy
            anchor="bottom left"
            self="top left"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date v-model="date" range minimal >
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
        <q-span style="font-size: 0.5em">from:</q-span>
        <q-chip
          v-if="date"
          dense
          square
          text-color="grey-9"
          class="q-my-none q-ml-xs q-mr-none"
        >
          {{ date.from }}
        </q-chip>
        <q-span style="font-size: 0.5em">to:</q-span>
        <q-chip
          v-if="date"
          dense
          square
          text-color="grey-9"
          class="q-my-none q-ml-xs q-mr-none"
        >
          {{ date.to }}
        </q-chip>
      </template>
    </q-input>
  </div>
  <div class="q-pa-xs" style="max-width: 300px">
    <div class="q-pb-sm">Period After Fire</div>
    <q-input  rounded outlined dense readonly>
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy
            anchor="bottom left"
            self="top left"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date v-model="date" range minimal >
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
        <q-span style="font-size: 0.5em">from:</q-span>
        <q-chip
          v-if="date"
          dense
          square
          text-color="grey-9"
          class="q-my-none q-ml-xs q-mr-none"
        >
          {{ date.from }}
        </q-chip>
        <q-span style="font-size: 0.5em">to:</q-span>
        <q-chip
          v-if="date"
          dense
          square
          text-color="grey-9"
          class="q-my-none q-ml-xs q-mr-none"
        >
          {{ date.to }}
        </q-chip>
      </template>
    </q-input>
  </div>
</template>

<script>
import { ref, defineComponent } from "vue";

export default defineComponent({
  setup() {
    const date = ref({ from: "2020/07/08", to: "2020/07/17" }),
      daterange = ref(null);

    return {
      date,
      daterange,
    };
  },
});
</script>
