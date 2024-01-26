<template>
  <IonModal :is-open="isOpen" @ionModalDidDismiss="handleDismiss">
    <ion-header>
      <ion-toolbar>
        <IonTitle class="ajouter-plant-text"
          >{{ isEditMode ? "Modifier" : "Ajouter" }} une Plante</IonTitle
        >
        <IonButtons slot="end">
          <IonButton @click="handleDismiss" class="close-button">
            <ion-icon :icon="closeCircleOutline"></ion-icon>
</IonButton>
        </IonButtons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <IonItem>
        <IonButton
          expand="block"
          fill="outline"
          color="primary"
          @click="handleTakePictureAndUpload"
          >Prendre une photo</IonButton
        >
      </IonItem>

      <IonItem>
        <InputText
          class="input-text-commonName input-container"
          labelText="Nom commun*"
          v-model="commonName"
        />
        <div v-if="!formValid && !commonName" class="error-message red-text">
          Le champ Nom commun est obligatoire.
        </div>
      </IonItem>

      <IonItem>
        <InputText
          class="input-text-nomspecifique input-container"
          labelText="Nom spécifique*"
          v-model="scientificName"
        />
        <div
          v-if="!formValid && !scientificName"
          class="error-message red-text"
        >
          Le champ Nom spécifique est obligatoire.
        </div>
      </IonItem>

      <IonItem>
        <InputText
          class="input-text-famille input-container"
          labelText="Famille*"
          v-model="family"
        />
        <div v-if="!formValid && !family" class="error-message red-text">
          Le champ Famille est obligatoire.
        </div>
      </IonItem>

      <IonItem>
        <InputText
          class="input-text-famille input-container"
          labelText=" Origine"
          v-model="origin"
        />
        <IonItem  style="width: 100% !important;">
          <ion-select
            label="Exposition*"
            label-placement="floating"
            fill="outline"
            v-model="exposure"
            class="input-list-exposition"
          >
            <ion-select-option value="Full Sun">Plein soleil</ion-select-option>
            <ion-select-option value="Partial Shade"
              >Mi-ombre</ion-select-option
            >
            <ion-select-option value="Shade">Ombre</ion-select-option>
          </ion-select>
        </IonItem>

        <div v-if="!formValid && !exposure" class="error-message red-text">
          Le champ Exposition est obligatoire.
        </div>
      </IonItem>

      <IonItem>
        <InputText
          class="input-text-arrosage input-container"
          labelText="Arrosage"
          v-model="watering"
        />
      </IonItem>

      <IonItem>
        <InputText
          class="input-text-type-de-sol input-container"
          labelText="Type de sol pad"
          v-model="soilType"
        />
      </IonItem>

      <IonItem>
        <InputText
          class="input-text-couleur input-container"
          labelText="Couleur"
          v-model="flowerColor"
        />
      </IonItem>

      <IonItem>
        <InputNumber
          class="input-text-hauteur input-container"
          labelText="Hauteur*"
          v-model="height"
        />
        <div v-if="!formValid && !height" class="error-message red-text">
          Le champ Hauteur est obligatoire.
        </div>
      </IonItem>

      <IonItem>
        <InputText
          class="input-list-saisondefloraison input-container"
          labelText="Saison de floraison (ex: printemps)"
          v-model="bloomingSeason"
        />
      </IonItem>

      <IonItem>
        <InputText
          class="input-text-saisondeplantation input-container"
          labelText="Saison de plantation (ex: printemps)"
          v-model="plantingSeason"
        />
      </IonItem>

      <IonItem>
        <InputText
          class="input-text-soins input-container"
          labelText="Soins particuliers"
          v-model="care"
        />
      </IonItem>

      <IonItem class="item-use">
        <IonItem  style="width: 100% !important;">
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
        </IonItem>

        <div v-if="!formValid && !use" class="error-message red-text">
          Le champ Utilisation est obligatoire.
        </div>
      </IonItem>
      <div v-if="error" class="error-message red-text">
        {{ error }}
      </div>
      <IonButton expand="block" @click="submitPlant">
        {{ isEditMode ? "Mettre à jour" : "Créer" }}
      </IonButton>
    </ion-content>
  </IonModal>
</template>

