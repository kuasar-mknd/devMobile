<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/home">
          <ion-icon aria-hidden="true" :icon="home" />
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/map">
          <ion-icon aria-hidden="true" :icon="location" />
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/tabs/user">
          <ion-icon aria-hidden="true" :icon="person" />
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { location, person, home } from 'ionicons/icons';
</script>
