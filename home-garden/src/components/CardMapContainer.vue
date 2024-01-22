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
    },
    gardenName: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const map = ref(null);
    const mapContainer = ref(null);

    const gardenLocation = ref('');
    const gardenName = ref('');

    const updateUserLocationAddress = (userLocation) => {
      console.log(userLocation);
      emit('update:location', userLocation);
    };

    const customIcon = L.icon({
                iconUrl: '../../resources/icons/garden.png', // Chemin vers l'image de l'icône
                iconSize: [50, 50], // Taille de l'icône
                popupAnchor: [0, -25]
            });

    onMounted(() => {
      // Retarder l'initialisation de la carte
      if (mapContainer.value) {
        setTimeout(() => {
          const hasValidLocation = props.gardenLocation && props.gardenLocation.length === 2;
          const defaultCoords = hasValidLocation ? [props.gardenLocation[0], props.gardenLocation[1]] : [51.505, -0.09]; // Coordonnées par défaut si gardenLocation n'est pas valide

          // Initialisation de la carte avec les coordonnées de gardenLocation si elles sont disponibles
          map.value = L.map(mapContainer.value).setView(defaultCoords, 13);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(map.value);

          // Ajouter un marqueur pour gardenLocation
          if (hasValidLocation) {
            L.marker(defaultCoords, { icon: customIcon }).addTo(map.value);
          }

        // Lancer la localisation de l'utilisateur
        map.value.locate({ maxZoom: 16 });

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
      gardenLocation,
      gardenName
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
