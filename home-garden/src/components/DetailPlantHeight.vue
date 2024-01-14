<template>
  <ion-item lines="none">
    <ion-avatar slot="start">
      <img src="../../resources/icons/height/height.png">
    </ion-avatar>
    <ion-label>
      {{ height }}
    </ion-label>
  </ion-item>
</template>
    
  <script>
  export default {
  name: 'DetailPlantHeight',
  props: {
    height: {
      type: String,
      required: true
    }
  }
}

</script>
    
  <style scoped>
  </style>
```