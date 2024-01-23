<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-toolbar>
        <div class="logo-container">
          <ion-img class="logo" src="../../resources/icon.png"></ion-img>
        </div>
      </ion-toolbar>

      <div class="image-container" v-if="imageUrl !== ''">
        <ion-img class="image" :src="imageUrl"></ion-img>
      </div>
    </ion-content>
  </ion-page>
</template>

<script  lang="ts">
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent, IonImg } from '@ionic/vue';
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';



const router = useRouter();
const store = useStore();
//const gardenIdFromUrl = ref('');
const commonName = ref('');
const scientificName = ref('');
const family = ref('');
const origin = ref('');
const exposure = ref('');
const watering = ref('');
const soilType = ref('');
const flowerColor = ref('');
const height = ref('');
const bloomingSeason = ref('');
const plantingSeason = ref('');
const care = ref('');
const imageUrl = ref('');
const use = ref('');


const loadPlant = async () => {
  try{
    const plantId = router.currentRoute.value.params.id;
    const plant = await store.dispatch('plants/getPlant', plantId);
    commonName.value = plant.commonName;
    scientificName.value = plant.scientificName;
    family.value = plant.family;
    origin.value = plant.origin;
    exposure.value = plant.exposure;
    watering.value = plant.watering;
    soilType.value = plant.soilType;
    flowerColor.value = plant.flowerColor;
    height.value = plant.height;
    bloomingSeason.value = plant.bloomingSeason;
    plantingSeason.value = plant.plantingSeason;
    care.value = plant.care;
    imageUrl.value = plant.imageUrl;
    use.value = plant.use;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  loadPlant();
});

</script>
  
  <style>
  /* Style personnalisé pour la carte, si nécessaire */
  
  .logo {
    max-width: 200px; /* Ajustez la taille de votre logo */
    height: auto;
    margin-right: auto;
    margin-left: auto;
  }
  
  .image-container {
  margin-top: 20px; /* Ajustez la marge comme nécessaire */
}

.image {
  width: 100%; /* Ajustez la largeur comme nécessaire */
  height: auto; /* Ajustez la hauteur comme nécessaire */
}
  
  .ajouter-plant-text {
    text-align: left;
    color: #37AA9F;
    font-size: 24px;
    font-weight: bold;
    margin-left: 2rem;
    font-family: 'otomanopee_one' !important;

  }
    
  </style>
  