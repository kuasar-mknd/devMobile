<template>
    <ion-page>
      <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button>
                    </ion-back-button>
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
  
  <script setup lang="ts">

  import { IonPage, IonToolbar, IonContent, IonHeader, IonBackButton,IonButtons } from '@ionic/vue';
import { useStore } from 'vuex';
import {  ref,onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const store = useStore();




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
    
  </style>
  