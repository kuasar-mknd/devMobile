<template>
  <!--
    <button-c-t-a-primary fill="outline" buttonText="Ajouter une plante"></button-c-t-a-primary>
 -->
  <ion-button>{{ buttonText }}</ion-button>
</template>

<script lang="ts">
import { IonButton } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ButtonCTASecondary",
  components: { IonButton },
  props: {
    buttonText: {
      type: String,
      default: "Default",
    },
  },
});
</script>

<style scoped>
ion-button {
  --border-radius: 10px;
  --border-color: #fdae36 !important;
  --color: #fdae36;

  --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);

  --ripple-color: rgb(233, 221, 188);

  --padding-top: 10px;
  --padding-bottom: 10px;
  text-transform: none;
  font-weight: bold;
}
</style>
