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
      <ion-text >
            <h1 class="commonName">{{ plants.commonName }}</h1>
      </ion-text>
      <ion-label>
                <ion-buttons slot="end" class="ion-justify-content-end">
                    <AreaUpdateDeletePlant :plantId="id" @delete-plant="deletePlant" @edit-plant="editPlant" class="btnUpdDel"/>
                </ion-buttons>
            </ion-label>
            <AreaInfoPlant class="info-plante "></AreaInfoPlant>
            <ion-label class="label">
      Nom scientifique
    </ion-label>
      <ion-text label=" Nom scientifique" >
            <p class="nom-scientifique">{{ plants.scientificName }}</p>
      </ion-text>

      <ion-label class="label">
      Famille
    </ion-label>
      <ion-text label="Famille">
            <p class="nom-family">{{ plants.family }}</p>
      </ion-text>

      <ion-label class="label">
      Utilisation
    </ion-label>
    <ion-text label="Utilisation">
  <p class="use">{{ translateUse(plants.use) }}</p>
</ion-text>
      <DetailPlantSeason :season="plants.plantingSeason" class="season"></DetailPlantSeason>
      <DetailPlantHeight :height="plants.height" class="height"></DetailPlantHeight>
      <DetailPlantWatering :watering="plants.watering" class="watering"></DetailPlantWatering>
      <DetailPlantExposition :exposure="translateExposure(plants.exposure)" class="exposure"></DetailPlantExposition>
      <DetailPlantColor :color="plants.flowerColor" class="color"></DetailPlantColor>
      <DetailPlantBloom :bloomSeason="plants.bloomingSeason " class="bloom-season"></DetailPlantBloom>

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
import AreaInfoPlant from '@/components/AreaInfoPlant.vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'DetailsPlante',
  components: { IonContent, IonHeader, IonPage, IonToolbar, IonButtons, IonBackButton, IonImg, DetailPlantBloom, DetailPlantHeight, DetailPlantSeason, DetailPlantWatering, DetailPlantExposition, DetailPlantColor, AreaUpdateDeletePlant, AreaInfoPlant },
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
                await store.dispatch('getPlant', props.id); 
                const loadPlant = store.state.plant.plants.find(plant => plant._id === props.id)
                if (loadPlant) {
                    plants.value = loadPlant;                           
                }
            } catch (error) {
                console.error("Erreur lors du chargement du jardin", error);
            }
      };

      const deletePlant = async () => {
        console.log(props.id);
            try {
                await store.dispatch('deletePlant', props.id);
                // Redirigez ou actualisez la vue comme nécessaire
            } catch (error) {
                console.error("Erreur lors de la suppression de la plante", error);
            }
        };  

        const translateUse = (use) => {
      switch (use) {
        case 'Ornamental':
          return 'Ornemental';
        case 'Groundcover':
          return 'Couvre-sol';
        case 'Food':
          return 'Alimentaire';
        case 'Medicinal':
          return 'Médicinal';
        case 'Fragrance':
          return 'Parfum';
        // Ajoutez d'autres traductions ici
        default:
          return use;
      }
    };

    const translateExposure = (exposure) => {
      switch (exposure) {
        case 'Full Sun':
          return 'Plein soleil';
        case 'Partial Shade':
          return 'Mi-ombre';
        case 'Shade':
          return 'Ombre';
        // Ajoutez d'autres traductions ici
        default:
          return exposure;
      }
    };
    onMounted(() => {
      loadPlant()
          });
    return {
      loadPlant,
      deletePlant,
      plants,
      translateUse,
      translateExposure
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
  
  .commonName {
    text-align: left;
    color: #37AA9F;
    font-size: 35px;
    font-weight: bold !important;
    margin-left: 15px;
    margin-top: 50px;
  }
.label {
    margin-left: 15px;
    font-size: 15px;
   
  }
  .nom-scientifique {
    margin-left: 15px;
    font-size: 20px;
    font-weight: medium !important;
  }

  .nom-family {
    margin-left: 15px;
    font-size: 20px;
    font-weight: medium !important;
  }

  .use {
    margin-left: 15px;
    font-size: 20px;
    font-weight: medium !important;
  }

  .season {
    font-size: 20px;
    font-weight: medium !important;
  }

  .height {
    font-size: 20px;
    font-weight: medium !important;
  }

  .watering {
    font-size: 20px;
    font-weight: medium !important;
  }

  .exposure {
    font-size: 20px;
    font-weight: medium !important;
  }

  .color {
    font-size: 20px;
    font-weight: medium !important;
  }

  .bloom-season {
    font-size: 20px;
    font-weight: medium !important;
  }

.ion-justify-content-end {
  margin-right: 30px;
}
 
    
  </style>
  