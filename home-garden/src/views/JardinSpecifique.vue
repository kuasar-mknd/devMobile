<template>
    <ion-page class="ion-margin-horizontal">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>Back Button</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true" class="content">
            
            <ion-grid>
                <ion-row class="ion-justify-content-center">
                    <ion-col size="3">
                        <ion-img
                        src="../../resources/homegardenLogo_transparent-resize.png"
                        alt="logo de homegarden, plante centrale à 3 feuilles avec le titre homegarden dessous">
                    </ion-img>
                </ion-col>
            </ion-row>
        </ion-grid>
        
        
        <ion-grid>
            <ion-row>
                <ion-col>
                    <div class="map-container">
                        <CardMapContainer ref="cardMapContainer" :gardenLocation="gardenLocation" @update:location="updateGardenLocation"/>
                    </div>
                </ion-col>
                <ion-col size="auto">
                    <div style="width: 150px">
                    <MeteoComponent></MeteoComponent>
                    </div>
                </ion-col>
            </ion-row>
        </ion-grid>
        
        <ion-title color="tertiary" class="ion-text-start ion-margin-bottom">Jardin au Chalet</ion-title>        
        <ion-grid>
            <ion-row class="ion-justify-content-center">
                <ion-col size="3">
                    <ButtonAdd></ButtonAdd>
                </ion-col>
            </ion-row>
        </ion-grid>
    </ion-content>
</ion-page>
</template>



<script lang="ts">
import { IonBackButton, IonButtons, IonHeader, IonToolbar, IonGrid, IonPage,IonRow, IonCol,IonImg,IonTitle, IonContent,IonText } from '@ionic/vue';
import ButtonAdd from '../components/ButtonAdd.vue';
import { useRouter } from 'vue-router';
import CardMapContainer from "../components/CardMapContainer.vue";
import MeteoComponent from '@/components/MeteoComponent.vue';
import { ref, getCurrentInstance, onMounted, nextTick, computed } from 'vue';
import { useStore } from 'vuex';

export default {
    components: {
        MeteoComponent,
        CardMapContainer,
        IonBackButton, 
        IonButtons, 
        IonHeader, 
        IonTitle, 
        IonToolbar,
        IonGrid,
        IonRow,
        IonCol,
        IonImg,
        IonPage,
        IonContent,
        ButtonAdd,
    },
    setup(_, { emit }) {
        
        const router = useRouter(); 
        
        const goToJardinSpecifique = () => {
            router.push({ name: 'JardinSpecifique' }); // Use the correct route name or path
        }; 
        
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
            goToJardinSpecifique,
            updateGardenLocation 
        };
    }
}

</script>

<style>
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

.map-container{
    height: 300px;
    width: 100%;
}

</style>