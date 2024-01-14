<template>
  <ion-item lines="none">
    <ion-avatar slot="start">
      <img src="../../resources/icons/exposure/exposure.png">
    </ion-avatar>
    <ion-label>
      {{ exposure }}
    </ion-label>
  </ion-item>
</template>
    
  <script>
  export default {
  name: 'DetailPlantExposition',
  props: {
    exposure: {
      type: String,
      required: true
    }
  }
}

</script>
    
  <style scoped>
  </style>
```