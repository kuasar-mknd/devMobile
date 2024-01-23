<template>
    <ion-page>
      <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button>
                    </ion-back-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
      <ion-content>
        <ion-toolbar>
          <div class="logo-container">
            <ion-img class="logo" src="../../resources/icon.png"></ion-img>
          </div>
        </ion-toolbar> 

        <div class="image-container" v-if="imageUrl">
        <ion-img class="image" :src="imageUrl"></ion-img>
      </div>
          

      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
 import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent, IonImg } from '@ionic/vue';
    import { ref, onMounted, computed } from 'vue';
    import { useStore } from 'vuex';
    import { useRouter } from 'vue-router';
  // repcuperer l'id de la plante et la passer en props pour afficher les infos de la plante en question 

  const router = useRouter();
    const id = router.currentRoute.value.params.id;
    console.log(id);
    const store = useStore();
    const plant = computed(() => store.state.plant.plants.find((plant) => plant.id === id));
    console.log(plant.value);
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
const gardenIdFromUrl = ref('');
const idPlant = ref('');

    const loadPlant = async () => {
      try {
        await store.dispatch('getPlant', id);
        const loadedPlant = store.state.plant.plants.find((plant) => plant.id === id);
        if (loadedPlant) {
          commonName.value = loadedPlant.commonName;
          scientificName.value = loadedPlant.scientificName;
          family.value = loadedPlant.family;
          origin.value = loadedPlant.origin;
          exposure.value = loadedPlant.exposure;
          watering.value = loadedPlant.watering;
          soilType.value = loadedPlant.soilType;
          flowerColor.value = loadedPlant.flowerColor;
          height.value = loadedPlant.height;
          bloomingSeason.value = loadedPlant.bloomingSeason;
          plantingSeason.value = loadedPlant.plantingSeason;
          care.value = loadedPlant.care;
          imageUrl.value = loadedPlant.imageUrl;
          use.value = loadedPlant.use;
          gardenIdFromUrl.value = loadedPlant.gardenId;
          idPlant.value = loadedPlant.id;

       
        }
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
  