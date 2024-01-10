<template>
  <ion-chip>
    <ion-icon :icon="chevronBack"></ion-icon>
  </ion-chip>
</template>

<script lang="ts">
  import { IonChip,  IonIcon } from '@ionic/vue';
  import {  chevronBack } from 'ionicons/icons';
  import { defineComponent } from 'vue';

  export default defineComponent({
    components: { IonChip, IonIcon },
    setup() {
      return {

        chevronBack,
      };
    },
  });
</script>

<style scoped>
  ion-icon {
    color: #37AA9F !important;
  }

  ion-icon {
    font-size: 2rem;
  }
  ion-icon {
    stroke-width: 3px !important;
  }
</style>
