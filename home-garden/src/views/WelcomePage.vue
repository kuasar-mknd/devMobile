<template>
    <ion-page>
        <ion-content class="ion-padding home-content">
            <div class="logo-container">
                <ion-img class="logo" src="/icon.png"></ion-img>
            </div>
            <div class="welcome-text">
                <h1>Bienvenue</h1>
            </div>
            <div class="button-container">
                <ButtonCTAPrimary buttonText="Inscription" @click="goToLogin" class="button-cta-primary"/>
                <ButtonCTASecondary buttonText="Connexion" @click="goToRegister" class="button-cta-secondary"/>
            </div>
        </ion-content>
  </ion-page>
</template>
  
  <script lang="ts">
  import { useRouter } from 'vue-router';
  import { 
    IonPage, 
    IonContent,
    IonImg,
  } from '@ionic/vue';
import ButtonCTAPrimary from '@/components/ButtonCTAPrimary.vue';
import ButtonCTASecondary from '@/components/ButtonCTASecondary.vue';
  
  export default {
    name: 'WelcomePage',
    components: {
    IonPage,
    IonContent,
    IonImg,
    ButtonCTAPrimary,
    ButtonCTASecondary
},
    setup() {
      const router = useRouter();
    
      const goToLogin = () => {
        router.push('/login'); 
      };
  
      const goToRegister = () => {
        router.push('/register'); 
      };

      return { goToLogin, goToRegister };
    }
  };
  </script>

<style scoped>
.home-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.logo {
  max-width: 150px; /* Adjust the size of your logo */
  height: auto;
}

.welcome-text h1 {
  margin-bottom: 2rem;
}

.button-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  gap: 10px; /* Defines a gap between buttons */
}

/* Surcharge des styles pour ButtonCTAPrimary */
.button-cta-primary {
  --background: #FDAE36; /* Example to change the background color */
  --color: #ffffff; /* Example to change the text color */
}

/* Surcharge des styles pour ButtonCTASecondary */
.button-cta-secondary {
  --background: transparent; /* Example to set a transparent background */
  --color: #FDAE36; /* Example to change the text color */
  --border-color: #FDAE36; /* Example to change the border color */
}

</style>