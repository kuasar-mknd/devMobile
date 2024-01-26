<template>
  <ion-page>
  <ion-header>
    <ion-toolbar>
      <ion-row class="ion-justify-content-center">
        <ion-col>
          <ion-img
            src="/homegardenLogo_transparent-resize.png"
            alt="logo de homegarden, plante centrale à 3 feuilles avec le titre homegarden dessous"
          >
          </ion-img>
        </ion-col>
      </ion-row>
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
  IonContent,
  IonRow,
  IonCol,
  IonImg,
} from "@ionic/vue";
import CardMapContainer from "@/components/CardMapContainer.vue";
import { ref, onMounted, nextTick, onUpdated, onUnmounted } from "vue";

export default {
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonContent,
    CardMapContainer,
    IonRow,
    IonCol,
    IonImg,
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
