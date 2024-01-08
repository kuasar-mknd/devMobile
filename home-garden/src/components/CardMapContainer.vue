<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>Mes jardins</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <div id="mapid" style="height: 400px;"></div>
    </ion-card-content>
    <ion-button expand="block">Créer un nouveau jardin</ion-button>
  </ion-card>
</template>

<script>
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/vue';
import L from 'leaflet';
import { onMounted, ref } from 'vue';

export default {
  components: {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton
  },
  setup() {
    const map = ref(null);

    onMounted(() => {
      // Retarder l'initialisation de la carte
      setTimeout(() => {
        map.value = L.map('mapid').setView([51.505, -0.09], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map.value);

        // Obtenir la position de l'utilisateur
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const userLocation = [position.coords.latitude, position.coords.longitude];
            map.value.setView(userLocation, 13); // Centrer la carte sur la position de l'utilisateur
            L.marker(userLocation).addTo(map.value); // Ajouter un marqueur à la position de l'utilisateur
          }, () => {
            console.error("Unable to retrieve your location");
          });
        }
      }, 500);
    });



    return {
      map
    };
  },
  methods: {
    invalidateMapSize() {
      this.$nextTick(() => {
        if (this.map) {
          this.map.invalidateSize();
        }
      });
    }
  }
};
</script>
