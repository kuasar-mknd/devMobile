<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Connexion</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <form @submit.prevent="loginUser">
          <ion-item>
            <ion-label>Email</ion-label>
            <ion-input type="email" v-model="userData.identifier"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>Mot de Passe</ion-label>
            <ion-input type="password" v-model="userData.password"></ion-input>
          </ion-item>
          <div v-if="authError" class="error-message">
            {{ authError }}
          </div>
          <ion-button expand="full" type="submit">Se connecter</ion-button>
          <ion-button expand="full" @click="goToRegister">S'inscrire</ion-button>
        </form>
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { ref, computed } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
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
    name: 'LoginAuth',
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
        password: ''
      });
      const router = useRouter();

      const authError = computed(() => store.state.auth.authError);
  
      const loginUser = async () => {
        await store.dispatch('login', userData.value);
        if (!authError.value) {
          router.push('/'); // Redirection après connexion réussie
        }
      };
  
      const goToRegister = () => {
        router.push('/register'); 
      };

      return { userData, loginUser, goToRegister, authError  };
    }
  };
  </script>
  
  <style>
  .error-message {
    color: red;
  }
</style>