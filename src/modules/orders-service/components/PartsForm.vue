<template>
   <v-sheet class="pa-4">
      <v-table height="425px" class="parts-table" density="compact">
         <thead>
            <tr>
               <th class="text-center" style="width: 40px"></th>
               <th class="text-left" style="width: 60%">
                  <v-label>Descrição *</v-label>
               </th>
               <th class="text-left" style="width: 20%">
                  <v-label>Quantidade *</v-label>
               </th>
               <th class="text-left" style="width: 20%">
                  <v-label>Valor Unitário *</v-label>
               </th>
            </tr>
         </thead>
         <tbody>
            <tr v-for="(part, index) in parts" :key="index">
               <td class="pa-2 text-center">
                  <v-icon
                     v-if="getPartIcon(part)"
                     :icon="getPartIcon(part)?.icon"
                     color="grey-darken-1"
                  />
               </td>
               <td class="pa-2">
                  <v-text-field
                     v-model="part.description"
                     density="compact"
                     hide-details
                     placeholder="Descrição da peça"
                     @input="checkLastRowFilled"
                  />
               </td>
               <td class="pa-2 text-left">
                  <v-text-field
                     v-model="part.quantity"
                     density="compact"
                     hide-details
                     placeholder="0"
                     inputmode="numeric"
                     @input="
                        (event: Event) => handleQuantityInput(event, index)
                     "
                     @blur="() => formatQuantityOnBlur(index)"
                  />
               </td>
               <td class="pa-2 text-right">
                  <v-text-field
                     v-model="part.price"
                     density="compact"
                     hide-details
                     placeholder="0,00"
                     inputmode="decimal"
                     @input="(event: Event) => handlePriceInput(event, index)"
                     @blur="() => formatPriceOnBlur(index)"
                  />
               </td>
            </tr>
         </tbody>
      </v-table>

      <div v-if="parts.length > 0" class="mt-3 text-right">
         <strong>Total: R$ {{ totalPrice }}</strong>
      </div>
   </v-sheet>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue"

interface PartItem {
   description: string
   quantity: string | null
   price: string | null
}

const INITIAL_EMPTY_ROWS = 5
const parts = ref<PartItem[]>(
   Array.from({ length: INITIAL_EMPTY_ROWS }, () => ({
      description: "",
      quantity: "",
      price: "",
   }))
)

const totalPrice = computed(() => {
   return parts.value
      .filter((part) => {
         const hasDescription =
            part.description && part.description.trim().length > 0
         const hasQuantity =
            part.quantity &&
            part.quantity.trim().length > 0 &&
            convertToNumber(part.quantity) > 0
         const hasPrice =
            part.price &&
            part.price.trim().length > 0 &&
            convertPriceToNumber(part.price) > 0
         return hasDescription && hasQuantity && hasPrice
      })
      .reduce((sum, part) => {
         const quantity = convertToNumber(part.quantity)
         const price = convertPriceToNumber(part.price)
         return sum + quantity * price
      }, 0)
      .toLocaleString("pt-BR", {
         minimumFractionDigits: 2,
         maximumFractionDigits: 2,
      })
})

const convertToNumber = (value: string | null): number => {
   if (!value || typeof value !== "string") return 0
   return parseInt(value, 10) || 0
}

const convertPriceToNumber = (price: string | null): number => {
   if (!price || typeof price !== "string") return 0
   return parseFloat(price.replace(",", ".")) || 0
}

const isPartValid = (part: PartItem): boolean => {
   const hasDescription =
      !!part.description && part.description.trim().length > 0
   const hasQuantity =
      !!part.quantity &&
      part.quantity.trim().length > 0 &&
      convertToNumber(part.quantity) > 0
   const hasPrice =
      !!part.price &&
      part.price.trim().length > 0 &&
      convertPriceToNumber(part.price) > 0
   return hasDescription && hasQuantity && hasPrice
}

const isPartEmpty = (part: PartItem): boolean => {
   const hasDescription = part.description && part.description.trim().length > 0
   const hasQuantity =
      part.quantity &&
      part.quantity.trim().length > 0 &&
      convertToNumber(part.quantity) > 0
   const hasPrice =
      part.price &&
      part.price.trim().length > 0 &&
      convertPriceToNumber(part.price) > 0
   return !hasDescription && !hasQuantity && !hasPrice
}

