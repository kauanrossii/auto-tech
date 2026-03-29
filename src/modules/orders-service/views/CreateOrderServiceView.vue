<template>
   <v-sheet :style="{ width: '97%' }" class="d-flex flex-column py-4">
      <v-sheet flat class="pa-6 pb-4 flex-shrink-0">
         <div class="d-flex align-start align-sm-center ga-3 flex-wrap">
            <v-btn
               icon="mdi-arrow-left"
               variant="text"
               density="comfortable"
               aria-label="Voltar para a lista"
               @click="goToOrdersList"
            />
            <div class="flex-grow-1" style="min-width: 200px">
               <h1 class="text-h5 font-weight-medium">Nova ordem de serviço</h1>
               <p class="text-body-2 text-medium-emphasis mb-0 mt-2">
                  Preencha os dados do cliente, veículo, peças e serviços.
               </p>
            </div>
            <div class="d-flex flex-wrap ga-2 align-center">
               <v-btn
                  variant="tonal"
                  color="primary"
                  rounded="sm"
                  text="Cancelar"
                  @click="goToOrdersList"
               />
               <v-btn
                  color="primary"
                  variant="elevated"
                  rounded="sm"
                  text="Cadastrar"
                  @click="createOrderOfService"
               />
            </div>
         </div>
      </v-sheet>

      <v-divider class="flex-shrink-0" />

      <v-sheet class="px-4 py-4 d-flex flex-column">
         <v-sheet class="w-100 mb-2 d-flex flex-column">
            <v-row dense class="ma-0" style="max-width: 100%">
               <v-col cols="12" sm="auto" class="pt-0 pb-2">
                  <div class="d-flex flex-column" style="min-width: 88px">
                     <v-label for="order-number-create" class="mb-1"
                        >Número</v-label
                     >
                     <v-text-field
                        id="order-number-create"
                        hide-details
                        density="compact"
                        variant="outlined"
                        model-value="—"
                        disabled
                     />
                  </div>
               </v-col>
               <v-col cols="12" sm="auto" class="pt-0 pb-2">
                  <div class="d-flex flex-column" style="min-width: 140px">
                     <v-label for="order-date-create" class="mb-1"
                        >Data</v-label
                     >
                     <v-mask-input
                        id="order-date-create"
                        v-model="date"
                        hide-details
                        density="compact"
                        variant="outlined"
                        mask="##/##/####"
                        placeholder="00/00/0000"
                     />
                  </div>
               </v-col>
               <v-col cols="12" sm="auto" class="pt-0 pb-2">
                  <div class="d-flex flex-column" style="min-width: 100px">
                     <v-label for="order-hour-create" class="mb-1"
                        >Hora</v-label
                     >
                     <v-mask-input
                        id="order-hour-create"
                        v-model="hour"
                        hide-details
                        density="compact"
                        variant="outlined"
                        mask="##:##"
                        placeholder="00:00"
                     />
                  </div>
               </v-col>
            </v-row>
         </v-sheet>

         <v-tabs v-model="tab" class="mt-2" color="primary">
            <v-tab value="customer">Cliente</v-tab>
            <v-tab value="vehicle">Veículo</v-tab>
            <v-tab value="parts">Peças</v-tab>
            <v-tab value="services">Serviços</v-tab>
         </v-tabs>

         <!-- v-tabs-window (VWindow) limita altura/overflow e corta formulários longos; v-show mantém o fluxo e o scroll fica no AppView -->
         <div v-show="tab === 'customer'" class="py-6">
            <CustomerForm />
         </div>
         <div v-show="tab === 'vehicle'" class="py-6">
            <VehicleForm :readonly="false" />
         </div>
         <div v-show="tab === 'parts'">
            <PartsForm :readonly="false" />
         </div>
         <div v-show="tab === 'services'">
            <ServicesForm :readonly="false" />
         </div>
      </v-sheet>
   </v-sheet>
</template>

<script setup lang="ts">
import CustomerForm from "@src/modules/customers/components/CustomerForm.vue"
import { useCustomer } from "@src/modules/customers/providers/customerProvider"
import VehicleForm from "@src/modules/vehicles/components/VehicleForm.vue"
import { useVehicle } from "@src/modules/vehicles/providers/vehicleProvider"
import type { VehicleForm as VehicleFormType } from "@src/modules/vehicles/types/vehicle-form"
import { onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import { RoutesNames } from "@src/router/routes-names"
import { Customer } from "electron/main/entities/customer"
import ServicesForm from "../components/ServicesForm.vue"
import PartsForm from "../components/PartsForm.vue"

const router = useRouter()

const { customerSelected } = useCustomer()
const { vehicleSelected } = useVehicle()

const hour = ref("")
const date = ref("")
const tab = ref<"customer" | "vehicle" | "parts" | "services">("customer")

const emptyVehicle = (): VehicleFormType => ({
   id: null,
   model: null,
   brand: null,
   plate: null,
   year: null,
   fuel: null,
   lastMileage: null,
   color: null,
   chassi: null,
})

function goToOrdersList() {
   router.push({ name: RoutesNames.ordersOfServiceList })
}

async function createOrderOfService() {
   // TODO: implementar persistência quando a OS tiver DTO/API definida
   console.log("Cadastrar ordem de serviço (pendente de implementação)")
}

onMounted(() => {
   const now = new Date()
   date.value = now.toLocaleDateString("pt-BR")
   hour.value = now.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
   })
   vehicleSelected.value = emptyVehicle()
   customerSelected.value = {} as Customer
})
</script>
