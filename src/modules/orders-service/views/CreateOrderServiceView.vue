<template>
   <v-sheet :style="{ width: '97%' }" class="h-100 d-flex flex-column">
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
                  Preencha as etapas abaixo para registrar cliente, veículo,
                  serviços e peças.
               </p>
            </div>
         </div>
      </v-sheet>
      <v-divider class="flex-shrink-0" />
      <v-stepper editable class="flex-grow-1 rounded-0 elevation-0">
         <template #default="{ prev, next }">
            <v-stepper-header class="rounded-0 bg-white">
               <v-stepper-item
                  title="Informações Gerais"
                  :value="1"
               ></v-stepper-item>
               <v-divider></v-divider>
               <v-stepper-item title="Serviços" :value="2"></v-stepper-item>
               <v-divider></v-divider>
               <v-stepper-item title="Peças" :value="3"></v-stepper-item>
            </v-stepper-header>
            <v-stepper-window>
               <v-stepper-window-item :value="1">
                  <v-sheet class="pb-2 px-0">
                     <v-form class="pb-5">
                        <v-row>
                           <v-col cols="2" class="pt-2">
                              <div class="d-flex flex-column">
                                 <v-label for="orderNumber-input" class="mb-1"
                                    >Data</v-label
                                 >
                                 <v-mask-input
                                    v-model="date"
                                    hide-details
                                    density="compact"
                                    mask="##/##/####"
                                    placeholder="00/00/0000"
                                 ></v-mask-input>
                              </div>
                           </v-col>
                           <v-col cols="2" class="pt-2">
                              <div class="d-flex flex-column">
                                 <v-label for="orderNumber-input" class="mb-1"
                                    >Hora</v-label
                                 >
                                 <v-mask-input
                                    v-model="hour"
                                    hide-details
                                    density="compact"
                                    mask="##:##"
                                    placeholder="00:00"
                                 ></v-mask-input>
                              </div>
                           </v-col>
                        </v-row>
                     </v-form>
                     <VehicleForm2 />
                     <v-divider class="my-10"></v-divider>
                     <CustomerForm />
                  </v-sheet>
               </v-stepper-window-item>
               <v-stepper-window-item :value="2">
                  <ServicesForm />
               </v-stepper-window-item>
               <v-stepper-window-item :value="3">
                  <PartsForm />
               </v-stepper-window-item>
            </v-stepper-window>
            <v-stepper-actions>
               <template #prev>
                  <v-btn
                     @click="prev"
                     variant="tonal"
                     color="primary"
                     text="Anterior"
                     rounded="sm"
                  ></v-btn>
               </template>
               <template #next>
                  <v-btn
                     @click="next"
                     variant="elevated"
                     color="primary"
                     text="Próximo"
                     rounded="sm"
                  ></v-btn>
               </template>
            </v-stepper-actions>
         </template>
      </v-stepper>
   </v-sheet>
</template>

<script setup lang="ts">
import CustomerForm from "@src/modules/customers/components/CustomerForm.vue"
import { useCustomer } from "@src/modules/customers/providers/customerProvider"
import VehicleForm2 from "@src/modules/vehicles/components/VehicleForm2.vue"
import { useVehicle } from "@src/modules/vehicles/providers/vehicleProvider"
import { onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import { RoutesNames } from "@src/router/routes-names"
import ServicesForm from "../components/ServicesForm.vue"
import PartsForm from "../components/PartsForm.vue"

const router = useRouter()

const hour = ref("")
const date = ref("")

useCustomer()
useVehicle()

function goToOrdersList() {
   router.push({ name: RoutesNames.ordersOfServiceList })
}

onMounted(() => {
   const now = new Date()
   date.value = now.toLocaleDateString("pt-BR")
   hour.value = now.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
   })
})
</script>
