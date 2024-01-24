<template>
  <ion-item lines="none">
    <ion-avatar slot="start">
      <img src="/icons/season/season.png">
    </ion-avatar>
    <ion-label>
      {{ season }}
    </ion-label>
  </ion-item>
</template>
    
  <script>
  export default {
  name: 'DetailPlantSeason',
  props: {
    season: {
      type: String,
      required: true
    }
  }
}

</script>
    
  <style scoped>
  </style>
```