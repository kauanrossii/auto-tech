<template>
   <v-sheet class="w-100 h-100 d-flex justify-center">
      <v-card class="w-100" max-width="900">
         <v-toolbar flat class="bg-white">
            <v-toolbar-title>Configurações</v-toolbar-title>

            <v-spacer></v-spacer>

            <template v-if="!isEditing">
               <v-btn
                  variant="elevated"
                  rounded="sm"
                  color="primary"
                  text="Editar"
                  @click="startEditing"
               ></v-btn>
            </template>

            <template v-else>
               <v-btn
                  class="me-2"
                  variant="text"
                  rounded="sm"
                  text="Cancelar"
                  @click="cancelEditing"
               ></v-btn>
               <v-btn
                  variant="elevated"
                  rounded="sm"
                  color="primary"
                  text="Confirmar"
                  :loading="saving"
                  :disabled="saving"
                  @click="confirmEditing"
               ></v-btn>
            </template>
         </v-toolbar>

         <v-divider></v-divider>

         <v-card-text class="pt-6">
            <v-row>
               <v-col cols="12">
                  <div class="d-flex flex-column">
                     <v-label for="photo-input" class="mb-0">Foto</v-label>
                     <v-file-input
                        id="photo-input"
                        v-model="photoFiles"
                        prepend-icon=""
                        prepend-inner-icon="mdi-camera"
                        accept="image/*"
                        variant="outlined"
                        :disabled="!isEditing"
                        :clearable="isEditing"
                        @update:modelValue="onPhotoSelected"
                     ></v-file-input>
                  </div>
               </v-col>

               <v-col cols="12">
                  <div class="d-flex flex-column">
                     <v-label for="companyName-input" class="mb-0"
                        >Nome da Empresa</v-label
                     >
                     <v-text-field
                        id="companyName-input"
                        v-model="companyName"
                        variant="outlined"
                        prepend-inner-icon="mdi-domain"
                        :disabled="!isEditing"
                     ></v-text-field>
                  </div>
               </v-col>
            </v-row>
         </v-card-text>
      </v-card>
   </v-sheet>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useSystemConfigurationComposable } from "@src/modules/configurations/composables/systemConfigurationComposable"

const { systemConfiguration, load, save } = useSystemConfigurationComposable()

const isEditing = ref(false)
const saving = ref(false)

const companyName = ref<string>("")
const photoDataUrl = ref<string | null>(null)
const photoFileName = ref<string | null>(null)
const photoFiles = ref<File | File[] | null>(null)

async function dataUrlToFile(
   dataUrl: string,
   fileName: string
): Promise<File> {
   const res = await fetch(dataUrl)
   const blob = await res.blob()
   return new File([blob], fileName, { type: blob.type || "image/*" })
}

function applyFromStoreStrings() {
   companyName.value = systemConfiguration.value?.companyName ?? ""
   photoDataUrl.value = systemConfiguration.value?.photoDataUrl ?? null
   photoFileName.value = systemConfiguration.value?.photoFileName ?? null
}

async function refreshPhotoFileInput() {
   const url = photoDataUrl.value
   const name = photoFileName.value?.trim() || null

   if (!url) {
      photoFiles.value = null
      return
   }

   const displayName = name || "imagem-salva.png"
   try {
      photoFiles.value = await dataUrlToFile(url, displayName)
   } catch {
      photoFiles.value = null
   }
}

const startEditing = () => {
   isEditing.value = true
}

const cancelEditing = async () => {
   isEditing.value = false
   applyFromStoreStrings()
   await refreshPhotoFileInput()
}

const confirmEditing = async () => {
   saving.value = true
   try {
      await save({
         companyName: companyName.value.trim() || null,
         photoDataUrl: photoDataUrl.value || null,
         photoFileName: photoFileName.value?.trim() || null,
      })
      isEditing.value = false
      applyFromStoreStrings()
      await refreshPhotoFileInput()
   } finally {
      saving.value = false
   }
}

const onPhotoSelected = async (files: File[] | File | null) => {
   if (!isEditing.value) return

   const file = Array.isArray(files) ? files[0] : (files ?? null)
   if (!file) {
      photoDataUrl.value = null
      photoFileName.value = null
      return
   }

   const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(String(reader.result ?? ""))
      reader.onerror = () => reject(new Error("Falha ao ler a imagem."))
      reader.readAsDataURL(file)
   })

   photoDataUrl.value = dataUrl
   photoFileName.value = file.name
}

onMounted(async () => {
   await load()
   applyFromStoreStrings()
   await refreshPhotoFileInput()
})
</script>
