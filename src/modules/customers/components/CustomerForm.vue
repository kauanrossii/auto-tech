<template>
   <v-card class="d-flex flex-column" max-height="80vh">
      <v-card-title :class="titleBackgroundClass" class="py-3">{{
         title
      }}</v-card-title>
      <v-card-text class="overflow-y-auto flex-grow-1 pa-8">
         <v-form ref="formCustomer" v-model="formCustomerValid" lazy-validation>
            <v-row>
               <v-col cols="12" md="8">
                  <div class="d-flex flex-column">
                     <v-label for="name-input" class="mb-1">Nome *</v-label>
                     <v-text-field
                        id="name-input"
                        v-model="customerSelected.name"
                        :disabled="isDeletingCustomer"
                        :rules="CustomerRules.name"
                     >
                     </v-text-field>
                  </div>
               </v-col>

               <v-col cols="12" md="4">
                  <div class="d-flex flex-column">
                     <v-label for="type-input" class="mb-1"
                        >Tipo de Pessoa *</v-label
                     >
                     <v-autocomplete
                        id="type-input"
                        v-model="customerSelected.type"
                        :items="PersonTypeItems"
                        item-title="title"
                        item-value="value"
                        :disabled="isDeletingCustomer"
                        :rules="CustomerRules.type"
                     ></v-autocomplete>
                  </div>
               </v-col>

               <v-col cols="12" md="6">
                  <div class="d-flex flex-column">
                     <v-label for="email-input" class="mb-1">E-mail</v-label>
                     <v-text-field
                        id="email-input"
                        v-model="customerSelected.email"
                        :disabled="isDeletingCustomer"
                        type="email"
                        :rules="CustomerRules.email"
                     >
                     </v-text-field>
                  </div>
               </v-col>

               <v-col cols="12" md="3">
                  <div class="d-flex flex-column">
                     <v-label for="cellphone-input" class="mb-1"
                        >Celular</v-label
                     >
                     <v-text-field
                        id="cellphone-input"
                        v-model="customerSelected.cellphone"
                        :disabled="isDeletingCustomer"
                     >
                     </v-text-field>
                  </div>
               </v-col>

               <v-col cols="12" md="3">
                  <div class="d-flex flex-column">
                     <v-label for="phone-input" class="mb-1"
                        >Telefone fixo</v-label
                     >
                     <v-text-field
                        id="phone-input"
                        v-model="customerSelected.phone"
                        :disabled="isDeletingCustomer"
                     >
                     </v-text-field>
                  </div>
               </v-col>

               <v-col cols="12" md="6">
                  <div class="d-flex flex-column">
                     <v-label for="govDocument-input" class="mb-1">{{
                        govDocumentLabel
                     }}</v-label>
                     <v-text-field
                        id="govDocument-input"
                        v-model="customerSelected.govDocument"
                        :disabled="isDeletingCustomer"
                     >
                     </v-text-field>
                  </div>
               </v-col>

               <v-col cols="12" md="6">
                  <div class="d-flex flex-column">
                     <v-label for="govIdentifier-input" class="mb-1">{{
                        govIdentifierLabel
                     }}</v-label>
                     <v-text-field
                        id="govIdentifier-input"
                        v-model="customerSelected.govIdentifier"
                        :disabled="isDeletingCustomer"
                     >
                     </v-text-field>
                  </div>
               </v-col>
            </v-row>

            <v-row class="my-0">
               <v-divider
                  class="my-6 mx-3"
                  thickness="1"
                  opacity="0.5"
                  color="black"
               ></v-divider>
            </v-row>

            <v-row>
               <v-col cols="12" md="3">
                  <div class="d-flex flex-column">
                     <v-label for="cep-input" class="mb-1">CEP</v-label>
                     <v-text-field
                        id="cep-input"
                        v-model="customerSelected.address!.cep"
                        :disabled="isDeletingCustomer"
                        placeholder="00000-000"
                     >
                     </v-text-field>
                  </div>
               </v-col>

               <v-col cols="12" md="3">
                  <div class="d-flex flex-column">
                     <v-label for="uf-input" class="mb-1">UF</v-label>
                     <v-autocomplete
                        id="uf-input"
                        v-model="customerSelected.address!.uf"
                        :items="stateItems"
                        :disabled="isDeletingCustomer"
                     ></v-autocomplete>
                  </div>
               </v-col>

               <v-col cols="12" md="6">
                  <div class="d-flex flex-column">
                     <v-label for="city-input" class="mb-1">Cidade</v-label>
                     <v-text-field
                        id="city-input"
                        v-model="customerSelected.address!.city"
                        :disabled="isDeletingCustomer"
                     >
                     </v-text-field>
                  </div>
               </v-col>

               <v-col cols="12" md="5">
                  <div class="d-flex flex-column">
                     <v-label for="street-input" class="mb-1">Rua</v-label>
                     <v-text-field
                        id="street-input"
                        v-model="customerSelected.address!.street"
                        :disabled="isDeletingCustomer"
                     >
                     </v-text-field>
                  </div>
               </v-col>

               <v-col cols="12" md="5">
                  <div class="d-flex flex-column">
                     <v-label for="district-input" class="mb-1">Bairro</v-label>
                     <v-text-field
                        id="district-input"
                        v-model="customerSelected.address!.district"
                        :disabled="isDeletingCustomer"
                     >
                     </v-text-field>
                  </div>
               </v-col>

               <v-col cols="12" md="2">
                  <div class="d-flex flex-column">
                     <v-label for="unit-input" class="mb-1">Nº/Apto</v-label>
                     <v-text-field
                        id="unit-input"
                        v-model="customerSelected.address!.unit"
                        :disabled="isDeletingCustomer"
                     >
                     </v-text-field>
                  </div>
               </v-col>
            </v-row>
         </v-form>
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
import { injectStrict } from "../../../utils/injectionUtils"
import { CustomerKeys } from "../providers/customerKeys"
import { useCustomerComposable } from "../composables/customersComposable"
import { CustomerRules } from "../rules/customer-rules"
import { PersonType } from "../models/constants/CustomerType"
import { computed, ref } from "vue"
import { ActionForm } from "@src/data/enums/ActionForm"

