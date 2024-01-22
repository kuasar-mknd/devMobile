<template>
  <ion-page>
    <ion-content class="ion-padding register-content">
        <div class="logo-container">
                <ion-img class="logo" src="../../resources/icon.png"></ion-img>
            </div>
            <div class="login-text">
                <h1>S'inscrire</h1>
            </div>
      <form @submit.prevent="registerUser">
        <ion-list class="register-form">
        <ion-item>
          <ion-label position="stacked">Email</ion-label>
          <ion-input type="email" v-model="userData.identifier" required></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Prénom</ion-label>
          <ion-input v-model="userData.firstName"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Nom</ion-label>
          <ion-input v-model="userData.lastName"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Date de Naissance</ion-label>
          <ion-input type="date" v-model="userData.birthDate"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Mot de Passe</ion-label>
          <ion-input type="password" v-model="userData.password" required></ion-input>
        </ion-item>
        <div v-if="authError" class="error-message">
            {{ authError }}
          </div>
        </ion-list>
        <div class="button-container">
          <ButtonCTAPrimary buttonText="S'inscrire" type="submit" @click="registerUser" class="button-cta-primary"/>
          <ButtonCTASecondary buttonText="Se connecter" @click="goToLogin" class="button-cta-secondary"/>
        </div>
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
  IonList,
  IonContent, 
  IonItem, 
  IonLabel, 
  IonInput, 
} from '@ionic/vue';
import ButtonCTASecondary from '@/components/ButtonCTASecondary.vue';
import ButtonCTAPrimary from '@/components/ButtonCTAPrimary.vue';

export default {
  name: 'RegisterAuth',
  components: {
    IonPage, 
    IonList,
    IonContent, 
    IonItem, 
    IonLabel, 
    IonInput, 
    ButtonCTASecondary,
    ButtonCTAPrimary,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const userData = ref({
      identifier: '',
      firstName: '',
      lastName: '',
      birthDate: '',
      password: ''
    });

    const authError = computed(() => store.state.auth.authError);

    const registerUser = async () => {
      await store.dispatch('register', userData.value);
      if (!authError.value) {
          router.push('/'); // Redirection après connexion réussie
        }
    };

    const goToLogin = () => {
        router.push('/login'); 
      };

    return { userData, registerUser, authError, goToLogin };
  }
};
</script>
<style scoped>
.button-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-left: 15%;
  padding-right: 15%;
  width: 100%;
  gap: 10px; 
}
  .register-content {
    display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.register-form{
  width: 100%;
  padding-left: 15%;
  padding-top: 5%;
  padding-right: 15%;
  gap: 10px; 
}

.logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.logo-container ion-img {
  max-width: 150px;
  height: auto;
}

h2 {
  margin-bottom: 1.5rem;
}

ion-item {
--padding-start: 0;
--padding-end: 0;
--inner-padding-end: 0;
--inner-padding-start: 0;
--min-height: 40px;
margin-bottom: 1rem;
}

ion-button {
margin-top: 2rem; /* Adjust the margin as needed */
}

/* You may need to adjust the width of ion-input if you want them to be less than 100% */
ion-input {
--padding-start: 0;
--padding-end: 0;
--inner-padding-end: 0;
--inner-padding-start: 0;
margin-top: 5px;
border: 2px solid #FDAE36;
border-radius: 5px;
}

.button-cta-primary {
  --background: #FDAE36; /* Example to change the background color */
  --color: #ffffff; /* Example to change the text color */
  width:100%;
}

/* Surcharge des styles pour ButtonCTASecondary */
.button-cta-secondary {
  --background: transparent; /* Example to set a transparent background */
  --color: #FDAE36; /* Example to change the text color */
  --border-color: #FDAE36; /* Example to change the border color */
  width:100%;
}

</style>
