<template>
    <ion-page>
      <ion-content>
        <ion-toolbar>
          <div class="logo-container">
            <ion-img class="logo" src="../../resources/icon.png"></ion-img>
          </div>
        </ion-toolbar>
  
          <div class="ajouter-plant-text">
            <h1>Ajouter une plante</h1>
          </div>
          <ButtonPictureVue class="button-picture" />


          <InputText class="input-text-commonName"
              labelText="Nom commun" 
              v-model="commonName"
            />
            <InputText class="input-text-nomspecifique"
              labelText="Nom spécifique" 
              v-model="scientificName"
            />
            <InputText class="input-text-famille"
              labelText="Famille"
              v-model="family"
            />
            <InputText class="input-text-famille"
              labelText=" Origine"
              v-model="origin"
            />
             <InputText class="input-text-exposition"
              labelText="Exposition"  
              v-model="exposure"
            />
            <InputText class="input-text-arrosage"
              labelText="Arrosage"  
              v-model="watering"
            />
            <InputText class="input-text-type-de-sol"
              labelText="Type de sol" 
              v-model="soilType"
            />
            <InputText class="input-text-couleur"
              labelText="Couleur"
              v-model="flowerColor"
            />
            <InputNumber class="input-text-hauteur"
              labelText="Hauteur"
              v-model="height"
            />

            <InputText class="input-list-saisondefloraison"
              labelText="Saison de floraison (ex: printemps)"
              v-model="bloomingSeason"
            />
          
            <InputText class="input-text-saisondeplantation"
              labelText="Saison de plantation (ex: printemps)"
              v-model="plantingSeason"
            />
           
            <InputText class="input-text-soins"
              labelText="Soins particuliers"
              v-model="care"
            />

           <InputUrl class="input-text-url"
              labelText="URL de l'image"
              v-model="imageUrl"
            />
            <InputText class="input-text-utilisation"
              labelText="Utilisation"
              v-model="use"
            />

            <ButtonCTAPrimary buttonText="Ajouter" class="button-cta-primary"  @click="submitPlant"/>

      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import ButtonPictureVue from '@/components/ButtonPicture.vue';
import InputNumber from '@/components/InputNumber.vue';
  import InputText from '@/components/InputText.vue';
  import InputUrl from '@/components/InputUrl.vue';
  import { IonPage, IonToolbar, IonContent } from '@ionic/vue';
import ButtonCTAPrimary from '@/components/ButtonCTAPrimary.vue';

import { useStore } from 'vuex';
import { ref } from 'vue';

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
const selectedGardenId = ref(''); // Cette valeur sera mise à jour par InputListJardin
//const selectedGardenName = ref(''); // Cette valeur sera mise à jour par InputListJardin
//const garden = ref('');
const store = useStore();
const submitPlant = async () => {
  console.log('Clic sur le bouton Ajouter');

  const plantData = {
    commonName: commonName.value,
    scientificName: scientificName.value,
    family: family.value,
    origin: origin.value,
    exposure: exposure.value,
    watering: watering.value,
    soilType: soilType.value,
    flowerColor: flowerColor.value,
    height: height.value,
    bloomingSeason: bloomingSeason.value,
    plantingSeason: plantingSeason.value,
    care: care.value,
    imageUrl: imageUrl.value,
    use: use.value,
    garden: selectedGardenId.value , // Envoyer l'id du jardin comme objet
  };
  
  console.log('Valeur de selectedGardenId:', selectedGardenId.value);
  console.log('l url de l image est', imageUrl.value);
  try {
    await store.dispatch('createPlant', plantData);
    console.log('Plante ajoutée');
    console.log('Data before sending:', plantData);
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la plante:', error);
  }
};


  </script>
  
  <style>
  /* Style personnalisé pour la carte, si nécessaire */
  
  .logo {
    max-width: 200px; /* Ajustez la taille de votre logo */
    height: auto;
    margin-right: auto;
    margin-left: auto;
  }
  
 
  
  .ajouter-plant-text {
    text-align: left;
    color: #37AA9F;
    font-size: 24px;
    font-weight: bold;
    margin-left: 2rem;
    font-family: 'otomanopee_one' !important;

  }
  
  .button-picture {
    margin-left: 2rem; /* Place le bouton à gauche */
  }


  .button-cta-primary {
    margin-top: 2rem;
  --background: #FDAE36; /* Example to change the background color */
  --color: #ffffff; /* Example to change the text color */
  width:100%;
}
    
  </style>
  