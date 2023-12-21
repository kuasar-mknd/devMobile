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
  import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue';
  import L from 'leaflet';
  
  export default {
    name: 'CardMapContainer',
    components: {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent
  },
  data() {
    return {
      map: null,
      userMarker: null
    };
  },
  mounted() {
    this.initMap();
    this.locateUser();
  },
  methods: {
    initMap() {
      this.map = L.map('mapid').setView([51.505, -0.09], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);
    },
    locateUser() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = [position.coords.latitude, position.coords.longitude];
            this.map.setView(userLocation, 13);

            if (!this.userMarker) {
              this.userMarker = L.marker(userLocation).addTo(this.map);
            } else {
              this.userMarker.setLatLng(userLocation);
            }
          },
          () => {
            console.error("Unable to retrieve your location");
          }
        );
      }
    }
  }
};
</script>
  
  <style>
  /* Style personnalisé pour la carte, si nécessaire */
  </style>
  