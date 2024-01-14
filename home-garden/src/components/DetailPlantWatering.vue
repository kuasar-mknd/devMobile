<template>
  <ion-item lines="none">
    <ion-avatar slot="start">
      <img src="../../resources/icons/watering/watering.png">
    </ion-avatar>
    <ion-label>
      {{ watering }}
    </ion-label>
  </ion-item>
</template>
    
  <script>
  export default {
  name: 'DetailPlantWatering',
  props: {
    watering: {
      type: String,
      required: true
    }
  }
}

</script>
    
  <style scoped>
  </style>
```