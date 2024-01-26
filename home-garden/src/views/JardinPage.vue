<template>
  <ion-page class="ion-margin-horizontal">
    <ion-content :fullscreen="true" class="content">
      <ion-grid>
        <ion-row class="ion-justify-content-center">
          <ion-col size="3">
            <ion-img
              src="/homegardenLogo_transparent-resize.png"
              alt="logo de homegarden, plante centrale à 3 feuilles avec le titre homegarden dessous"
            >
            </ion-img>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-grid>
        <ion-row class="ion-justify-content-center">
          <ion-text class="ion-text-center">
            <p>
              Plongez dans le monde secret de la botanique! Créez et gérez vos
              jardins où seules vos mains vertes auront accès à ces oasis
              cachées.
            </p>
          </ion-text>
        </ion-row>

        <ion-row>
          <ion-text class="ion-text-start">
            <h1 color="tertiary" class="titrePage ion-margin-bottom">
              Mes jardins
            </h1>
          </ion-text>
        </ion-row>
        <ion-row>
          <SearchBar v-model="searchText"></SearchBar>
        </ion-row>
      </ion-grid>

      <ion-nav-link router-direction="forward" :component="component">
        <CardGarden
          v-for="garden in filteredGardens"
          :key="garden._id"
          @navigate="() => navigateToGarden(garden)"
          :label="garden.name"
          :localisation="`${garden.location.coordinates[1]},${garden.location.coordinates[0]}`"
          imageSrc="/garden1.jpeg"
        />
      </ion-nav-link>

      <ion-grid>
        <ion-row class="ion-justify-content-center">
          <ion-col size="3">
            <ButtonAdd
              class="button-fixed"
              @click="openCreateGardenModal"
            ></ButtonAdd>
          </ion-col>
        </ion-row>
      </ion-grid>
      <CreateGardenModal
        :isOpen="showModal"
        @close="showModal = false"
        :isEditMode="false"
      />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonNavLink,
  IonGrid,
  IonPage,
  IonRow,
  IonCol,
  IonImg,
  IonTitle,
  IonContent,
  IonText,
} from "@ionic/vue";
import SearchBar from "../components/SearchBar.vue";
import CardGarden from "../components/CardGarden.vue";
import ButtonAdd from "../components/ButtonAdd.vue";
import { useRouter } from "vue-router";
import JardinSpecifique from "./JardinSpecifique.vue";
import CreateGardenModal from "@/components/CreateGardenModal.vue";
import { onMounted, ref, computed, watch, onUnmounted, onUpdated } from "vue";
import { useStore } from "vuex";

export default {
  components: {
    IonNavLink,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    IonPage,
    IonTitle,
    IonContent,
    SearchBar,
    CardGarden,
    ButtonAdd,
    IonText,
    CreateGardenModal,
  },
  data() {
    return {
      component: JardinSpecifique,
    };
  },
  setup() {
    const gardens = ref([]);
    const searchText = ref("");

    const router = useRouter();
    const store = useStore();

    const showModal = ref(false);

    const filteredGardens = computed(() => {
      return gardens.value.filter((garden) => {
        return garden.name
          .toLowerCase()
          .includes(searchText.value.toLowerCase());
      });
    });

    watch(
      () => store.state.garden.gardens,
      (newGardens) => {
        gardens.value = newGardens;
      },
      { deep: true }
    );

    const loadGardens = async () => {
      try {
        await store.dispatch("getGardensByUserId");
        store.state.garden.gardens.forEach((garden: any) => {
        });
        gardens.value = store.state.garden.gardens;
      } catch (error) {
        console.error("Erreur lors du chargement des jardins:", error);
      }
    };

    onMounted(() => {
      loadGardens();
    });

    onUpdated(() => {
      loadGardens();
    });

    onUnmounted(() => {});

    const openCreateGardenModal = async () => {
      showModal.value = true;
    };

    const navigateToGarden = (garden: any) => {
      router.push({
        name: "JardinSpecifique",
        params: {
          id: garden._id,
        },
      });
    };
    const goToJardinSpecifique = () => {
      router.push({ name: "JardinSpecifique" }); // Use the correct route name or path
    };

    return {
      goToJardinSpecifique,
      showModal,
      gardens,
      searchText,
      filteredGardens,
      openCreateGardenModal,
      navigateToGarden,
    };
  },
};
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
.titre {
  margin-left: 25px;
}

.titrePage {
  margin-top: 15%;
  color: #37aa9f;
}

.button-fixed {
  position: fixed; /* Fixe la position du bouton */
  bottom: 20px; /* 20 pixels depuis le bas de la page */
  /* 20 pixels depuis la droite de la page */
  z-index: 1000; /* S'assure que le bouton soit au-dessus des autres éléments */
}
</style>