const getPartIcon = (
   part: PartItem
): { icon: string; color: string } | null => {
   const hasDescription = part.description && part.description.trim().length > 0
   const hasQuantity =
      part.quantity &&
      part.quantity.trim().length > 0 &&
      convertToNumber(part.quantity) > 0
   const hasPrice =
      part.price &&
      part.price.trim().length > 0 &&
      convertPriceToNumber(part.price) > 0

   const filledFields = [hasDescription, hasQuantity, hasPrice].filter(
      Boolean
   ).length

   // Se todos os campos estão preenchidos
   if (filledFields === 3) {
      return { icon: "mdi-check-circle", color: "success" }
   }

   // Se alguns campos estão preenchidos
   if (filledFields > 0) {
      return { icon: "mdi-alert", color: "warning" }
   }

   // Se nenhum campo está preenchido
   return null
}

const isLastRowFilled = (): boolean => {
   if (parts.value.length === 0) return false
   const lastRow = parts.value[parts.value.length - 1]
   return isPartValid(lastRow)
}

const checkLastRowFilled = (): void => {
   if (isLastRowFilled()) {
      parts.value.push({
         description: "",
         quantity: "",
         price: "",
      })
   }
}

const handleQuantityInput = (event: Event, index: number): void => {
   const input = event.target as HTMLInputElement
   let value = input.value

   // Remove qualquer caractere que não seja dígito
   value = value.replace(/[^0-9]/g, "")

   parts.value[index].quantity = value
   checkLastRowFilled()
}

const formatQuantityOnBlur = (index: number): void => {
   const quantity = parts.value[index].quantity

   // Se o campo está vazio, deixa vazio
   if (!quantity || quantity.trim() === "") {
      parts.value[index].quantity = ""
      return
   }

   // Garante que é um número inteiro válido
   const numValue = parseInt(quantity, 10)
   if (numValue > 0) {
      parts.value[index].quantity = numValue.toString()
   } else {
      parts.value[index].quantity = ""
   }
}

const handlePriceInput = (event: Event, index: number): void => {
   const input = event.target as HTMLInputElement
   let value = input.value

   // Remove qualquer caractere que não seja dígito ou vírgula
   value = value.replace(/[^0-9,]/g, "")

   // Garante que existe apenas uma vírgula
   if (value !== "") {
      const valueParts = value.split(",")
      if (valueParts.length > 2) {
         value = valueParts[0] + "," + valueParts[1]
      }
   }

   parts.value[index].price = value
   checkLastRowFilled()
}

const formatPriceOnBlur = (index: number): void => {
   const price = parts.value[index].price

   if (!price || price.trim() === "") {
      parts.value[index].price = ""
      return
   }

   let formattedPrice = price

   if (!formattedPrice.includes(",")) {
      formattedPrice += ",00"
   } else {
      const priceParts = formattedPrice.split(",")
      const integerPart = priceParts[0]
      const decimalPart = priceParts[1] || ""

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

   parts.value[index].price = formattedPrice
}

const getParts = (): PartItem[] => {
   return parts.value.filter(
      (part) =>
         (part.description && part.description.trim().length > 0) ||
         (part.quantity &&
            part.quantity.trim().length > 0 &&
            convertToNumber(part.quantity) > 0) ||
         (part.price &&
            part.price.trim().length > 0 &&
            convertPriceToNumber(part.price) > 0)
   )
}

defineExpose({
   parts,
   getParts,
   setParts: (newParts: PartItem[]) => {
      parts.value = [
         ...newParts,
         ...Array.from(
            {
               length: Math.max(0, INITIAL_EMPTY_ROWS - newParts.length),
            },
            () => ({
               description: "",
               quantity: "",
               price: "",
            })
         ),
      ]
   },
})
</script>

<style scoped>
.parts-table {
   background-color: transparent;
}

:deep(.parts-table tbody tr) {
   border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

:deep(.parts-table tbody tr:hover) {
   background-color: rgba(0, 0, 0, 0.02);
}
</style>
