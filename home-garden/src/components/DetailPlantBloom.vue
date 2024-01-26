<template>
  <ion-item lines="none">
    <ion-avatar slot="start">
      <img src="/icons/bloom/bloom.png" />
    </ion-avatar>
    <ion-label>
      {{ bloomSeason }}
    </ion-label>
  </ion-item>
</template>

<script lang="ts">
import { IonItem, IonLabel, IonAvatar } from "@ionic/vue";
export default {
  name: "DetailPlantBloom",
  components: {
    IonItem,
    IonLabel,
    IonAvatar,
  },
  props: {
    bloomSeason: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped></style>
```
