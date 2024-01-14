<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Jardin</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <ButtonPicture/>
        <AreaInfoPlant/>
      </ion-content>
    </ion-page>
  </template>
  
<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ButtonPicture from '@/components/ButtonPicture.vue';
import AreaInfoPlant from '@/components/AreaInfoPlant.vue';
</script>

<style>
/* Style personnalisé pour la carte, si nécessaire */
</style>