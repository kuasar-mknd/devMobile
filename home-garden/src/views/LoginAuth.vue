<template>
  <ion-page>
    <ion-content :fullscreen="true" class="content ion-margin-horizontal ion-padding login-content">
      <div class="logo-container">
        <ion-img class="logo" src="/icon.png"></ion-img>
      </div>
      <div class="login-text">
        <h1>Login</h1>
      </div>
      <form @submit.prevent="loginUser">
          <ion-item>
            <ion-input
              type="email"
              v-model="userData.identifier"
              required
              label="Identifiant"
              labelPlacement="floating"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-input
              type="password"
              v-model="userData.password"
              required
              label="Mot de passe"
              labelPlacement="floating"
            ></ion-input>
          </ion-item>
          <div v-if="authError" class="error-message">
            {{ authError }}
          </div>
        <div class="button-container">
          <ButtonCTAPrimary
            buttonText="Se connecter"
            type="submit"
            @click="loginUser"
            class="button-cta-primary"
          />
          <ButtonCTASecondary
            buttonText="S'inscrire"
            @click="goToRegister"
            class="button-cta-secondary"
          />
        </div>
      </form>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonList,
} from "@ionic/vue";
import ButtonCTASecondary from "@/components/ButtonCTASecondary.vue";
import ButtonCTAPrimary from "@/components/ButtonCTAPrimary.vue";

export default {
  name: "LoginAuth",
  components: {
    IonPage,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonList,
    ButtonCTASecondary,
    ButtonCTAPrimary,
  },
  setup() {
    const store = useStore();
    const userData = ref({
      identifier: "",
      password: "",
    });
    const router = useRouter();

    const authError = computed(() => store.state.auth.authError);

    const loginUser = async () => {
      await store.dispatch("login", userData.value);
      if (!authError.value) {
        router.push("/"); // Redirection après connexion réussie
      }
    };

    const goToRegister = () => {
      router.push("/register");
    };

    return { userData, loginUser, goToRegister, authError };
  },
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

.auth-form {
  width: 100%;
  padding-left: 15%;
  padding-top: 5%;
  padding-right: 15%;
  gap: 10px;
}

.error-message {
  color: red;
}
.login-content {
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
  margin-left: 15%;
  margin-right: 15%;
  padding-left: 5px;
  padding-right: 5px;
  border: 2px solid #fdae36;
  border-radius: 5px;
}

ion-button {
  margin-top: 2rem; /* Adjust the margin as needed */
}

/* You may need to adjust the width of ion-input if you want them to be less than 100% */
ion-input {
  
}

.button-cta-primary {
  --background: #fdae36; /* Example to change the background color */
  --color: #ffffff; /* Example to change the text color */
  width: 100%;
}

/* Surcharge des styles pour ButtonCTASecondary */
.button-cta-secondary {
  --background: transparent; /* Example to set a transparent background */
  --color: #fdae36; /* Example to change the text color */
  --border-color: #fdae36; /* Example to change the border color */
  width: 100%;
}

</style>
