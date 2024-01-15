<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Jardin</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <ion-button @click="openCreateGardenModal">Créer un jardin</ion-button>
        <CreateGardenModal v-if="showModal" @close="showModal = false" />
      </ion-content>
    </ion-page>
  </template>
  
<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton,  } from '@ionic/vue';
import CreateGardenModal from '@/components/CreateGardenModal.vue';
import { ref } from 'vue';

export default {
  components: {
    IonButton,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    CreateGardenModal, // Le composant modal pour créer un jardin
  },
  setup() {
    const showModal = ref(false);

    const openCreateGardenModal = () => {
      console.log(showModal.value);
      showModal.value = true;
    };

    return {
      showModal,
      openCreateGardenModal
    };
  }
};
</script>

<style>

</style>