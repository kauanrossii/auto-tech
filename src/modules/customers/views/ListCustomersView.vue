<template>
   <v-sheet class="w-100 h-100 d-flex justify-center">
      <BaseTable
         :headers="headers"
         :items="customerList"
         :items-length="customerListPagination.totalItems"
         :page="customerListPagination.page"
         :items-per-page="customerListPagination.quantity"
         :loading="customerListLoading"
         loading-text="Carregando dados de clientes"
         @update:options="
            ({ page, itemsPerPage }) => updateOptions(page, itemsPerPage)
         "
         @action:view="editCustomerHandler"
         @action:edit="editCustomerHandler"
         @action:delete="deleteCustomerHandler"
      >
         <template #top>
            <v-toolbar flat class="bg-white">
               <v-toolbar-title>Clientes cadastrados</v-toolbar-title>

               <v-btn
                  class="me-2"
                  variant="elevated"
                  rounded="sm"
                  color="primary"
                  text="Cadastrar cliente"
                  @click="createCustomerHandler"
               ></v-btn>
            </v-toolbar>
         </template>
      </BaseTable>
   </v-sheet>

   <v-dialog v-model="customerSelectedManipulating" max-width="900px">
      <CustomerForm />
   </v-dialog>
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import BaseTable from "../../../components/BaseTable.vue"
import CustomerForm from "../components/CustomerForm.vue"
import { useCustomer } from "../providers/customerProvider"
import { useCustomerComposable } from "../composables/customersComposable"
import { PersonType } from "../models/constants/CustomerType"

const {
   customerList,
   customerListFilters,
   customerListPagination,
   customerListLoading,
   customerSelected,
   customerSelectedAction,
   customerSelectedLoading,
   customerSelectedManipulating,
} = useCustomer()

const { editCustomer, deleteCustomer, createCustomer, fetchCustomers } =
   useCustomerComposable()

const headers = [
   { title: "Nome", key: "name" },
   { title: "Tipo de Pessoa", key: "type" },
   { title: "Telefone", key: "cellphone" },
   { title: "Identificador", key: "govIdentifier" },
   {
      title: "Ações",
      key: "actions",
      align: "center" as const,
      sortable: false,
      width: "auto",
   },
]

const createCustomerHandler = () => {
   createCustomer(
      customerSelected,
      customerSelectedLoading,
      customerSelectedManipulating,
      customerSelectedAction
   )
}

const editCustomerHandler = async (id: number) => {
   await editCustomer(
      id,
      customerSelected,
      customerSelectedLoading,
      customerSelectedManipulating,
      customerSelectedAction
   )
}

const deleteCustomerHandler = async (id: number) => {
   await deleteCustomer(
      id,
      customerSelected,
      customerSelectedLoading,
      customerSelectedManipulating,
      customerSelectedAction
   )
}

const updateOptions = async (page: number, itemsPerPage: number) => {
   customerListPagination.value.page = page
   customerListPagination.value.quantity = itemsPerPage
   await fetchCustomers(
      customerList,
      customerListFilters,
      customerListPagination,
      customerListLoading
   )
}

onMounted(async () => {
   await fetchCustomers(
      customerList,
      customerListFilters,
      customerListPagination,
      customerListLoading
   )
})
</script>
