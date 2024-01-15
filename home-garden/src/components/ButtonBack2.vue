<template>
    <ion-nav :root="component"></ion-nav>
  </template>
  
  <script lang="ts">
    import { IonNav } from '@ionic/vue';
    import JardinPage from '../views/JardinPage.vue';
  
    export default {
      components: { IonNav },
      data() {
        return {
          component: JardinPage,
        };
      },
    };
  </script>