<script lang="ts">
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import InputNumber from "@/components/InputNumber.vue";
import InputText from "@/components/InputText.vue";
import InputUrl from "@/components/InputUrl.vue";
import { closeCircleOutline } from "ionicons/icons";
import {
  IonToolbar,
  IonContent,
  IonHeader,
  IonButtons,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonModal,
  IonTitle,
  IonButton,
  IonIcon,
} from "@ionic/vue";
import { useStore } from "vuex";
import {
  ref,
  onMounted,
  computed,
  watch,
  getCurrentInstance,
  defineComponent,
} from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default defineComponent({
  components: {
    InputNumber,
    InputText,
    InputUrl,
    IonToolbar,
    IonContent,
    IonHeader,
    IonButtons,
    IonSelect,
    IonSelectOption,
    IonItem,
    IonModal,
    IonTitle,
    IonButton,
    IonIcon,
  },
  props: {
    isEditMode: Boolean, // Détermine si le modal est en mode édition
    existingPlant: Object, // Les données du jardin existant pour la mise à jour
    gardenId: String,
  },
  setup(props, { emit }) {
    const error = computed(() => store.state.plant.error);
    const isOpen = ref(true);
    const formValid = ref(true); // Nouvelle propriété pour indiquer si le formulaire est valide
    const error2 = ref<string | null>(null);
    const { proxy } = getCurrentInstance();

    const router = useRouter();
    const gardenId = ref("");

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

    const handleDismiss = () => {
      close();
    };

    const decodeHtml = (html) => {
      const txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    }

    const close = () => {
      isOpen.value = false;
      if (proxy) {
        proxy.$emit("close"); // Émet l'événement 'close'
      }
    };

    const takePicture = async () => {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 50,
        width: 600,
      });

      const response = await fetch(image.webPath);
      const blob = await response.blob();

      return blob; // Retourner le Blob pour l'uploader // L'URL de l'image prise
    };

    const uploadImageToCloudinary = async (imageBlob) => {
      const formData = new FormData();
      formData.append("file", imageBlob);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );
      try {
        const response = await axios.post(
          import.meta.env.VITE_CLOUDINARY_URL,
          formData,
          {}
        );
        return response.data.url.replace("http://", "https://"); // L'URL de l'image sur Cloudinary
      } catch (error) {
        console.error("Erreur lors du téléchargement", error);
      }
    };

    const handleTakePictureAndUpload = async () => {
      const photoPath = await takePicture();
      imageUrl.value = await uploadImageToCloudinary(photoPath);
    };

    onMounted(() => {
      
    });

    const submissionInProgress = ref(false);

    const submitPlant = async () => {
      error2.value = null;
      formValid.value = true; // Réinitialiser la valeur à true avant chaque soumission

      if (!imageUrl.value) {
        imageUrl.value =
          "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Diversity_of_plants_%28Streptophyta%29_version_2.png/360px-Diversity_of_plants_%28Streptophyta%29_version_2.png";
      }

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
        imageUrl: decodeHtml(imageUrl.value),
        use: use.value,
        garden: gardenId.value ? gardenId.value : props.gardenId,
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
        if (props.isEditMode) {
          try {
            await store.dispatch("updatePlant", {
              id: props.existingPlant._id,
              plantData,
            });
          } catch (error) {
            console.error("Erreur lors de la mise à jour de la plante:", error);
            error.value = error.message || "Une erreur inconnue est survenue.";
          } finally {
            submissionInProgress.value = false;
          }
        } else {
          try {
            await store.dispatch("createPlant", plantData);
          } catch (error) {
            console.error("Erreur lors de l'ajout de la plante:", error);
            error.value = error.message || "Une erreur inconnue est survenue.";
          } finally {
            submissionInProgress.value = false; // Réinitialiser l'état de la soumission
          }
        }
        if(!error.value) {
          close();
        }
      }
    };

    watch(
      () => props.existingPlant,
      (newValue) => {
        if (newValue) {
          commonName.value = newValue.commonName;
          scientificName.value = newValue.scientificName;
          family.value = newValue.family;
          origin.value = newValue.origin;
          exposure.value = newValue.exposure;
          watering.value = newValue.watering;
          soilType.value = newValue.soilType;
          flowerColor.value = newValue.flowerColor;
          height.value = newValue.height;
          bloomingSeason.value = newValue.bloomingSeason;
          plantingSeason.value = newValue.plantingSeason;
          care.value = newValue.care;
          imageUrl.value = newValue.imageUrl;
          use.value = newValue.use;
          gardenId.value = newValue.garden;
          gardenId.value = props.isEditMode ? newValue.garden : props.gardenId;
        }
      },
      {
        immediate: true, // Exécute le watcher dès l'initialisation du composant
        deep: true, // Surveille les changements profonds dans l'objet
      }
    );

    return {
      submitPlant,
      handleTakePictureAndUpload,
      handleDismiss,
      close,
      isOpen,
      commonName,
      scientificName,
      family,
      origin,
      exposure,
      watering,
      soilType,
      flowerColor,
      height,
      bloomingSeason,
      plantingSeason,
      care,
      imageUrl,
      use,
      error2,
      formValid,
      closeCircleOutline
        
    };
  },
});
</script>

<style>
/* Style personnalisé pour la carte, si nécessaire */
.close-button {
  position: absolute;
  top: -16px;
  right: +1px;
  --color: #353535 !important; /* Couleur du bouton */
  font-size: 1.5rem;
}

.logo {
  max-width: 200px; /* Ajustez la taille de votre logo */
  height: auto;
  margin-right: auto;
  margin-left: auto;
}

.ajouter-plant-text {
  text-align: left;
  color: #37aa9f;
  font-size: 20px;
  font-weight: bold;
  margin-left: 2rem;
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
  padding: 8px 16px; /* Ajoutez le padding autour du champ */

}

.input-text-commonName {
  margin-top: 20px;
  
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
