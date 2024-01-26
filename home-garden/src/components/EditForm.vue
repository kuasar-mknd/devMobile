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
      <form @submit.prevent="updateUser">
        <ion-list class="userEdit-form">
          <ion-item>
            <ion-label position="stacked">Identifiant (Email)</ion-label>
            <ion-input v-model="userData.identifier" type="email" required></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Nouveau Mot de Passe</ion-label>
            <ion-input v-model="userData.password" type="password" required></ion-input>
          </ion-item>
          <div v-if="authError" class="error-message">
            {{ authError }}
          </div>
        </ion-list>
        <ion-button expand="block" type="submit">Mettre à jour</ion-button>
      </form>
    </ion-content>
  </ion-modal>
</template>


<script lang="ts">
import { 
  IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, 
  IonContent, IonItem, IonLabel, IonInput, IonList,
} from '@ionic/vue';
import { ref, computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    components: {
        IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, 
        IonContent, IonItem, IonLabel, IonInput, IonList,
    },
    setup(_, { emit }) {
        const store = useStore();
        const isOpen = ref(true);
        const userData = ref({
          identifier: '',
          password: ''
        });
        const authError = computed(() => store.state.auth.authError);
        const handleDismiss = () => {
            isOpen.value = false;
            emit('close');
        };

        const updateUser = async () => {
            await store.dispatch('updUser', userData.value);
            localStorage.setItem('email', JSON.stringify(userData.value.identifier));
            //window.location.reload();
            if (!authError.value) {
                handleDismiss();
            }
        };

        return {
            isOpen,
            userData,
            updateUser,
            handleDismiss,
            authError
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
