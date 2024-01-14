<template>
    <ion-content>
    <ion-button @click="fileInput && fileInput.click()">
        <ion-icon :icon="cameraIcon" slot="start"></ion-icon>
        Add Picture
      </ion-button>

      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref="fileInput"
        @change="handleFileChange"
        hidden
      />
    </ion-content>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { cameraOutline } from 'ionicons/icons';
  
  const fileInput = ref<HTMLInputElement | null>(null);
  
  const cameraIcon = cameraOutline;
  
  const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const file = input.files[0];
      console.log(file);
      input.value = '';
    }
  };
  </script>
  
  <style>
  </style>
  