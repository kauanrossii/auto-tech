import { ref } from "vue"
import type { Ref } from "vue"
import type { SystemConfigurationDto } from "@shared/interfaces/system-configurations/system-configuration.dto"
import type { UpdateSystemConfigurationDto } from "@shared/interfaces/system-configurations/update-system-configuration.dto"

const systemConfiguration: Ref<SystemConfigurationDto | null> = ref(null)
const loadedOnce = ref(false)

export function useSystemConfigurationComposable() {
   async function load(force = false): Promise<SystemConfigurationDto | null> {
      if (!force && loadedOnce.value) return systemConfiguration.value

      const result = await window.management.getSystemConfiguration()
      systemConfiguration.value = result
      loadedOnce.value = true
      return result
   }

   async function save(
      dto: UpdateSystemConfigurationDto
   ): Promise<SystemConfigurationDto> {
      const result = await window.management.upsertSystemConfiguration(dto)
      systemConfiguration.value = result
      loadedOnce.value = true
      return result
   }

   return {
      systemConfiguration,
      load,
      save,
   }
}

