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
    <CardGarden
    label="Jardin au Chalet"
    localisation="123.345, 456.789"
    imageSrc="../resources/garden1.jpeg"/> 
    
    <CardGarden
    label="Jardin Maison"
    localisation="123.345, 456.789"
    imageSrc="../resources/garden 2.jpeg"/> 
    
    
    <CardGarden
    label="Jardin Mamie"
    localisation="123.345, 456.789"
    imageSrc="../resources/garden3.jpeg"/> 
    
  </ion-content>
</ion-page>
</template>


<script lang="ts">
import { IonGrid, IonPage,IonRow, IonCol,IonImg, IonHeader, IonToolbar, IonTitle, IonContent,IonText } from '@ionic/vue';
import SearchBar from '../components/SearchBar.vue';
import CardGarden from '../components/CardGarden.vue';

export default {
  components: {
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    SearchBar,
    CardGarden,
    IonText
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


</style>