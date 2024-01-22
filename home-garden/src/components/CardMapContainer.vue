<template>
    <ion-card-content style="height: 100%;">
      <div ref="mapContainer" style="height: 100%;"></div>
    </ion-card-content>
</template>

<script>
import { IonCardContent } from '@ionic/vue';
import L from 'leaflet';
import { onMounted, onUnmounted, ref, watch } from 'vue';

export default {
  components: {
    IonCardContent,
  },
  props: {
    gardenLocation: {
      type: Array,
      required: true
    }
  },
  setup(props, { emit }) {
    const map = ref(null);
    const mapContainer = ref(null);

    const gardenLocation = ref('');

    const updateUserLocationAddress = (userLocation) => {
      console.log(userLocation);
      emit('update:location', userLocation);
    };

    onMounted(() => {
      // Retarder l'initialisation de la carte
      if (mapContainer.value) {
        setTimeout(() => {
          map.value = L.map(mapContainer.value).setView([51.505, -0.09], 13);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map.value);

        // Lancer la localisation de l'utilisateur
        map.value.locate({ setView: true, maxZoom: 16 });

        // L'événement 'locationfound' est déclenché si la localisation est réussie
        map.value.on('locationfound', (e) => {
          const userLocation = [e.latlng.lat, e.latlng.lng];
          L.marker(userLocation).addTo(map.value); // Ajouter un marqueur à la position de l'utilisateur
        });

        // L'événement 'locationerror' est déclenché si la localisation échoue
        map.value.on('locationerror', (e) => {
          console.error("Erreur lors de la localisation : ", e.message);
        });
        }, 500);
      }
    });

    onUnmounted(() => {
      if (map.value !== null) {
        map.value.remove();
        map.value = null;
      }
    });

    watch(map, (newMap) => {
      if (newMap) {
        newMap.on('locationfound', (e) => {
          updateUserLocationAddress([e.latitude, e.longitude]);
        });
      }
    });



    return {
      map,
      mapContainer,
      gardenLocation
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
