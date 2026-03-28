<template>
   <v-sheet class="py-4">
      <!-- <v-form class="pb-5">
         <v-row>
            <v-col cols="2" class="pt-2">
               <div class="d-flex flex-column">
                  <v-label for="orderNumber-input" class="mb-1">Data</v-label>
                  <v-mask-input
                     v-model="date"
                     hide-details
                     density="compact"
                     mask="##/##/####"
                     placeholder="00/00/0000"
                     :disabled="!editing"
                  ></v-mask-input>
               </div>
            </v-col>
            <v-col cols="2" class="pt-2">
               <div class="d-flex flex-column">
                  <v-label for="orderNumber-input" class="mb-1">Hora</v-label>
                  <v-mask-input
                     v-model="hour"
                     hide-details
                     density="compact"
                     mask="##:##"
                     placeholder="00:00"
                     :disabled="!editing"
                  ></v-mask-input>
               </div>
            </v-col>
         </v-row>
      </v-form> -->
      <VehicleForm />
      <v-divider class="my-10"></v-divider>
      <CustomerForm />
   </v-sheet>
</template>

<script setup lang="ts">
import CustomerForm from "@src/modules/customers/components/CustomerForm.vue"
import VehicleForm from "@src/modules/vehicles/components/VehicleForm.vue"
import { ref } from "vue"

defineProps({
   editing: {
      type: Boolean,
      default: false,
   },
})

const hour = ref("22:13")
const date = ref("14/02/2026")
</script>
