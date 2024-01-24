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
          <ion-img class="logo" src="/icon.png"></ion-img>
        </div>
      </ion-toolbar>
      <div class="image-container">
        <ion-img class="image" :src="decodeHtml(plants.imageUrl)"></ion-img>
      </div>
      <ion-text color="tertiary">
            <h1 class="titre">{{ plants.commonName }}</h1>
      </ion-text>
      <ion-label>
                <ion-buttons slot="end">
                    <AreaUpdateDeletePlant @delete-plant="deletePlant" @edit-plant="editPlant" class="btnUpdDel"/>
                </ion-buttons>
            </ion-label>
      <ion-text >
            <p class="titre">{{ plants.scientificName }}</p>
      </ion-text>
      <ion-text >
            <p class="titre">{{ plants.family }}</p>
      </ion-text>
      <DetailPlantSeason :season="plants.plantingSeason"></DetailPlantSeason>
      <DetailPlantHeight :height="plants.height"></DetailPlantHeight>
      <DetailPlantWatering :watering="plants.watering"></DetailPlantWatering>
      <DetailPlantExposition :exposure="plants.exposure"></DetailPlantExposition>
      <DetailPlantColor :color="plants.flowerColor"></DetailPlantColor>
      <DetailPlantBloom :bloomSeason="plants.bloomingSeason"></DetailPlantBloom>

    </ion-content>
  </ion-page>
</template>

<script  lang="ts">

import { IonContent, IonHeader, IonPage, IonToolbar, IonButtons, IonBackButton, IonImg } from '@ionic/vue';
import { defineComponent, ref, onMounted } from 'vue';
import DetailPlantBloom from '@/components/DetailPlantBloom.vue';
import DetailPlantHeight from '@/components/DetailPlantHeight.vue';
import DetailPlantSeason from '@/components/DetailPlantSeason.vue';
import DetailPlantWatering from '@/components/DetailPlantWatering.vue';
import DetailPlantExposition from '@/components/DetailPlantExposition.vue';
import DetailPlantColor from '@/components/DetailPlantColor.vue';
import AreaUpdateDeletePlant from '@/components/AreaUpdateDeletePlant.vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'DetailsPlante',
  components: { IonContent, IonHeader, IonPage, IonToolbar, IonButtons, IonBackButton, IonImg, DetailPlantBloom, DetailPlantHeight, DetailPlantSeason, DetailPlantWatering, DetailPlantExposition, DetailPlantColor, AreaUpdateDeletePlant },
  props: {
        id:{
            type: String,
            default: ''
        }
  },
  methods: {
        decodeHtml(html) {
            const txt = document.createElement('textarea');
            txt.innerHTML = html;
            return txt.value;
        },
  },
  setup(props, { emit }) {
    const route = useRoute();
    console.log(route.params.id);
    const store = useStore();
    const plants = ref([]);

    const loadPlant = async () => {
            try {
              console.log(props.id);
                await store.dispatch('getPlant', props.id); 
                console.log(store.state.plant);
                const loadPlant = store.state.plant.plants.find(plant => plant._id === props.id)
                if (loadPlant) {
                    console.log(loadPlant);
                    plants.value = loadPlant;
                    console.log(plants.value);
                    // totalPlant.value = loadedGarden.plants.length;          
                           
                }
            } catch (error) {
                console.error("Erreur lors du chargement du jardin", error);
            }
      };

    onMounted(() => {
      loadPlant()
          });
    return {
      loadPlant,
      plants
     } 
  }
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
  