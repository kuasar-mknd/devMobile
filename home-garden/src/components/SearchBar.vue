<template>
  <ion-searchbar class="custom" show-clear-button="focus" placeholder="Search"></ion-searchbar>
</template>

<script lang="ts">
  import { IonSearchbar } from '@ionic/vue';
  import { defineComponent } from 'vue';
  import { trashBin } from 'ionicons/icons';

  export default defineComponent({
    name: 'SearchBar',
    components: { IonSearchbar },
    setup() {
      return { trashBin };
    },
  });
</script>

<style>
ion-searchbar.custom {
  --color : rgba(117, 117, 117, 0.7);
  --border-radius: 4px;
}
</style>