<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button class="ripple" @click="setActiveTab('tab2')" tab="tab2" href="/tabs/jardin">
          <ion-icon :class="{active: activeTab === 'tab2'}" aria-hidden="true" :icon="leaf" />
          <ion-label>Jardin</ion-label>
        </ion-tab-button>
        <ion-tab-button  class="ripple" @click="setActiveTab('tab3')" tab="tab3" href="/tabs/map">
          <ion-icon :class="{active: activeTab === 'tab3'}" aria-hidden="true" :icon="location" />
          <ion-label>Localisation</ion-label>
        </ion-tab-button>
        <ion-tab-button  class="ripple" @click="setActiveTab('tab4')" tab="tab4" href="/tabs/user">
          <ion-icon :class="{active: activeTab === 'tab4'}" aria-hidden="true" :icon="person" />
          <ion-label>Profil</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { IonTabBar,IonLabel, IonTabButton, IonTabs, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { location, person, leaf } from 'ionicons/icons';

const activeTab = ref(localStorage.getItem('activeTab') || 'tab1');

const setActiveTab = (tab: string) => {
  activeTab.value = tab; // Update active tab
  localStorage.setItem('activeTab', tab); // Save the active tab to localStorage
};

onMounted(() => {
  const storedTab = localStorage.getItem('activeTab');
  if (storedTab) {
    activeTab.value = storedTab;
  }
});
</script>
<style>
.ripple {
  --ripple-color: #37AA9F !important;
}

ion-tab-button:hover ion-icon,
ion-tab-button:hover ion-label {
    color: #37AA9F !important;  
  }

 ion-icon.active {
  color: #37AA9F !important; /* Your desired color for active tabs */
}
  
ion-tab-button .active + ion-label {
  color: #37AA9F !important;
}
</style>
