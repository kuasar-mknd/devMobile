<template>
  <ion-item lines="none">
    <ion-avatar slot="start">
      <img src="/icons/color/color.png" />
    </ion-avatar>
    <ion-label>
      {{ color }}
    </ion-label>
  </ion-item>
</template>

<script lang="ts">
import { IonItem, IonLabel, IonAvatar } from "@ionic/vue";
export default {
  name: "DetailPlantColor",
  components: {
    IonItem,
    IonLabel,
    IonAvatar,
  },
  props: {
    color: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped></style>
```
