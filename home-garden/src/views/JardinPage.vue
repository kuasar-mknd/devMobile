<template>
  <ion-page class="ion-margin-horizontal">
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
    
    <ion-grid>
      <ion-row class="ion-justify-content-center">
        <ion-col size="3">
          <ion-text class="ion-text-center">
            <p>Plongez dans le monde secret de la botanique! Créez et gérez vos jardins où seules vos mains vertes auront accès à ces oasis cachées.</p>
          </ion-text>
        </ion-col>
      </ion-row>
    </ion-grid>
    
    <ion-title color="tertiary" class="ion-margin-bottom">Mes jardins</ion-title>
    <SearchBar></SearchBar>

        <ion-nav-link router-direction="forward" :component="component">
          <CardGarden v-for="garden in gardens" :key="garden._id"
            @navigate="() => navigateToGarden(garden)"
            :label="garden.name"
            :localisation="`${garden.location.coordinates[1]},${garden.location.coordinates[0]}`"
            imageSrc="../resources/garden1.jpeg" /> 
        </ion-nav-link>
    
    <ion-grid>
      <ion-row class="ion-justify-content-center">
        <ion-col size="3">
          <ButtonAdd @click="openCreateGardenModal"></ButtonAdd>
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
import { IonNavLink, IonGrid, IonPage,IonRow, IonCol,IonImg,IonTitle, IonContent,IonText } from '@ionic/vue';
import SearchBar from '../components/SearchBar.vue';
import CardGarden from '../components/CardGarden.vue';
import ButtonAdd from '../components/ButtonAdd.vue';
import { useRouter } from 'vue-router';
import JardinSpecifique from './JardinSpecifique.vue';
import CreateGardenModal from '@/components/CreateGardenModal.vue';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';



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

    const router = useRouter();
    const store = useStore();

    const showModal = ref(false);

    const loadGardens = async () => {
      try {
        await store.dispatch('getGardenFromUser'); // Adaptez en fonction de l'identifiant si nécessaire
        store.state.garden.gardens.forEach((garden:any) => {
         console.log(garden.name);
        });
        gardens.value = store.state.garden.gardens;
      } catch (error) {
        console.error("Erreur lors du chargement des jardins:", error);
      }
    };
    onMounted(loadGardens);

    const openCreateGardenModal = async () => {
      //console.log(await store.dispatch('fetchGardens'));
      console.log(showModal.value);
      showModal.value = true;
    };

    const navigateToGarden = (garden:any) => {
        router.push({ 
        name: 'JardinSpecifique', 
        params: { 
          id: garden._id,
          label: garden.name, 
          localisation: garden.location.coordinates.join(',')
        }
      });
    }; 
    const goToJardinSpecifique = () => {
      router.push({ name: 'JardinSpecifique',  }); // Use the correct route name or path
    };
    
    return {
      goToJardinSpecifique,
      showModal,
      gardens,
      openCreateGardenModal,
      navigateToGarden,
    };

   
  }
}

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
</style>