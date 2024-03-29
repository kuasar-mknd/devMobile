<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-row class="ion-justify-content-between">
          <ion-col>
            <ion-button @click="goBack" color="medium" shape="round" fill="clear">
              <ion-icon slot="icon-only" :icon="arrowBack"> </ion-icon>
            </ion-button>
          </ion-col>
          <ion-col>
            <ion-img
              src="/homegardenLogo_transparent-resize.png"
              alt="logo de homegarden, plante centrale à 3 feuilles avec le titre homegarden dessous"
            />
          </ion-col>
          <ion-col>
            <ion-label>
              <ion-buttons slot="end">
                <AreaUpdateDeleteGarden
                  :gardenId="id"
                  @delete-garden="deleteGarden"
                  @edit-garden="openCreateGardenModal"
                  class="btnUpdDel"
                />
              </ion-buttons>
            </ion-label>
          </ion-col>
        </ion-row>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="content ion-margin-horizontal ion-padding">
      <ion-text class="colorTitre">
        <h1 class="titre">{{ gardenName }}</h1>
      </ion-text>

      <CreateGardenModal
        :isOpen="showModal"
        @close="closeModal"
        :isEditMode="true"
        :existingGarden="gardenToEdit"
      />

      <PlantFormModal
        :isOpen="showModalPlant"
        @close="closeModalPlant"
        :isEditMode="false"
        :gardenId="id"
      />

      <div class="map-container">
        <CardMapContainer
          ref="cardMapContainerRef"
          :gardenLocation="gardenLocation"
          :gardenName="gardenName"
          @update:location="updateGardenLocation"
        />
      </div>

      <ion-text>
        <h1 class="titre">Mes plantes ({{ numberPlants }})</h1>
      </ion-text>

      <ion-grid>
        <ion-row>
          <ion-col>
            <SearchBar v-model="searchText"></SearchBar>
          </ion-col>
          <ion-col size="auto">
            <div style="width: 80px">
              <ButtonAdd @click="openCreatePlantModal"> </ButtonAdd>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-grid>
        <!-- Boucle sur les lignes. Chaque ligne contient jusqu'à 3 cartes. -->
        <ion-row
          v-for="rowIndex in Math.ceil(filteredPlants.length / 2)"
          :key="rowIndex"
        >
          <!-- Boucle sur les colonnes à l'intérieur de chaque ligne. -->
          <ion-col v-for="index in 2" :key="index">
            <!-- Calcul de l'indice de la plante basé sur rowIndex et index. -->
            <CardPlant
              v-if="filteredPlants[(rowIndex - 1) * 2 + index - 1]"
              :key="filteredPlants[(rowIndex - 1) * 2 + index - 1]._id"
              class="plant-image"
              :imageSrc="
                decodeHtml(
                  filteredPlants[(rowIndex - 1) * 2 + index - 1].imageUrl
                )
              "
              :name="filteredPlants[(rowIndex - 1) * 2 + index - 1].commonName"
              :watering="
                filteredPlants[(rowIndex - 1) * 2 + index - 1].watering
              "
              @click="
                redirectToPlanteDetails(
                  filteredPlants[(rowIndex - 1) * 2 + index - 1]._id
                )
              "
            >
              {{ filteredPlants[(rowIndex - 1) * 2 + index - 1] }}
            </CardPlant>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonIcon,
  IonButtons,
  IonButton,
  IonHeader,
  IonGrid,
  IonPage,
  IonRow,
  IonCol,
  IonImg,
  IonContent,
  IonText,
  IonLabel,
  IonToolbar
} from "@ionic/vue";
import ButtonAdd from "@/components/ButtonAdd.vue";
import { useRouter } from "vue-router";
import CardMapContainer from "@/components/CardMapContainer.vue";
import CreateGardenModal from "@/components/CreateGardenModal.vue";
import PlantFormModal from "@/components/PlantFormModal.vue";
import SearchBar from "@/components/SearchBar.vue";
import {
  ref,
  getCurrentInstance,
  onMounted,
  nextTick,
  computed,
  PropType,
  watch,
  onUnmounted,
  onUpdated,
} from "vue";
import { useStore } from "vuex";
import CardPlant from "@/components/CardPlant.vue";
import AreaUpdateDeleteGarden from "@/components/AreaUpdateDeleteGarden.vue";
import { arrowBack } from "ionicons/icons";

