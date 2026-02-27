<template>
   <v-sheet
      :style="{ width: '97%' }"
      class="h-100 d-flex flex-column justify-center"
   >
      <v-toolbar title="Cadastrar Ordem de Serviço" class="bg-blue-darken-3">
      </v-toolbar>
      <v-stepper editable>
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
                  <v-sheet class="pa-4"> </v-sheet>
               </v-stepper-window-item>
               <v-stepper-window-item :value="3">
                  <!-- Conteúdo para a etapa de Serviços -->
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

const hour = ref("")
const date = ref("")

useCustomer()
useVehicle()

onMounted(() => {
   const now = new Date()
   date.value = now.toLocaleDateString("pt-BR")
   hour.value = now.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
   })
})
</script>
