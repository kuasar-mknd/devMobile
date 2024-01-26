<template>
  <ion-button>{{ buttonText }}</ion-button>
</template>

<script lang="ts">
import { IonButton } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ButtonCTAPrimary",
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
  --border-color: #000;
  --color: #fff;

  --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);

  --ripple-color: deeppink;

  --padding-top: 10px;
  --padding-bottom: 10px;
  text-transform: none;
}
</style>
