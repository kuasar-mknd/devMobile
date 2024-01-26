<template>
  <ion-item lines="none">
    <ion-avatar slot="start">
      <img src="/icons/exposure/exposure.png" />
    </ion-avatar>
    <ion-label>
      {{ exposure }}
    </ion-label>
  </ion-item>
</template>

<script lang="ts">
import { IonItem, IonLabel, IonAvatar } from "@ionic/vue";
export default {
  name: "DetailPlantExposition",
  components: {
    IonItem,
    IonLabel,
    IonAvatar,
  },
  props: {
    exposure: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped></style>
```
