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

      <div class="ajouter-plant-text">
        <h1>Ajouter une plante</h1>
      </div>

      <ion-button
        expand="block"
        fill="outline"
        color="primary"
        @click="handleTakePictureAndUpload">Prendre une photo</ion-button>

      <InputText
        class="input-text-commonName input-container"
        labelText="Nom commun*"
        v-model="commonName"
      />
      <div v-if="!formValid && !commonName" class="error-message red-text">
        Le champ Nom commun est obligatoire.
      </div>

      <InputText
        class="input-text-nomspecifique input-container"
        labelText="Nom spécifique*"
        v-model="scientificName"
      />
      <div v-if="!formValid && !scientificName" class="error-message red-text">
        Le champ Nom spécifique est obligatoire.
      </div>

      <InputText
        class="input-text-famille input-container"
        labelText="Famille*"
        v-model="family"
      />
      <div v-if="!formValid && !family" class="error-message red-text">
        Le champ Famille est obligatoire.
      </div>

      <InputText
        class="input-text-famille input-container"
        labelText=" Origine"
        v-model="origin"
      />
      <ion-item>
        <ion-select
          label="Exposition*"
          label-placement="floating"
          fill="outline"
          v-model="exposure"
          class="input-list-exposition"
        >
          <ion-select-option value="Full Sun">Plein soleil</ion-select-option>
          <ion-select-option value="Partial Shade">Mi-ombre</ion-select-option>
          <ion-select-option value="Shade">Ombre</ion-select-option>
        </ion-select>
      </ion-item>

      <div v-if="!formValid && !exposure" class="error-message red-text">
        Le champ Exposition est obligatoire.
      </div>

      <InputText
        class="input-text-arrosage input-container"
        labelText="Arrosage"
        v-model="watering"
      />
      <InputText
        class="input-text-type-de-sol input-container"
        labelText="Type de sol"
        v-model="soilType"
      />
      <InputText
        class="input-text-couleur input-container"
        labelText="Couleur"
        v-model="flowerColor"
      />
      <InputNumber
        class="input-text-hauteur input-container"
        labelText="Hauteur*"
        v-model="height"
      />
      <div v-if="!formValid && !height" class="error-message red-text">
        Le champ Hauteur est obligatoire.
      </div>

      <InputText
        class="input-list-saisondefloraison input-container"
        labelText="Saison de floraison (ex: printemps)"
        v-model="bloomingSeason"
      />

      <InputText
        class="input-text-saisondeplantation input-container"
        labelText="Saison de plantation (ex: printemps)"
        v-model="plantingSeason"
      />

      <InputText
        class="input-text-soins input-container"
        labelText="Soins particuliers"
        v-model="care"
      />

      <InputUrl
        class="input-text-url input-container"
        labelText="URL de l'image"
        v-model="imageUrl"
      />
      <ion-item>
        <ion-select
          label="Utilisation*"
          label-placement="floating"
          fill="outline"
          v-model="use"
          class="input-list-utilisation"
        >
          <ion-select-option value="Ornamental">Ornemental</ion-select-option>
          <ion-select-option value="Groundcover">Couvre-sol</ion-select-option>
          <ion-select-option value="Food">Alimentaire</ion-select-option>
          <ion-select-option value="Medicinal">Médicinal</ion-select-option>
          <ion-select-option value="Fragrance">Parfum</ion-select-option>
        </ion-select>
      </ion-item>

      <div v-if="!formValid && !use" class="error-message red-text">
        Le champ Utilisation est obligatoire.
      </div>
      <div v-if="error" class="error-message red-text">
        {{ error }}
      </div>
      <ButtonCTAPrimary
        buttonText="Ajouter"
        class="button-cta-primary"
        @click="submitPlant"
      />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import ButtonPictureVue from "@/components/ButtonPicture.vue";
