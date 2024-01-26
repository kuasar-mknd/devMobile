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
export default {
  name: "DetailPlantColor",
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
