<template>
   <v-sheet :style="{ width: '97%' }" class="h-100 d-flex flex-column">
      <v-sheet flat class="pa-6 pb-4 flex-shrink-0">
         <div class="d-flex align-start align-sm-center ga-3 flex-wrap">
            <v-btn
               icon="mdi-arrow-left"
               variant="text"
               density="comfortable"
               aria-label="Voltar para a lista"
               @click="goToList"
            />
            <div class="flex-grow-1" style="min-width: 200px">
               <h1 class="text-h5 font-weight-medium">Detalhes do veículo</h1>
               <p
                  v-if="vehicleSelected.id && !initialLoad"
                  class="text-body-2 text-medium-emphasis mb-0 mt-2"
               >
                  {{
                     isEditing
                        ? "Altere os dados e salve para persistir."
                        : "Visualização dos dados cadastrados."
                  }}
               </p>
            </div>
            <div
               v-if="vehicleSelected.id && !initialLoad"
               class="d-flex flex-wrap ga-2 align-center"
            >
               <template v-if="!isEditing">
                  <v-btn
                     color="primary"
                     variant="elevated"
                     rounded="sm"
                     text="Editar"
                     @click="startEditing"
                  />
                  <v-btn
                     color="error"
                     variant="elevated"
                     rounded="sm"
                     text="Excluir"
                     @click="deleteDialogOpen = true"
                  />
               </template>
               <template v-else>
                  <v-btn
                     variant="tonal"
                     color="primary"
                     rounded="sm"
                     text="Cancelar"
                     :disabled="vehicleSelectedLoading"
                     @click="cancelEditing"
                  />
                  <v-btn
                     color="primary"
                     variant="elevated"
                     rounded="sm"
                     text="Salvar"
                     :disabled="vehicleSelectedLoading || !vehicleFormValid"
                     :loading="vehicleSelectedLoading"
                     @click="saveChanges"
                  />
               </template>
            </div>
         </div>
      </v-sheet>
      <v-divider class="flex-shrink-0" />
      <v-sheet class="pa-4 flex-grow-1 d-flex flex-column">
         <div
            v-if="initialLoad"
            class="d-flex justify-center align-center flex-grow-1 pa-10"
         >
            <v-progress-circular indeterminate color="primary" size="48" />
         </div>
         <VehicleForm
            v-else-if="vehicleSelected.id"
            v-model:valid="vehicleFormValid"
            :readonly="!isEditing"
         />
         <v-alert
            v-else
            type="warning"
            variant="tonal"
            class="flex-shrink-0"
            text="Veículo não encontrado ou identificador inválido."
         />
      </v-sheet>

      <v-dialog v-model="deleteDialogOpen" max-width="480" persistent>
         <v-card>
            <v-card-title class="text-h6 py-3 bg-red-darken-3 text-white">
               Deletar veículo
            </v-card-title>
            <v-card-text class="text-body-1 pt-4">
               Deseja mesmo excluir o veículo
               <strong>{{ vehicleSelected.model ?? "—" }}</strong>
               de placa
               <strong>{{ vehicleSelected.plate ?? "—" }}</strong
               >?
            </v-card-text>
            <v-card-actions class="justify-end ga-2 pa-4">
               <v-btn
                  variant="tonal"
                  rounded="sm"
                  text="Não, cancelar"
                  :disabled="deleteInProgress"
                  @click="deleteDialogOpen = false"
               />
               <v-btn
                  color="error"
                  variant="elevated"
                  rounded="sm"
                  text="Sim, excluir"
                  :loading="deleteInProgress"
                  @click="confirmDelete"
               />
            </v-card-actions>
         </v-card>
      </v-dialog>
   </v-sheet>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import VehicleForm from "../components/VehicleForm.vue"
import { useVehicle } from "../providers/vehicleProvider"
import { useVehicleComposable } from "../composables/vehicleComposable"
import { RoutesNames } from "@src/router/routes-names"
import type { VehicleForm as VehicleFormType } from "../types/vehicle-form"
import { Vehicle } from "electron/main/entities/vehicle"

const route = useRoute()
const router = useRouter()

const { vehicleSelected, vehicleSelectedLoading } = useVehicle()
const { fetchVehicleById } = useVehicleComposable()

const initialLoad = ref(true)
const isEditing = ref(false)
const vehicleFormValid = ref(false)
const deleteDialogOpen = ref(false)
const deleteInProgress = ref(false)

const emptyVehicleForm = (): VehicleFormType => ({
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

function parseId(): number | null {
   const raw = route.params.id
   const s = typeof raw === "string" ? raw : raw?.[0]
   const n = s ? Number(s) : Number.NaN
   return Number.isFinite(n) && n > 0 ? n : null
}

async function load(): Promise<void> {
   isEditing.value = false
   deleteDialogOpen.value = false
   vehicleFormValid.value = false
   initialLoad.value = true
   const id = parseId()
   if (id == null) {
      vehicleSelected.value = emptyVehicleForm()
      initialLoad.value = false
      return
   }
   vehicleSelected.value = emptyVehicleForm()
   await fetchVehicleById(id, vehicleSelected, vehicleSelectedLoading)
   initialLoad.value = false
}

watch(
   () => route.params.id,
   () => {
      void load()
   }
)

onMounted(() => {
   void load()
})

function goToList() {
   router.push({ name: RoutesNames.vehiclesList })
}

function startEditing() {
   vehicleFormValid.value = false
   isEditing.value = true
}

async function cancelEditing() {
   const id = parseId()
   if (id == null) return
   await fetchVehicleById(id, vehicleSelected, vehicleSelectedLoading)
   isEditing.value = false
}

async function saveChanges() {
   if (!vehicleFormValid.value || !vehicleSelected.value.id) return
   vehicleSelectedLoading.value = true
   try {
      await window.management.updateVehicle(
         vehicleSelected.value as unknown as Vehicle
      )
      isEditing.value = false
   } catch (error) {
      console.error("Error updating vehicle:", error)
   } finally {
      vehicleSelectedLoading.value = false
   }
}

async function confirmDelete() {
   const id = vehicleSelected.value.id
   if (id == null) return
   deleteInProgress.value = true
   try {
      await window.management.deleteVehicle(id)
      deleteDialogOpen.value = false
      goToList()
   } catch (error) {
      console.error("Error deleting vehicle:", error)
   } finally {
      deleteInProgress.value = false
   }
}
</script>