export default {
  components: {
    CardPlant,
    IonButton,
    SearchBar,
    IonText,
    IonIcon,
    AreaUpdateDeleteGarden,
    CardMapContainer,
    IonButtons,
    IonHeader,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    IonPage,
    IonContent,
    ButtonAdd,
    CreateGardenModal,
    IonLabel,
    PlantFormModal,
    IonToolbar,
  },
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  methods: {
    decodeHtml(html) {
      const txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    },
    goBack() {
      this.$router.go(-1); // Ou utilisez une autre logique de navigation si nécessaire
    },
  },
  setup(props, { emit }) {
    const router = useRouter();
    const plants = ref([]);
    const searchText = ref("");

    const isOpen = ref(true); // You can control the visibility with this ref
    const gardenName = ref("");
    const gardenLocation = ref([]);
    const gardenToEdit = ref({});
    const cardMapContainerRef = ref(null);
    const { proxy } = getCurrentInstance();
    const store = useStore();
    const showModal = ref(false);
    const showModalPlant = ref(false);

    const filteredPlants = computed(() => {
      return plants.value.filter((plant) =>
        plant.commonName.toLowerCase().includes(searchText.value.toLowerCase())
      );
    });

    const deleteGarden = async () => {
      try {
        await store.dispatch("removeGarden", props.id);
      } catch (error) {
        console.error("Erreur lors de la suppression du jardin", error);
      }
    };

    const getTotalPlants = async () => {
      try {
        await store.dispatch("aggregateGardenPlants", props.id);
        // Mise à jour de l'interface utilisateur en conséquence
      } catch (error) {
        console.error("Erreur lors de l'aggrégation", error);
      }
    };

    const numberPlants = computed(() => {
      const garden = store.state.garden.gardens.find((g) => g._id === props.id);
      return garden ? garden.numberOfPlants : 0;
    });

    const updateGardenLocation = (newLocation) => {
      gardenLocation.value = newLocation;
    };

    const closeModal = async () => {
      await loadGarden();
      showModal.value = false;
    };

    const closeModalPlant = async () => {
      await loadGarden();
      showModalPlant.value = false;
    };
    // Redirection vers la page  ajouter plante avec l'id du jardin en paramètre /AjouterPlante/:id
    const redirectToPlante = () => {
      router.push(`/AjouterPlante/${props.id}`);
    };

    // rediriger vers la page details plante avec l'id de la plante en paramètre /DetailsPlante/:id l'id de la plante
    const redirectToPlanteDetails = (id) => {
      router.push(`/DetailPlante/${id}`);
    };

    const loadGarden = async () => {
      try {
        await store.dispatch("getGarden", props.id);
        const loadedGarden = store.state.garden.gardens.find(
          (garden) => garden._id === props.id
        );
        if (loadedGarden) {
          gardenName.value = loadedGarden.name;
          gardenLocation.value = loadedGarden.location.coordinates;
          gardenToEdit.value = {
            ...loadedGarden,
            location: {
              ...loadedGarden.location,
              coordinates: gardenLocation.value,
            },
          };
          plants.value = loadedGarden.plants;

          // totalPlant.value = loadedGarden.plants.length;
        }
        getTotalPlants();
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
      });
    });

    onUpdated(() => {
      loadGarden().then(() => {
        nextTick(() => {
          if (cardMapContainerRef.value) {
            cardMapContainerRef.value.invalidateMapSize();
          }
        });
      });
    });

    onUnmounted(() => {});

    const openCreateGardenModal = async () => {
      await loadGarden();
      showModal.value = true;
    };

    const openCreatePlantModal = async () => {
      showModalPlant.value = true;
    };

    // watch gardenLocation to update the gardenToEdit object
    watch(gardenLocation, (newLocation) => {
      gardenToEdit.value = {
        ...gardenToEdit.value,
        location: {
          ...gardenToEdit.value.location,
          coordinates: newLocation,
        },
      };
    });

    // watch plant state to update the plants array
    watch(
      () => store.state.plant.plants,
      (newPlants) => {
        plants.value = newPlants;
      },
      { deep: true }
    );

    return {
      arrowBack,
      isOpen,
      gardenName,
      gardenLocation,
      cardMapContainerRef,
      updateGardenLocation,
      numberPlants,
      deleteGarden,
      getTotalPlants,
      openCreateGardenModal,
      showModal,
      gardenToEdit,
      plants,
      filteredPlants,
      searchText,
      closeModal,
      closeModalPlant,
      redirectToPlante,
      redirectToPlanteDetails,
      openCreatePlantModal,
      showModalPlant,
    };
  },
};
</script>

<style scoped>
.custom-button {
  --background: #ffffff; /* Couleur de fond personnalisée */
  --color: rgb(77, 77, 77); /* Couleur du texte */
}
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

.map-container {
  height: 300px;
  width: 100%;
}

.page-title {
  padding-left: 25px; /* Adjust as needed for alignment */
}

.titre {
  margin-left: 25px;
  color: #37aa9f;
}

.plant-image {
  width: 100%; /* Makes the image take the full width of its container */
  height: auto; /* Maintains the aspect ratio */
}

.btnUpdDel {
  margin-left: 80%;
  margin-top: 15%;
  height: 7%;
  width: 7%;
}
.colorTitre {
  color: #37aa9f;
}
</style>
