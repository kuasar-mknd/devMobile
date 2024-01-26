<template>
  <ion-item lines="none">
    <ion-avatar slot="start">
      <img src="/icons/watering/watering.png" />
    </ion-avatar>
    <ion-label>
      {{ watering }}
    </ion-label>
  </ion-item>
</template>

<script lang="ts">
export default {
  name: "DetailPlantWatering",
  props: {
    watering: String,
  },
};
/*export default defineComponent({
    name: 'CardPlant',
    components: { IonCard, IonCardContent},
    props: {
      imageSrc: String,
      watering: String,
    },
  });*/
</script>

<style scoped></style>
```
