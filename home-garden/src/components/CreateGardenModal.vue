<template>
    <ion-modal :is-open="isOpen" @ionModalDidDismiss="handleDismiss" class="modal-garden">
      <ion-header translucent>
        <ion-toolbar>
          <ion-title>Créer un jardin</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="handleDismiss">Fermer</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding">
        <ion-list class="gardenCreate-form">
        <ion-item>
          <ion-label position="stacked">Nom du jardin</ion-label>
          <ion-input v-model="gardenName" type="text"></ion-input>
        </ion-item>
        <div v-if="error" class="error-message">
            {{ error }}
        </div>
      </ion-list>
        <div class="map-container">
            <CardMapContainer ref="cardMapContainer" :gardenLocation="gardenLocation" @update:location="updateGardenLocation"/>
        </div>
        <ion-button expand="block" @click="createGarden">Créer</ion-button>
      </ion-content>
    </ion-modal>
  </template>

<script lang="ts">
import { 
  IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, 
  IonContent, IonItem, IonLabel, IonInput, IonList,
} from '@ionic/vue';

import { ref, getCurrentInstance, defineComponent, onMounted, nextTick, computed } from 'vue';

import CardMapContainer from '@/components/CardMapContainer.vue';

import { useStore } from 'vuex';

export default defineComponent({
    components: {
        IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, 
        IonContent, IonItem, IonLabel, IonInput, CardMapContainer, IonList,
    },
    setup(_, { emit }) {
        const isOpen = ref(true); // You can control the visibility with this ref
        const gardenName = ref('');
        const gardenLocation = ref([]);
        const cardMapContainerRef = ref(null);
        const { proxy } = getCurrentInstance();
        const store = useStore();
        const error = computed(() => store.state.garden.error);

        const handleDismiss = () => {
            close(); 
        };

        const close = () => {
            isOpen.value = false;
            if (proxy) {
                proxy.$emit('close'); // Émet l'événement 'close'
            }
        };

        const createGarden = async() => {
            const userData = {
                name: gardenName.value,
                location: {
                  type: 'Point',
                  coordinates: gardenLocation.value,
                },
            };
            await store.dispatch('addGarden', userData);
            console.log(store.state.garden.error)
            if (!error.value) {
                //close();
            }
        };

        const updateGardenLocation = (newLocation) => {
          gardenLocation.value = newLocation;
        };

        onMounted(() => {
        // Utilisez nextTick pour s'assurer que tous les enfants sont montés
            nextTick(() => {
                if (cardMapContainerRef.value) {
                cardMapContainerRef.value.invalidateMapSize();
                }
            });
        });

        return {
        isOpen,
        gardenName,
        gardenLocation,
        handleDismiss,
        createGarden,
        close,
        cardMapContainerRef,
        updateGardenLocation,
        error 
        };
    }
});
</script>

<style scoped>

.map-container{
    height: 300px;
}

.gardenCreate-form{
  width: 100%;
  padding-top: 5%;
  gap: 10px; 
}

.error-message {
  font-size: small;
    color: red;
  }

  ion-item {
--padding-start: 0;
--padding-end: 0;
--inner-padding-end: 0;
--inner-padding-start: 0;
--min-height: 40px;
margin-bottom: 1rem;
}

.modal-garden{
  height: auto;
}
</style>
