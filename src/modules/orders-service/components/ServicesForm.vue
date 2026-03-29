<template>
   <v-sheet>
      <v-table class="services-table" density="compact">
         <thead>
            <tr>
               <th class="text-center" style="width: 40px"></th>
               <th class="text-left w-75">
                  <v-label>Descrição *</v-label>
               </th>
               <th class="text-right w-25">
                  <v-label>Valor *</v-label>
               </th>
            </tr>
         </thead>
         <tbody>
            <tr v-for="(service, index) in services" :key="service.id">
               <td class="pa-2 text-center">
                  <v-icon
                     v-if="getServiceIcon(service)"
                     :icon="getServiceIcon(service)?.icon"
                     color="grey-darken-1"
                  />
               </td>
               <td class="pa-2">
                  <v-text-field
                     v-model="service.description"
                     variant="outlined"
                     density="compact"
                     hide-details
                     placeholder="Descrição do serviço"
                     :disabled="readonly"
                     @input="ensureGrowWhenLastRowComplete"
                  />
               </td>
               <td class="pa-2 text-right">
                  <v-text-field
                     v-model="service.price"
                     variant="outlined"
                     density="compact"
                     hide-details
                     placeholder="0,00"
                     inputmode="decimal"
                     :disabled="readonly"
                     @input="(event: Event) => handlePriceInput(event, index)"
                     @blur="() => formatPriceOnBlur(index)"
                  />
               </td>
            </tr>
         </tbody>
      </v-table>

      <div v-if="services.length > 0" class="pt-12 text-right">
         <strong>Total: R$ {{ totalPrice }}</strong>
      </div>
   </v-sheet>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue"

withDefaults(
   defineProps<{
      readonly?: boolean
   }>(),
   { readonly: false }
)

interface ServiceItem {
   id: string
   description: string
   price: string | null
}

type ServiceItemPayload = {
   description: string
   price: string | null
}

const newRowId = (): string => crypto.randomUUID()

const createEmptyRow = (): ServiceItem => ({
   id: newRowId(),
   description: "",
   price: "",
})

const INITIAL_EMPTY_ROWS = 5
const services = ref<ServiceItem[]>(
   Array.from({ length: INITIAL_EMPTY_ROWS }, () => createEmptyRow())
)

const totalPrice = computed(() => {
   return services.value
      .filter((service) => {
         const hasDescription =
            service.description && service.description.trim().length > 0
         const hasPrice =
            service.price &&
            service.price.trim().length > 0 &&
            convertPriceToNumber(service.price) > 0
         return hasDescription && hasPrice
      })
      .reduce((sum, service) => {
         const price = convertPriceToNumber(service.price)
         return sum + price
      }, 0)
      .toLocaleString("pt-BR", {
         minimumFractionDigits: 2,
         maximumFractionDigits: 2,
      })
})

const convertPriceToNumber = (price: string | null): number => {
   if (!price || typeof price !== "string") return 0
   return parseFloat(price.replace(",", ".")) || 0
}

const isServiceValid = (service: ServiceItem): boolean => {
   const hasDescription =
      !!service.description && service.description.trim().length > 0
   const hasPrice =
      !!service.price &&
      service.price.trim().length > 0 &&
      convertPriceToNumber(service.price) > 0
   return hasDescription && hasPrice
}

const getServiceIcon = (
   service: ServiceItem
): { icon: string; color: string } | null => {
   const hasDescription =
      service.description && service.description.trim().length > 0
   const hasPrice =
      service.price &&
      service.price.trim().length > 0 &&
      convertPriceToNumber(service.price) > 0

   if (hasDescription && hasPrice) {
      return { icon: "mdi-check-circle", color: "success" }
   }

   if (hasDescription || hasPrice) {
      return { icon: "mdi-alert", color: "warning" }
   }

   return null
}

const isLastRowFilled = (): boolean => {
   if (services.value.length === 0) return false
   const lastRow = services.value[services.value.length - 1]
   return isServiceValid(lastRow)
}

const ensureGrowWhenLastRowComplete = (): void => {
   if (isLastRowFilled()) {
      services.value.push(createEmptyRow())
   }
}

const handlePriceInput = (event: Event, index: number): void => {
   const input = event.target as HTMLInputElement
   let value = input.value

   value = value.replace(/[^0-9,]/g, "")

   if (value !== "") {
      const parts = value.split(",")
      if (parts.length > 2) {
         value = parts[0] + "," + parts[1]
      }
   }

   services.value[index].price = value
   ensureGrowWhenLastRowComplete()
}

const formatPriceOnBlur = (index: number): void => {
   const price = services.value[index].price

   if (!price || price.trim() === "") {
      services.value[index].price = ""
      return
   }

   let formattedPrice = price

   if (!formattedPrice.includes(",")) {
      formattedPrice += ",00"
   } else {
      const parts = formattedPrice.split(",")
      const integerPart = parts[0]
      const decimalPart = parts[1] || ""

      if (decimalPart.length === 0) {
         formattedPrice = integerPart + ",00"
      } else if (decimalPart.length === 1) {
         formattedPrice = integerPart + "," + decimalPart + "0"
      } else if (decimalPart.length > 2) {
         const firstTwoDecimals = decimalPart.substring(0, 2)
         const remainingDecimals = decimalPart.substring(2)

         if (remainingDecimals.match(/^0+$/)) {
            formattedPrice = integerPart + "," + firstTwoDecimals
         }
      }
   }

   services.value[index].price = formattedPrice
}

const getServices = (): ServiceItemPayload[] => {
   return services.value
      .filter(
         (service) =>
            (service.description && service.description.trim().length > 0) ||
            (service.price &&
               service.price.trim().length > 0 &&
               convertPriceToNumber(service.price) > 0)
      )
      .map(({ description, price }) => ({ description, price }))
}

watch(
   services,
   () => {
      ensureGrowWhenLastRowComplete()
   },
   { deep: true }
)

defineExpose({
   services,
   getServices,
   setServices: (newServices: ServiceItemPayload[]) => {
      const mapped: ServiceItem[] = newServices.map((s) => ({
         id: newRowId(),
         description: s.description,
         price: s.price ?? "",
      }))
      const paddingCount =
         newServices.length === 0
            ? INITIAL_EMPTY_ROWS
            : Math.max(INITIAL_EMPTY_ROWS - newServices.length, 1)
      services.value = [
         ...mapped,
         ...Array.from({ length: paddingCount }, () => createEmptyRow()),
      ]
      ensureGrowWhenLastRowComplete()
   },
})
</script>

<style scoped>
.services-table {
   background-color: transparent;
}

:deep(.services-table tbody tr) {
   border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

:deep(.services-table tbody tr:hover) {
   background-color: rgba(0, 0, 0, 0.02);
}

.w-75 {
   width: 70%;
}

.w-25 {
   width: 30%;
}
</style>
