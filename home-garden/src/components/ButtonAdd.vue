<template>
  <!--
    <button-c-t-a-primary fill="outline" buttonText="Ajouter une plante"></button-c-t-a-primary>
 -->
 <ion-button shape="round">
  <ion-icon slot="icon-only" :icon="addOutline"></ion-icon>
  </ion-button>
</template>

<script lang="ts">
import { IonButton, IonIcon } from '@ionic/vue';
import { addOutline } from 'ionicons/icons';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ButtonAdd',
  components: { IonButton, IonIcon},
  setup() {
      return { addOutline };
    },
});
</script>

<style>

ion-button {
    --border-color: #FDAE36 !important;
    --color : #f8f8f8;

    --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);

    --ripple-color: rgb(233, 221, 188);

    --padding-top: 10px;
    --padding-bottom: 10px;
    text-transform: none;
    font-weight: bold;
  }

</style>