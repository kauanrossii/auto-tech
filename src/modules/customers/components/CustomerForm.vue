<template>
   <v-form ref="formCustomer" v-model="formCustomerValid" lazy-validation>
      <v-row>
         <v-col cols="12" md="3" class="pt-0 pb-1">
            <div class="d-flex flex-column">
               <v-label for="name-input" class="mb-0">Cliente *</v-label>
               <v-text-field
                  id="name-input"
                  density="compact"
                  hide-details
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

         <v-col cols="12" md="2" class="pt-0 pb-1">
            <div class="d-flex flex-column">
               <v-label for="type-input" class="mb-0"
                  >Tipo de Cliente *</v-label
               >
               <v-autocomplete
                  id="type-input"
                  density="compact"
                  item-title="title"
                  item-value="value"
                  hide-details
                  v-model="formData.type"
                  :items="PersonTypeItems"
                  :disabled="isDeletingCustomer"
                  :rules="CustomerRules.type"
               ></v-autocomplete>
            </div>
         </v-col>

         <v-col cols="12" md="2" class="pt-0 pb-2">
            <div class="d-flex flex-column">
               <v-label for="cellphone-input" class="mb-0">Celular</v-label>
               <v-mask-input
                  hide-details
                  id="cellphone-input"
                  density="compact"
                  mask="(##) #####-####"
                  placeholder="(00) 00000-0000"
                  v-model="formData.cellphone"
                  :disabled="isDeletingCustomer"
               >
               </v-mask-input>
            </div>
         </v-col>

         <v-col cols="12" md="2" class="pt-0 pb-2">
            <div class="d-flex flex-column">
               <v-label for="phone-input" class="mb-0">Telefone fixo</v-label>
               <v-mask-input
                  hide-details
                  id="phone-input"
                  density="compact"
                  placeholder="(00) 0000-0000"
                  mask="(##) ####-####"
                  v-model="formData.phone"
                  :disabled="isDeletingCustomer"
               >
               </v-mask-input>
            </div>
         </v-col>

         <v-col cols="12" md="3" class="pt-0 pb-1">
            <div class="d-flex flex-column">
               <v-label for="email-input" class="mb-0">E-mail</v-label>
               <v-text-field
                  hide-details
                  id="email-input"
                  density="compact"
                  type="email"
                  v-model="formData.email"
                  :disabled="isDeletingCustomer"
                  :rules="CustomerRules.email"
               >
               </v-text-field>
            </div>
         </v-col>

         <v-col cols="12" md="2" class="pt-0 pb-2">
            <div class="d-flex flex-column">
               <v-label for="cep-input" class="mb-0">CEP</v-label>
               <v-mask-input
                  v-model="formData.address!.cep"
                  hide-details
                  id="cep-input"
                  density="compact"
                  placeholder="00000-000"
                  :disabled="isDeletingCustomer"
               >
               </v-mask-input>
            </div>
         </v-col>

         <v-col cols="12" md="2" class="pt-0 pb-2">
            <div class="d-flex flex-column">
               <v-label for="uf-input" class="mb-0">UF</v-label>
               <v-autocomplete
                  hide-details
                  id="uf-input"
                  density="compact"
                  v-model="formData.address!.uf"
                  :items="stateItems"
                  :disabled="isDeletingCustomer"
               ></v-autocomplete>
            </div>
         </v-col>

         <v-col cols="12" md="4" class="pt-0 pb-2">
            <div class="d-flex flex-column">
               <v-label for="city-input" class="mb-0">Cidade</v-label>
               <v-text-field
                  hide-details
                  id="city-input"
                  density="compact"
                  v-model="formData.address!.city"
                  :disabled="isDeletingCustomer"
               >
               </v-text-field>
            </div>
         </v-col>

         <v-col cols="12" md="2" class="pt-0 pb-2">
            <div class="d-flex flex-column">
               <v-label for="govIdentifier-input" class="mb-0">{{
                  govIdentifierLabel
               }}</v-label>
               <v-mask-input
                  hide-details
                  id="govIdentifier-input"
                  density="compact"
                  v-model="formData.govIdentifier"
                  :placeholder="govIdentifierPlaceholder"
                  :disabled="isDeletingCustomer"
                  :error="govIdentifierError"
                  :error-messages="govIdentifierMessages"
                  :mask="govIdentifierMask"
                  @blur="handleGovIdentifierBlur"
               >
               </v-mask-input>
            </div>
         </v-col>

         <v-col cols="12" md="2" class="pt-0 pb-2">
            <div class="d-flex flex-column">
               <v-label for="govDocument-input" class="mb-0">{{
                  govDocumentLabel
               }}</v-label>
               <v-mask-input
                  hide-details
                  id="govDocument-input"
                  density="compact"
                  v-model="formData.govDocument"
                  :placeholder="
                     formData.type == Person.NATURAL ? '00.000.000-0' : ''
                  "
                  :mask="govDocumentMask"
                  :disabled="isDeletingCustomer"
                  :error="govDocumentError"
                  :error-messages="govDocumentMessages"
                  @blur="handleGovDocumentBlur"
               >
               </v-mask-input>
            </div>
         </v-col>

         <v-col cols="12" md="5" class="pt-0 pb-2">
            <div class="d-flex flex-column">
               <v-label for="street-input" class="mb-0">Rua</v-label>
               <v-text-field
                  hide-details
                  id="street-input"
                  density="compact"
                  v-model="formData.address!.street"
                  :disabled="isDeletingCustomer"
               >
               </v-text-field>
            </div>
         </v-col>

         <v-col cols="12" md="5" class="pt-0 pb-2">
            <div class="d-flex flex-column">
               <v-label for="district-input" class="mb-0">Bairro</v-label>
               <v-text-field
                  hide-details
                  id="district-input"
                  density="compact"
                  v-model="formData.address!.district"
                  :disabled="isDeletingCustomer"
               >
               </v-text-field>
            </div>
         </v-col>

         <v-col cols="12" md="2" class="pt-0 pb-2">
            <div class="d-flex flex-column">
               <v-label for="unit-input" class="mb-0">Nº/Apto</v-label>
               <v-text-field
                  hide-details
                  id="unit-input"
                  density="compact"
                  v-model="formData.address!.unit"
                  :disabled="isDeletingCustomer"
               >
               </v-text-field>
            </div>
         </v-col>
      </v-row>
   </v-form>
