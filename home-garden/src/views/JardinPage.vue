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
    
    <ion-text  color="tertiary">
      <h1 class="titre">Mes jardins</h1>
    </ion-text>
    
    <ion-nav-link router-direction="forward" :component="component">
      <CardGarden
      @navigate="goToJardinSpecifique"
      label="Jardin au Chalet"
      localisation="123.345, 456.789"
      imageSrc="../resources/garden1.jpeg"/> 
    </ion-nav-link>
    
    <ion-nav-link router-direction="forward" :component="component">
      <CardGarden
      @navigate="goToJardinSpecifique"
      label="Jardin Maison"
      localisation="123.345, 456.789"
      imageSrc="../resources/garden 2.jpeg"/> 
    </ion-nav-link>
    
    <ion-nav-link router-direction="forward" :component="component"> 
      <CardGarden
      @navigate="goToJardinSpecifique"
      label="Jardin Mamie"
      localisation="123.345, 456.789"
      imageSrc="../resources/garden3.jpeg"/> 
    </ion-nav-link>
    
    <ion-grid>
      <ion-row class="ion-justify-content-center">
        <ion-col size="3">
          <ButtonAdd></ButtonAdd>
        </ion-col>
      </ion-row>
    </ion-grid>
    
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
    IonText
  },
  data() {
    return {
      component: JardinSpecifique,
    };
  },
  setup() {
    const router = useRouter();
    
    const goToJardinSpecifique = () => {
      router.push({ name: 'JardinSpecifique' }); // Use the correct route name or path
    };
    
    return {
      goToJardinSpecifique,
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