<template>
    <ion-modal :is-open="isOpen" @ionModalDidDismiss="handleDismiss">
      <ion-header translucent>
        <ion-toolbar>
          <ion-title>Créer un jardin</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="handleDismiss">Fermer</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding">
        <ion-item>
          <ion-label position="floating">Nom du jardin</ion-label>
          <ion-input v-model="gardenName" type="text"></ion-input>
        </ion-item>
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
  IonContent, IonItem, IonLabel, IonInput
} from '@ionic/vue';

import { ref, getCurrentInstance, defineComponent, onMounted, nextTick, computed } from 'vue';

import CardMapContainer from '@/components/CardMapContainer.vue';

import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
    components: {
        IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, 
        IonContent, IonItem, IonLabel, IonInput, CardMapContainer,
    },
    setup(_, { emit }) {
        const isOpen = ref(true); // You can control the visibility with this ref
        const gardenName = ref('');
        const gardenLocation = ref([]);
        const cardMapContainerRef = ref(null);
        const { proxy } = getCurrentInstance();
        const store = useStore();
        const authError = computed(() => store.state.auth.authError);

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
            console.log(gardenName.value, gardenLocation.value); 
            const userData = {
                name: gardenName.value,
                location: gardenLocation.value,
            };
            console.log(userData);
            await store.dispatch('addGarden', userData);
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
        updateGardenLocation 
        };
    }
});
</script>

<style scoped>

.map-container{
    height: 300px;
}

/* You may want to add additional global styles */
</style>