import InputNumber from "@/components/InputNumber.vue";
import InputText from "@/components/InputText.vue";
import InputUrl from "@/components/InputUrl.vue";
import {
  IonPage,
  IonToolbar,
  IonContent,
  IonHeader,
  IonBackButton,
  IonButtons,
  IonSelect,
  IonSelectOption,
  IonItem,
} from "@ionic/vue";
import ButtonCTAPrimary from "@/components/ButtonCTAPrimary.vue";
import { useStore } from "vuex";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import axios from 'axios';

const error = computed(() => store.state.plant.error);
const formValid = ref(true); // Nouvelle propriété pour indiquer si le formulaire est valide
const error2 = ref<string | null>(null);

const router = useRouter();
const gardenIdFromUrl = ref("");

const commonName = ref("");
const scientificName = ref("");
const family = ref("");
const origin = ref("");
const exposure = ref("");
const watering = ref("");
const soilType = ref("");
const flowerColor = ref("");
const height = ref("");
const bloomingSeason = ref("");
const plantingSeason = ref("");
const care = ref("");
const imageUrl = ref("");
const use = ref("");
const store = useStore();

const takePicture = async () => {
  const image = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
    source: CameraSource.Camera,
    quality: 50
  });

  console.log(image);

  const response = await fetch(image.webPath);
  const blob = await response.blob();

  return blob; // Retourner le Blob pour l'uploader // L'URL de l'image prise
};

const uploadImageToCloudinary = async (imageBlob) => {
  const formData = new FormData();
  formData.append('file', imageBlob);
  formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
  try {
    const response = await axios.post(import.meta.env.VITE_CLOUDINARY_URL, formData, {
    });
    return response.data.url.replace('http://', 'https://'); // L'URL de l'image sur Cloudinary
  } catch (error) {
    console.error('Erreur lors du téléchargement', error);
  }
};

const handleTakePictureAndUpload = async () => {
  const photoPath = await takePicture();
  imageUrl.value = await uploadImageToCloudinary(photoPath);
};

onMounted(() => {
  const { id } = router.currentRoute.value.params;
  gardenIdFromUrl.value = id;
});

const submissionInProgress = ref(false);

const submitPlant = async () => {
  console.log("Clic sur le bouton Ajouter");
  error2.value = null;
  formValid.value = true; // Réinitialiser la valeur à true avant chaque soumission

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
    garden: gardenIdFromUrl.value, // Envoyer l'id du jardin comme objet
  };
  if (!plantData.commonName) {
    error2.value = "";
    formValid.value = false;
  }

  if (!plantData.scientificName) {
    error2.value = "";
    formValid.value = false;
  }

  if (!plantData.family) {
    error2.value = "";
    formValid.value = false;
  }

  if (!plantData.height) {
    error2.value = "";
    formValid.value = false;
  }

  if (!plantData.exposure) {
    error2.value = "";
    formValid.value = false;
  }

  if (!plantData.use) {
    error2.value = "";
    formValid.value = false;
  }

  if (formValid.value) {
    try {
      await store.dispatch("createPlant", plantData);
      router.back();
    } catch (error) {
      console.error("Erreur lors de l'ajout de la plante:", error);
      error.value = error.message || "Une erreur inconnue est survenue.";
    } finally {
      submissionInProgress.value = false; // Réinitialiser l'état de la soumission
    }
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
  color: #37aa9f;
  font-size: 24px;
  font-weight: bold;
  margin-left: 2rem;
  font-family: "otomanopee_one" !important;
}

.button-picture {
  margin-left: 2rem; /* Place le bouton à gauche */
}

.button-cta-primary {
  margin-top: 2rem;
  --background: #fdae36; /* Example to change the background color */
  --color: #ffffff; /* Example to change the text color */
  width: 100%;
}

.input-container {
  margin-bottom: 10px; /* Ajoutez l'espace souhaité en bas de chaque input */

  margin-left: 15px;
}

.input-list-exposition {
  margin-bottom: 10px;
}

.input-text-commonName {
  margin-top: 20px;
}

ion-item {
  margin-left: 10px;
  margin-right: 10px;
}

.red-text {
  color: red;
}

.error-message {
  font-size: small;
  margin-left: 15px;
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
