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

      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import ButtonPictureVue from '@/components/ButtonPicture.vue';
  import { IonPage, IonToolbar, IonContent } from '@ionic/vue';
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
    margin-left: 10%; /* Place le bouton à gauche */

  }
  </style>
  