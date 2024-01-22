<template>
    <ion-page class="ion-margin-horizontal">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
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
        
        
        <ion-text color="tertiary">
            <h1 class="titre">{{ gardenName }}</h1>
        </ion-text>
        <ion-text >
            <p class="titre">{{ gardenLocation }}</p>
        </ion-text>

        <ButtonAdd @click="openCreateGardenModal"></ButtonAdd>
        <CreateGardenModal
            :isOpen="showModal"
            @close="closeModal"
            :isEditMode="true"
            :existingGarden="gardenToEdit"
        />

        
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
        
        
        <ion-text>
            <h1 class="titre">Mes plantes</h1>
        </ion-text>
        
        <ion-grid>
            <ion-row>
                <ion-col>
                    <SearchBar></SearchBar>
                </ion-col>
                <ion-col size="auto">
                    <div style="width: 150px">
                        <ButtonAdd></ButtonAdd>                    
                    </div>
                    </ion-col>
                </ion-row>
            </ion-grid>
            
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <CardPlant
                        class="plant-image"
                        imageSrc="../../resources/basilic.png"
                        watering="2 fois par semaine"
                        />
                    </ion-col>
                    <ion-col>
                        <CardPlant
                        imageSrc="../../resources/crop2.png"
                        watering="2 fois par semaine"
                        />
                    </ion-col>
                    <ion-col>
                        <CardPlant
                        imageSrc="../../resources/crop3.png"
                        watering="2 fois par semaine"
                        />
                    </ion-col>
                </ion-row>
            </ion-grid>
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <CardPlant
                        class="plant-image"
                        imageSrc="../../resources/crop4.png"
                        watering="2 fois par semaine"
                        />
                    </ion-col>
                    <ion-col>
                        <CardPlant
                        imageSrc="../../resources/crop5.png"
                        watering="2 fois par semaine"
                        />
                    </ion-col>
                    <ion-col>
                        <CardPlant
                        imageSrc="../../resources/basilic.png"
                        watering="2 fois par semaine"
                        />
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
import CreateGardenModal from '@/components/CreateGardenModal.vue';
import SearchBar from '@/components/SearchBar.vue';
import { ref, getCurrentInstance, onMounted, nextTick, computed, PropType } from 'vue';
import { useStore } from 'vuex';
import CardPlant from '@/components/CardPlant.vue';

export default {
    components: {
        CardPlant,
        SearchBar,
        IonText,
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
        CreateGardenModal,
    },
    props: {
        id:{
        type: String,
        default: ''
        }
    },
    setup(props, { emit }) {
        
        const router = useRouter(); 
        
        const isOpen = ref(true); // You can control the visibility with this ref
        const gardenName = ref('');
        const gardenLocation = ref([]);
        const gardenToEdit = ref({});
        const cardMapContainerRef = ref(null);
        const { proxy } = getCurrentInstance();
        const store = useStore();
        const showModal = ref(false);
        
        const updateGardenLocation = (newLocation) => {
            gardenLocation.value = newLocation;
        };

        const closeModal = async () => {
            await loadGarden();
            showModal.value = false;
        };


        
        
        const loadGarden = async () => {
            try {
                await store.dispatch('getGarden', props.id); 
                const loadedGarden = store.state.garden.gardens.find(garden => garden._id === props.id);
                if (loadedGarden) {
                    gardenName.value = loadedGarden.name; 
                    gardenLocation.value = loadedGarden.location.coordinates;
                    gardenToEdit.value = {
                        ...loadedGarden,
                        location: {
                            ...loadedGarden.location,
                            coordinates: gardenLocation.value
                        }
                    };
                }
            } catch (error) {
                console.error("Erreur lors du chargement du jardin", error);
            }
        };


        onMounted(() => {
            loadGarden().then(() => {
                nextTick(() => {
                if (cardMapContainerRef.value) {
                    cardMapContainerRef.value.invalidateMapSize();
                }
            });
            })
            // Utilisez nextTick pour s'assurer que tous les enfants sont montés
            
        });

        const openCreateGardenModal = async () => {
            await loadGarden();
            console.log(gardenToEdit.value);
            console.log(showModal.value);
            showModal.value = true;
        };
        
        return {
            isOpen,
            gardenName,
            gardenLocation,
            cardMapContainerRef,
            updateGardenLocation,
            openCreateGardenModal,
            showModal,
            gardenToEdit,
            closeModal 
        };
    }
}

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

.map-container{
    height: 300px;
    width: 100%;
}

.page-title {
    padding-left: 25px; /* Adjust as needed for alignment */
}

.titre {
    margin-left: 25px;
}

.plant-image {
  width: 100%; /* Makes the image take the full width of its container */
  height: auto; /* Maintains the aspect ratio */
}

</style>