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
                        v-model="formData.name"
                        :disabled="isDeletingCustomer"
                        :rules="CustomerRules.name"
                        :error="nameError"
                        :error-messages="nameMessages"
                        @blur="handleNameBlur"
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
                        v-model="formData.type"
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
                        v-model="formData.email"
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
                        v-model="formData.cellphone"
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
                        v-model="formData.phone"
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
                        v-model="formData.govDocument"
                        :disabled="isDeletingCustomer"
                        :error="govDocumentError"
                        :error-messages="govDocumentMessages"
                        @blur="handleGovDocumentBlur"
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
                        v-model="formData.govIdentifier"
                        :disabled="isDeletingCustomer"
                        :error="govIdentifierError"
                        :error-messages="govIdentifierMessages"
                        @blur="handleGovIdentifierBlur"
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
                        v-model="formData.address!.cep"
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
                        v-model="formData.address!.uf"
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
                        v-model="formData.address!.city"
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
                        v-model="formData.address!.street"
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
                        v-model="formData.address!.district"
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
                        v-model="formData.address!.unit"
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
import { computed, ref, type Ref, onMounted } from "vue"
import { ActionForm } from "@src/data/enums/ActionForm"
import { CustomerForm } from "../types/customer-form"
import { Customer } from "electron/main/entities/customer"

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
const nameMessages = ref<string[]>([])
const nameError = ref(false)
const govDocumentMessages = ref<string[]>([])
const govDocumentError = ref(false)
const govIdentifierMessages = ref<string[]>([])
const govIdentifierError = ref(false)

const DUPLICATE_CUSTOMER_ERROR_MESSAGE =
   "Esse cliente já foi cadastrado anteriormente no sistema"

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
   if (!formData.value.type) {
      return "Registro Governamental"
   }
   return formData.value.type === 1 ? "CPF" : "CNPJ"
})

const govIdentifierLabel = computed(() => {
   if (!formData.value.type) {
      return "Documento Identificador"
   }
   return formData.value.type === 1 ? "RG" : "Inscrição Estadual"
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

onMounted(() => {
   if (customerSelected.value) {
      formData.value = {
         id: customerSelected.value.id,
         name: customerSelected.value.name,
         type: customerSelected.value.type,
         email: customerSelected.value.email,
         cellphone: customerSelected.value.cellphone,
         phone: customerSelected.value.phone,
         govDocument: customerSelected.value.govDocument,
         govIdentifier: customerSelected.value.govIdentifier,
         address: customerSelected.value.address ?? {
            id: null,
            cep: "",
            uf: "",
            city: "",
            street: "",
            district: "",
            unit: "",
         },
      }
   }
})

const validateDuplicateCustomer = async (
   fieldValue: string | null,
   messages: Ref<string[]>,
   error: Ref<boolean>,
   fetchFn: (value: string) => Promise<Customer>,
   fieldName: string
) => {
   messages.value = []
   error.value = false
   if (!fieldValue) return

   try {
      customerSelectedLoading.value = true
      const customer = await fetchFn(fieldValue)

      if (customer && customer.id !== formData.value.id) {
         messages.value = [DUPLICATE_CUSTOMER_ERROR_MESSAGE]
         error.value = true
      }
   } catch (err) {
      console.error(`Error fetching customer by ${fieldName}:`, err)
      messages.value = []
      error.value = false
   } finally {
      customerSelectedLoading.value = false
   }
}

const handleNameBlur = async () => {
   await validateDuplicateCustomer(
      formData.value.name,
      nameMessages,
      nameError,
      (value) => window.management.getCustomerByName(value),
      "name"
   )
}

const handleGovDocumentBlur = async () => {
   await validateDuplicateCustomer(
      formData.value.govDocument,
      govDocumentMessages,
      govDocumentError,
      (value) => window.management.getCustomerByGovDocument(value),
      "govDocument"
   )
}

const handleGovIdentifierBlur = async () => {
   await validateDuplicateCustomer(
      formData.value.govIdentifier,
      govIdentifierMessages,
      govIdentifierError,
      (value) => window.management.getCustomerByGovIdentifier(value),
      "govIdentifier"
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
