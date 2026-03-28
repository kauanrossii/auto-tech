import type { Ref } from "vue"
import { onUnmounted } from "vue"
import type { AddressForm } from "../types/address-form"
import type { ViaCepResponse } from "../types/via-cep-response"
import { mapBrazilUfSiglaToStateName } from "../constants/brazil-uf-sigla-to-state-name"

const VIA_CEP_JSON_URL = (digits: string) =>
   `https://viacep.com.br/ws/${digits}/json/`

const DEBOUNCE_MS = 350

export function useViaCepAddress() {
   let cepLookupDebounce: ReturnType<typeof setTimeout> | null = null
   let lastViaCepAppliedDigits = ""
   let pendingAddress: AddressForm | null | undefined

   onUnmounted(() => {
      if (cepLookupDebounce) clearTimeout(cepLookupDebounce)
   })

   function onCepFieldChanged(
      rawCep: string,
      address: AddressForm | null | undefined,
      loading: Ref<boolean>
   ): void {
      pendingAddress = address
      if (cepLookupDebounce) {
         clearTimeout(cepLookupDebounce)
         cepLookupDebounce = null
      }
      const digits = (rawCep ?? "").replace(/\D/g, "")
      if (digits.length < 8) {
         lastViaCepAppliedDigits = ""
         return
      }
      if (digits.length > 8) return
      cepLookupDebounce = setTimeout(() => {
         cepLookupDebounce = null
         const addr = pendingAddress
         const digitsNow = (addr?.cep ?? "").replace(/\D/g, "")
         if (digitsNow.length !== 8) return
         void fetchViaCepAndFillAddress(digitsNow, addr, loading)
      }, DEBOUNCE_MS)
   }

   async function fetchViaCepAndFillAddress(
      requestedDigits: string,
      address: AddressForm | null | undefined,
      loading: Ref<boolean>
   ): Promise<void> {
      if (requestedDigits.length !== 8) return
      if (requestedDigits === lastViaCepAppliedDigits) return
      loading.value = true
      try {
         const res = await fetch(VIA_CEP_JSON_URL(requestedDigits))
         if (!res.ok) return
         const data = (await res.json()) as ViaCepResponse
         if (data.erro) {
            lastViaCepAppliedDigits = ""
            return
         }

         const currentDigits = (address?.cep ?? "").replace(/\D/g, "")
         if (currentDigits !== requestedDigits) return

         const addr = address
         if (!addr) return

         lastViaCepAppliedDigits = requestedDigits
         if (data.uf) {
            addr.uf = mapBrazilUfSiglaToStateName(data.uf)
         }
         if (data.localidade != null && data.localidade !== "") {
            addr.city = data.localidade
         }
         if (data.logradouro != null && data.logradouro !== "") {
            addr.street = data.logradouro
         }
         if (data.bairro != null && data.bairro !== "") {
            addr.district = data.bairro
         }
      } catch (e) {
         console.error("ViaCEP:", e)
      } finally {
         loading.value = false
      }
   }

   return {
      onCepFieldChanged,
   }
}
