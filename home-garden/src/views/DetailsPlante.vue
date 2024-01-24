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
          <ion-img class="logo" src="../../resources/icon.png"></ion-img>
        </div>
      </ion-toolbar>

    </ion-content>
  </ion-page>
</template>

<script  lang="ts">

import { IonContent, IonHeader, IonPage, IonToolbar, IonButtons, IonBackButton, IonImg } from '@ionic/vue';
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'DetailsPlante',
  components: { IonContent, IonHeader, IonPage, IonToolbar, IonButtons, IonBackButton, IonImg },
  setup() {
    const route = useRoute();
    console.log(route.params.id);
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
  