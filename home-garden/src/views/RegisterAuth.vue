<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Inscription</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <form @submit.prevent="registerUser">
        <ion-item>
          <ion-label>Email</ion-label>
          <ion-input type="email" v-model="userData.identifier"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Prénom</ion-label>
          <ion-input v-model="userData.firstName"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Nom</ion-label>
          <ion-input v-model="userData.lastName"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Date de Naissance</ion-label>
          <ion-input type="date" v-model="userData.birthDate"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Mot de Passe</ion-label>
          <ion-input type="password" v-model="userData.password"></ion-input>
        </ion-item>
        <ion-button expand="full" type="submit">S'inscrire</ion-button>
      </form>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonButton 
} from '@ionic/vue';

export default {
  name: 'RegisterAuth',
  components: {
    IonPage, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonItem, 
    IonLabel, 
    IonInput, 
    IonButton
  },
  setup() {
    const store = useStore();
    const userData = ref({
      identifier: '',
      firstName: '',
      lastName: '',
      birthDate: '',
      password: ''
    });

    const registerUser = async () => {
      await store.dispatch('register', userData.value);
    };

    return { userData, registerUser };
  }
};
</script>