</template>

<script setup lang="ts">
import { injectStrict } from "../../../utils/injectionUtils"
import { CustomerKeys } from "../providers/customerKeys"
import { CustomerRules } from "../rules/customer-rules"
import { PersonType } from "../models/constants/CustomerType"
import { computed, ref, type Ref, onMounted } from "vue"
import { ActionForm } from "@src/data/enums/ActionForm"
import { Customer } from "electron/main/entities/customer"
import { CustomerForm } from "../types/customer-form"
import { Person } from "@shared/enums/person"

const customerSelected = injectStrict(CustomerKeys.customerSelected)
const customerSelectedAction = injectStrict(CustomerKeys.customerSelectedAction)
const customerSelectedLoading = injectStrict(
   CustomerKeys.customerSelectedLoading
)

const formCustomerValid = defineModel<boolean>("valid", {
   default: () => false,
})
const formData: Ref<CustomerForm> = ref({
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

const govIdentifierMask = computed(() => {
   if (formData.value.type === Person.NATURAL) {
      return "###.###.###-##"
   } else if (formData.value.type === Person.LEGAL) {
      return "##.###.###/####-##"
   }
   return ""
})

const govIdentifierPlaceholder = computed(() => {
   if (formData.value.type === Person.NATURAL) {
      return "000.000.000-00"
   } else if (formData.value.type === Person.LEGAL) {
      return "00.000.000/0000-00"
   }
   return ""
})

const govDocumentMask = computed(() => {
   if (formData.value.type === Person.NATURAL) {
      return "##.###.###-N"
   }
   return ""
})

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

const govIdentifierLabel = computed(() => {
   if (!formData.value.type) {
      return "Registro"
   }
   return formData.value.type === 1 ? "CPF" : "CNPJ"
})

const govDocumentLabel = computed(() => {
   if (!formData.value.type) {
      return "Documento"
   }
   return formData.value.type === 1 ? "RG" : "Inscrição Estadual"
})

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
</script>
