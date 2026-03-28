<template>
   <v-sheet
      :style="{ width: '97%' }"
      class="h-100 d-flex flex-column justify-center ga-8"
   >
      <v-sheet class="w-100 d-flex flex-column">
         <h2 class="text-h5 font-weight-medium mb-4">Ordem de Serviço</h2>
         <v-row>
            <v-col cols="12" md="1" class="pt-0 pb-2">
               <div class="d-flex flex-column">
                  <v-label for="orderNumber-input" class="mb-1">Número</v-label>
                  <v-text-field
                     hide-details
                     id="orderNumber-input"
                     density="compact"
                     :model-value="orderNumber ? String(orderNumber) : ''"
                     disabled
                  ></v-text-field>
               </div>
            </v-col>
            <v-col cols="12" md="2" class="pt-0 pb-2">
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
            <v-col cols="12" md="1" class="pt-0 pb-2">
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
      </v-sheet>

      <v-tabs v-model="tab">
         <v-tab :value="1">Informações Gerais</v-tab>
         <v-tab :value="2">Serviços</v-tab>
         <v-tab :value="3">Peças</v-tab>
      </v-tabs>

      <v-tabs-window v-model="tab">
         <v-tabs-window-item :value="1">
            <general-informations-form />
         </v-tabs-window-item>
         <v-tabs-window-item :value="2">
            <ServicesForm />
         </v-tabs-window-item>
         <v-tabs-window-item :value="3">
            <PartsForm />
         </v-tabs-window-item>
      </v-tabs-window>
   </v-sheet>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue"
import { useRoute } from "vue-router"
import PartsForm from "../components/PartsForm.vue"
import ServicesForm from "../components/ServicesForm.vue"
import GeneralInformationsForm from "../components/GeneralInformationsForm.vue"
import { useVehicle } from "@src/modules/vehicles/providers/vehicleProvider"
import { useCustomer } from "@src/modules/customers/providers/customerProvider"

useVehicle()
useCustomer()

const route = useRoute()

const tab = ref(1)
const date = ref("14/02/2026")
const hour = ref("22:13")
const orderNumber = computed(() => {
   const raw = route.params.id
   const n = typeof raw === "string" ? Number(raw) : Number(raw[0])
   return Number.isFinite(n) ? n : 0
})
const editing = ref(false)

watch(
   () => route.params.id,
   () => {
      tab.value = 1
   }
)
</script>
