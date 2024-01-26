<template>
  <ion-grid>
    <ion-row class="ion-justify-content-between custom-row">
      <ion-col class="customName">
        <div class="helloName">
          <div>Bonjour,</div>
          <h1>{{ name }}</h1>
        </div>
      </ion-col>
      <ion-col>
        <div class="profilPicture">
          <ion-avatar slot="start">
            <img :src="imgURL" alt="Photo de profil" />
          </ion-avatar>
        </div>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import { IonGrid, IonRow, IonCol, IonAvatar } from "@ionic/vue";
export default {
  name: "ProfilUser",
  components: {
    IonGrid,
    IonRow,
    IonCol,
    IonAvatar,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    imgURL: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.customName {
  justify-content: left;
}

.custom-row {
  margin-right: 7%;
}
.helloName {
  text-align: left;
}
.profilPicture {
  display: flex;
  justify-content: flex-end; /* Aligner à droite */
  align-items: center; /* Centrer verticalement si nécessaire */
  width: 100%; /* Prendre toute la largeur de la colonne */
  overflow: hidden;
}

.roundedImage {
  height: 100%;
  width: 100%;
  border-radius: 50%;
  object-fit: cover;
}

h1 {
  font-weight: 600;
}
</style>
