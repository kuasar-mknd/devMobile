<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Carte</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <CardMapContainer ref="cardMapContainerRef" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import CardMapContainer from "@/components/CardMapContainer.vue";
import { ref, onMounted, nextTick, onUpdated, onUnmounted } from "vue";

export default {
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    CardMapContainer,
  },
  setup() {
    const cardMapContainerRef = ref(null);

    onMounted(() => {
      // Utilisez nextTick pour s'assurer que tous les enfants sont montés
      nextTick(() => {
        if (cardMapContainerRef.value) {
          cardMapContainerRef.value.invalidateMapSize();
        }
      });
    });

    onUpdated(() => {
      // Utilisez nextTick pour s'assurer que tous les enfants sont montés
      nextTick(() => {
        if (cardMapContainerRef.value) {
          cardMapContainerRef.value.invalidateMapSize();
        }
      });
    });

    return {
      cardMapContainerRef,
    };
  },
};
</script>
