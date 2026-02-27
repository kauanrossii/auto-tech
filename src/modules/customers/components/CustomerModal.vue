<template>
   <v-card class="d-flex flex-column" max-height="80vh">
      <v-card-title :class="titleBackgroundClass" class="py-3">{{
         title
      }}</v-card-title>
      <v-card-text class="overflow-y-auto flex-grow-1 pa-8">
         <CustomerForm />
      </v-card-text>

      <v-card-actions class="ga-6 py-3">
         <v-btn
            text="Cancelar"
            color="primary"
            variant="tonal"
            rounded="sm"
            class="px-7"
            @click="cancel"
         ></v-btn>

         <v-btn
            variant="elevated"
            color="primary"
            text="Confirmar"
            rounded="sm"
            class="px-7"
            @click="confirm"
            :disabled="
               customerSelectedLoading ||
               (customerSelectedAction !== ActionForm.DELETE &&
                  !formCustomerValid)
            "
         ></v-btn>
      </v-card-actions>
   </v-card>
</template>

<script setup lang="ts">
import { injectStrict } from "@src/utils/injectionUtils"
import { CustomerKeys } from "../providers/customerKeys"
import { ActionForm } from "@src/data/enums/ActionForm"
import { computed, ref } from "vue"
import { useCustomerComposable } from "../composables/customersComposable"
import { type CustomerForm } from "../types/customer-form"

const { fetchCustomers, cancelOperation, confirmOperation } =
   useCustomerComposable()

const customerList = injectStrict(CustomerKeys.customerList)
const customerListFilters = injectStrict(CustomerKeys.customerListFilters)
const customerListPagination = injectStrict(CustomerKeys.customerListPagination)
const customerListLoading = injectStrict(CustomerKeys.customerListLoading)
const customerSelectedAction = injectStrict(CustomerKeys.customerSelectedAction)
const customerSelectedLoading = injectStrict(
   CustomerKeys.customerSelectedLoading
)
const customerSelectedManipulating = injectStrict(
   CustomerKeys.customerSelectedManipulating
)

const formCustomerValid = ref(false)
const formData = ref<CustomerForm>({
   id: null,
   name: "",
   type: null,
   email: "",
   cellphone: "",
   phone: "",
   govDocument: "",
   govIdentifier: "",
   address: {
      id: null,
      cep: "",
      uf: "",
      city: "",
      street: "",
      district: "",
      unit: "",
   },
})

const titleBackgroundClass = computed(() => {
   switch (customerSelectedAction.value) {
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

const title = computed(() => {
   switch (customerSelectedAction.value) {
      case ActionForm.CREATE:
         return "Cadastrar cliente"
      case ActionForm.UPDATE:
         return "Editar cliente"
      case ActionForm.DELETE:
         return "Deseja mesmo deletar o cliente?"
      default:
         return ""
   }
})

const cancel = () => {
   cancelOperation(
      customerSelectedLoading,
      customerSelectedManipulating,
      customerSelectedAction
   )
}

const confirm = async () => {
   if (!formCustomerValid.value) {
      return
   }

   await confirmOperation(
      formData,
      customerSelectedLoading,
      customerSelectedAction
   )

   await fetchCustomers(
      customerList,
      customerListFilters,
      customerListPagination,
      customerListLoading
   )

   customerSelectedAction.value = ActionForm.NONE
   customerSelectedManipulating.value = false
}
</script>
