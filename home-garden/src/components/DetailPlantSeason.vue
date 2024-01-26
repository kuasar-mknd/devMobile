<template>
  <ion-item lines="none">
    <ion-avatar slot="start">
      <img src="/icons/season/season.png" />
    </ion-avatar>
    <ion-label>
      {{ season }}
    </ion-label>
  </ion-item>
</template>

<script lang="ts">

import { IonItem, IonLabel, IonAvatar } from "@ionic/vue";
export default {
  name: "DetailPlantSeason",
  components: {
    IonItem,
    IonLabel,
    IonAvatar,
  },
  props: {
    season: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped></style>
```
