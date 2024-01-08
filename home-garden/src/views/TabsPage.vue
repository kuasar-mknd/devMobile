<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button class="ripple" @click="setActiveTab('tab1')" tab="tab1" href="/tabs/home">
          <ion-icon :class="{active: activeTab === 'tab1'}" aria-hidden="true" :icon="home" />
        </ion-tab-button>
        <ion-tab-button class="ripple" @click="setActiveTab('tab2')" tab="tab2" href="/tabs/jardin">
          <ion-icon :class="{active: activeTab === 'tab2'}" aria-hidden="true" :icon="leaf" />
        </ion-tab-button>
        <ion-tab-button  class="ripple" @click="setActiveTab('tab3')" tab="tab3" href="/tabs/map">
          <ion-icon :class="{active: activeTab === 'tab3'}" aria-hidden="true" :icon="location" />
        </ion-tab-button>
        <ion-tab-button  class="ripple" @click="setActiveTab('tab4')" tab="tab4" href="/tabs/user">
          <ion-icon :class="{active: activeTab === 'tab4'}" aria-hidden="true" :icon="person" />
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonTabBar, IonTabButton, IonTabs, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { location, person, home, leaf } from 'ionicons/icons';

const activeTab = ref('tab1'); // Default active tab

const setActiveTab = (tab: string) => {
  activeTab.value = tab;
};
</script>
<style>
.ripple {
  --ripple-color: #37AA9F !important;
}

ion-tab-button:hover ion-icon {
    color: #37AA9F !important;  
  }

  ion-icon.active {
  color: #37AA9F !important; /* Your desired color for active tabs */
}
  

</style>
