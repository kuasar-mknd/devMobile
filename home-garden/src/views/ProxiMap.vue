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
      <CardMapContainer ref="cardMapContainerRef" :gardenMap="true"/>
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
import { ref, onMounted, nextTick, onUpdated } from "vue";
import { useStore } from "vuex";

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
    const store = useStore();

    const loadGardens = async () => {
      try {
        await store.dispatch("getGardensByUserId");
        store.state.garden.gardens.forEach((garden: any) => {});
      } catch (error) {
        console.error("Erreur lors du chargement des jardins:", error);
      }
    };

    onMounted(() => {
      loadGardens();
      // Utilisez nextTick pour s'assurer que tous les enfants sont montés
      nextTick(() => {
        if (cardMapContainerRef.value) {
          cardMapContainerRef.value.invalidateMapSize();
        }
      });
    });

    onUpdated(() => {
      loadGardens();
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
<style scoped>
.class-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

ion-col {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.titre {
  margin-left: 25px;
}

.titrePage {
  margin-top: 15%;
  color: #37aa9f;
}

.button-fixed {
  position: fixed; /* Fixe la position du bouton */
  bottom: 20px; /* 20 pixels depuis le bas de la page */
  /* 20 pixels depuis la droite de la page */
  z-index: 1000; /* S'assure que le bouton soit au-dessus des autres éléments */
}
</style>
