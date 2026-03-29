<template>
   <v-main class="d-flex flex-column flex-grow-1 overflow-hidden" style="min-height: 0">
      <v-sheet
         class="pa-4 d-flex flex-grow-1 justify-center overflow-y-auto"
         style="min-height: 0"
      >
         <router-view></router-view>
      </v-sheet>
   </v-main>
</template>

<script setup lang="ts"></script>
