<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>Card Title</ion-card-title>
      <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
    </ion-card-header>

    <ion-card-content>
      Here's a small text description for the card content. Nothing more,
      nothing less.
    </ion-card-content>

    <ion-button fill="clear">Action 1</ion-button>
    <ion-button fill="clear">Action 2</ion-button>
  </ion-card>
</template>

<script lang="ts">
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
  },
});
</script>