const { fetchCustomers, cancelOperation, confirmOperation } =
   useCustomerComposable()

const customerList = injectStrict(CustomerKeys.customerList)
const customerListFilters = injectStrict(CustomerKeys.customerListFilters)
const customerListPagination = injectStrict(CustomerKeys.customerListPagination)
const customerListLoading = injectStrict(CustomerKeys.customerListLoading)
const customerSelected = injectStrict(CustomerKeys.customerSelected)
const customerSelectedAction = injectStrict(CustomerKeys.customerSelectedAction)
const customerSelectedManipulating = injectStrict(
   CustomerKeys.customerSelectedManipulating
)
const customerSelectedLoading = injectStrict(
   CustomerKeys.customerSelectedLoading
)
const formCustomerValid = ref(false)

const PersonTypeItems = PersonType

const stateItems = [
   "Acre",
   "Alagoas",
   "Amapá",
   "Amazonas",
   "Bahia",
   "Ceará",
   "Distrito Federal",
   "Espírito Santo",
   "Goiás",
   "Maranhão",
   "Mato Grosso",
   "Mato Grosso do Sul",
   "Minas Gerais",
   "Pará",
   "Paraíba",
   "Paraná",
   "Pernambuco",
   "Piauí",
   "Rio de Janeiro",
   "Rio Grande do Norte",
   "Rio Grande do Sul",
   "Rondônia",
   "Roraima",
   "Santa Catarina",
   "São Paulo",
   "Sergipe",
   "Tocantins",
]

const isDeletingCustomer = computed(() => {
   return customerSelectedAction.value === ActionForm.DELETE
})

const govDocumentLabel = computed(() => {
   if (!customerSelected.value.type) {
      return "Registro Governamental"
   }
   return customerSelected.value.type === 1 ? "CPF" : "CNPJ"
})

const govIdentifierLabel = computed(() => {
   if (!customerSelected.value.type) {
      return "Documento Identificador"
   }
   return customerSelected.value.type === 1 ? "RG" : "Inscrição Estadual"
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
      customerSelected,
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
