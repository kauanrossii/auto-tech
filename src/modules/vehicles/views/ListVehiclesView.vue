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
         @action:view="editVehicleHandler"
         @action:edit="editVehicleHandler"
         @action:delete="deleteVehicleHandler"
      >
         <template #top>
            <v-toolbar flat class="bg-white">
               <v-toolbar-title>Veículos cadastrados</v-toolbar-title>

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

   <v-dialog v-model="vehicleSelectedManipulating" max-width="700px">
      <VehicleForm />
   </v-dialog>
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import BaseTable from "../../../components/BaseTable.vue"
import VehicleForm from "../components/VehicleForm.vue"
import { useVehicle } from "../providers/vehicleProvider"
import { useVehicleComposable } from "../composables/vehicleComposable"

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

const { editVehicle, deleteVehicle, createVehicle, fetchVehicles } =
   useVehicleComposable()

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
   createVehicle(
      vehicleSelected,
      vehicleSelectedLoading,
      vehicleSelectedManipulating,
      vehicleSelectedAction
   )
}

const editVehicleHandler = async (id: number) => {
   await editVehicle(
      id,
      vehicleSelected,
      vehicleSelectedLoading,
      vehicleSelectedManipulating,
      vehicleSelectedAction
   )
}

const deleteVehicleHandler = async (id: number) => {
   await deleteVehicle(
      id,
      vehicleSelected,
      vehicleSelectedLoading,
      vehicleSelectedManipulating,
      vehicleSelectedAction
   )
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
