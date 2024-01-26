<template>
  <ion-item lines="none">
    <ion-avatar slot="start">
      <img src="/icons/height/height.png" />
    </ion-avatar>
    <ion-label> {{ height }} cm </ion-label>
  </ion-item>
</template>

<script lang="ts">
import { IonItem, IonLabel, IonAvatar } from "@ionic/vue";
export default {
  name: "DetailPlantHeight",
  components: {
    IonItem,
    IonLabel,
    IonAvatar,
  },
  props: {
    height: {
      type: String,
      required: true,
    },
  },
};
</script>


<style scoped></style>
```
