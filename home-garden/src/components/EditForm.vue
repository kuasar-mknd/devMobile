<template>
  <ion-modal :is-open="isOpen" @ionModalDidDismiss="handleDismiss" class="modal-user">
    <ion-header translucent>
      <ion-toolbar>
        <ion-title>Modifier Compte</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="handleDismiss">Fermer</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list class="userEdit-form">
        <ion-item>
          <ion-label position="stacked">Identifiant (Email)</ion-label>
          <ion-input v-model="email" type="email"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Nouveau Mot de Passe</ion-label>
          <ion-input v-model="password" type="password"></ion-input>
        </ion-item>
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
      </ion-list>
      <ion-button expand="block" @click="updateUser">Mettre à jour</ion-button>
    </ion-content>
  </ion-modal>
</template>

<script lang="ts">
import { 
  IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, 
  IonContent, IonItem, IonLabel, IonInput, IonList,
} from '@ionic/vue';
import { ref, getCurrentInstance, defineComponent } from 'vue';
import axios from 'axios'; // Assurez-vous d'avoir axios installé

export default defineComponent({
    components: {
        IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, 
        IonContent, IonItem, IonLabel, IonInput, IonList,
    },
    setup(_, { emit }) {
        const isOpen = ref(true);
        const email = ref('');
        const password = ref('');
        const error = ref(null);
        const { proxy } = getCurrentInstance();

        const handleDismiss = () => {
            isOpen.value = false;
            if (proxy) {
                proxy.$emit('close'); // Émet l'événement 'close'
            }
        };

        const updateUser = async () => {
            const userData = {
                identifier: email.value,
                password: password.value
            };

            try {
                await axios.put('https://homegarden.onrender.com/api/users', userData);
                close();
            } catch (e) {
                error.value = e.message;
            }
        };

        const close = () => {
            isOpen.value = false;
        };

        return {
            isOpen,
            email,
            password,
            updateUser,
            handleDismiss,
            error,
            close
        };
    }
});
</script>


<style scoped>
.userEdit-form {
  width: 100%;
  padding-top: 5%;
  gap: 10px; 
}

.error-message {
  font-size: small;
  color: red;
}

ion-item {
  --padding-start: 0;
  --padding-end: 0;
  --inner-padding-end: 0;
  --inner-padding-start: 0;
  --min-height: 40px;
  margin-bottom: 1rem;
}

.modal-user {
  height: auto;
}
</style>
