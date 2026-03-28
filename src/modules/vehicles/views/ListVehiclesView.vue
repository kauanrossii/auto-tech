<template>
   <v-sheet class="w-100 h-100 d-flex justify-center">
      <BaseTable
         :headers="headers"
         :items="vehicleList"
         :items-length="vehicleListPagination.totalItems"
         :page="vehicleListPagination.page"
         :items-per-page="vehicleListPagination.quantity"
         :loading="vehicleListLoading"
         loading-text="Carregando dados de veículos"
         @update:options="
            ({ page, itemsPerPage }) => updateOptions(page, itemsPerPage)
         "
         @action:view="viewVehicleHandler"
         @action:edit="editVehicleHandler"
         @action:delete="deleteVehicleHandler"
      >
         <template #top>
            <v-toolbar flat class="bg-white">
               <v-toolbar-title>Veículos</v-toolbar-title>

               <v-btn
                  class="me-2"
                  variant="elevated"
                  rounded="sm"
                  color="primary"
                  text="Cadastrar veículo"
                  @click="createVehicleHandler"
               ></v-btn>
            </v-toolbar>
         </template>
      </BaseTable>
   </v-sheet>

   <v-dialog v-model="vehicleSelectedManipulating" max-width="900px">
      <v-card class="d-flex flex-column">
         <v-card-title :class="modalTitleBackgroundClass" class="py-3">
            {{ modalTitle }}
         </v-card-title>
         <v-card-text class="overflow-y-auto flex-grow-1 pa-4">
            <VehicleForm v-model:valid="vehicleModalFormValid" />
         </v-card-text>
         <v-divider />
         <v-card-actions class="ga-4 bg-surface-light">
            <v-btn
               text="Cancelar"
               color="primary"
               variant="tonal"
               rounded="sm"
               class="px-7"
               @click="cancelModal"
            ></v-btn>
            <v-btn
               variant="elevated"
               color="primary"
               text="Confirmar"
               rounded="sm"
               class="px-7"
               :disabled="
                  vehicleSelectedLoading ||
                  (vehicleSelectedAction !== ActionForm.DELETE &&
                     !vehicleModalFormValid)
               "
               @click="confirmModal"
            ></v-btn>
         </v-card-actions>
      </v-card>
   </v-dialog>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import BaseTable from "../../../components/BaseTable.vue"
import VehicleForm from "../components/VehicleForm.vue"
import { useVehicle } from "../providers/vehicleProvider"
import { useVehicleComposable } from "../composables/vehicleComposable"
import { RoutesNames } from "@src/router/routes-names"
import { ActionForm } from "@src/data/enums/ActionForm"

const {
   vehicleList,
   vehicleListFilters,
   vehicleListPagination,
   vehicleListLoading,
   vehicleSelected,
   vehicleSelectedAction,
   vehicleSelectedLoading,
   vehicleSelectedManipulating,
} = useVehicle()

const router = useRouter()

const vehicleModalFormValid = ref(false)

const {
   editVehicle,
   deleteVehicle,
   createVehicle,
   fetchVehicles,
   cancelOperation,
   confirmOperation,
} = useVehicleComposable()

const modalTitle = computed(() => {
   switch (vehicleSelectedAction.value) {
      case ActionForm.CREATE:
         return "Cadastrar veículo"
      case ActionForm.UPDATE:
         return "Editar veículo"
      case ActionForm.DELETE:
         return "Deseja mesmo deletar o veículo?"
      default:
         return ""
   }
})

const modalTitleBackgroundClass = computed(() => {
   switch (vehicleSelectedAction.value) {
      case ActionForm.CREATE:
         return "bg-blue-darken-3"
      case ActionForm.UPDATE:
         return "bg-blue-grey"
      case ActionForm.DELETE:
         return "bg-red-darken-3"
      default:
         return "bg-surface-light"
   }
})

const viewVehicleHandler = (id: number) => {
   router.push({
      name: RoutesNames.vehiclesDetails,
      params: { id: String(id) },
   })
}

const headers = [
   { title: "Placa", key: "plate" },
   { title: "Modelo", key: "model" },
   { title: "Marca", key: "brand" },
   { title: "Ano", key: "year" },
   { title: "Cor", key: "color" },
   {
      title: "Ações",
      key: "actions",
      align: "center" as const,
      sortable: false,
      width: "50px",
   },
]

const createVehicleHandler = () => {
   vehicleModalFormValid.value = false
   createVehicle(
      vehicleSelected,
      vehicleSelectedLoading,
      vehicleSelectedManipulating,
      vehicleSelectedAction
   )
}

const editVehicleHandler = async (id: number) => {
   vehicleModalFormValid.value = false
   await editVehicle(
      id,
      vehicleSelected,
      vehicleSelectedLoading,
      vehicleSelectedManipulating,
      vehicleSelectedAction
   )
}

const deleteVehicleHandler = async (id: number) => {
   vehicleModalFormValid.value = false
   await deleteVehicle(
      id,
      vehicleSelected,
      vehicleSelectedLoading,
      vehicleSelectedManipulating,
      vehicleSelectedAction
   )
}

const cancelModal = () => {
   cancelOperation(
      vehicleSelectedLoading,
      vehicleSelectedManipulating,
      vehicleSelectedAction
   )
}

const confirmModal = async () => {
   if (
      vehicleSelectedAction.value !== ActionForm.DELETE &&
      !vehicleModalFormValid.value
   ) {
      return
   }

   await confirmOperation(
      vehicleSelected,
      vehicleSelectedLoading,
      vehicleSelectedAction
   )

   await fetchVehicles(
      vehicleList,
      vehicleListFilters,
      vehicleListPagination,
      vehicleListLoading
   )

   vehicleSelectedAction.value = ActionForm.NONE
   vehicleSelectedManipulating.value = false
}

const updateOptions = async (page: number, itemsPerPage: number) => {
   vehicleListPagination.value.page = page
   vehicleListPagination.value.quantity = itemsPerPage
   await fetchVehicles(
      vehicleList,
      vehicleListFilters,
      vehicleListPagination,
      vehicleListLoading
   )
}

onMounted(async () => {
   await fetchVehicles(
      vehicleList,
      vehicleListFilters,
      vehicleListPagination,
      vehicleListLoading
   )
})
</script>
