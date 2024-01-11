<template>

    <ion-img src="../../resources/IconMeteo.png"></ion-img>
  
</template>

<script lang="ts">
  import { IonImg } from '@ionic/vue';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'MeteoComponent',
    components: { IonImg},
  });
</script>

<style scoped>
  ion-img {
    width: 7.5rem;
    height: 6.5rem;
    border-radius: 0.3rem;
  }
</style>