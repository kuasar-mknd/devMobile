<template>
  <div>
    <!-- Utilisez le composant ButtonInformation ici -->
    <ButtonInformation @click="openModal" />
    
    <!-- Modal -->
    <ion-modal :is-open="showModal" @dismiss="showModal = false">
      <ion-content>
        <!-- Ajoutez une div pour le voile flou -->
        <div class="blur-background"></div>

        <!-- Contenu de votre modal -->
        <ion-card class="modal-card">
          <ion-card-header>
            <ion-card-title>Informations</ion-card-title>
            <!-- Ajoutez un bouton de fermeture -->
            <ion-button @click="closeModal" class="close-button" fill="clear" >
              <ion-icon :icon="closeCircleOutline"></ion-icon>
            </ion-button>
          </ion-card-header>
          <ion-card-content>
            <!-- Contenu de votre modal -->
            <p>Informations sur la plante</p>
            
          </ion-card-content>
        </ion-card>
      </ion-content>
    </ion-modal>
  </div>
</template>

<script lang="ts">
import ButtonInformation from '@/components/ButtonInformation.vue';
import { IonModal, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon } from '@ionic/vue';
import { closeCircleOutline } from 'ionicons/icons';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'AreaInfoPlant',
  components: {
    ButtonInformation,
    IonModal,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonIcon,
  },
  setup() {
    const showModal = ref(false);

    const openModal = () => {
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
    };

    return {
      showModal,
      openModal,
      closeModal,
      closeCircleOutline,
    };
  },
});
</script>

<style scoped>
/* Styles personnalisés pour ce composant, si nécessaire */

/* Style pour le voile flou de l'arrière-plan */
.blur-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #d4e6db70; /* Couleur du voile */
  filter: blur(10px); /* Ajustez la valeur de flou selon vos préférences */
  pointer-events: none; /* Permet aux événements de souris de passer à travers */
}

/* Style pour centrer la modal */
.modal-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%; /* Ajustez la largeur selon vos préférences */
  background-color: #F0F5F2; /* Ajoutez une couleur de fond à votre modal */
  padding: 16px;
  border-radius: 10px;
}

/* Style pour le bouton de fermeture */
.close-button {
  position: absolute;
  top: -16px;
  right: -22px;
  --color: #353535 !important; /* Couleur du bouton */
  font-size: 1.5rem;
}
ion-card-title {
  font-size: 17px;
  color: #353535;
}



</style>
