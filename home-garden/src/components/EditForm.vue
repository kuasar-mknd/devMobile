<template>
    <ion-modal :is-open="isOpen" @ionModalDidDismiss="handleDismiss" class="modal-user">
      <ion-header translucent>
        <ion-toolbar>
          <ion-title>Modifier Utilisateur</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="handleDismiss">Fermer</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding">
        <ion-list class="userEdit-form">
          <ion-item>
            <ion-label position="stacked">Nom</ion-label>
            <ion-input v-model="lastName" type="text"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Prénom</ion-label>
            <ion-input v-model="firstName" type="text"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Identifiant (email)</ion-label>
            <ion-input v-model="identifier" type="email"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Date de Naissance</ion-label>
            <ion-input v-model="birthDate" type="date"></ion-input>
          </ion-item>
          <div v-if="error" class="error-message">
            {{ error }}
          </div>
        </ion-list>
        <ion-button expand="block" @click="updateUser">Enregistrer</ion-button>
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
        const firstName = ref('');
        const lastName = ref('');
        const identifier = ref('');
        const birthDate = ref('');
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
                identifier: identifier.value,
                firstName: firstName.value,
                lastName: lastName.value,
                birthDate: birthDate.value,
                password: 'password123' // À modifier ou à recueillir via un autre champ si nécessaire
            };

            try {
                await axios.put('/api/users', userData);
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
            firstName,
            lastName,
            identifier,
            birthDate,
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