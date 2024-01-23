<template>
    <ion-card-content style="height: 100%;">
      <div ref="mapContainer" style="height: 100%;"></div>
    </ion-card-content>
</template>

<script>
import { IonCardContent } from '@ionic/vue';
import L from 'leaflet';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { Geolocation } from '@capacitor/geolocation';

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

    const getCurrentLocation = async () => {
      try {
        const coordinates = await Geolocation.getCurrentPosition();
        updateUserLocationAddress([coordinates.coords.latitude, coordinates.coords.longitude]);
        return [coordinates.coords.latitude, coordinates.coords.longitude];
      } catch (e) {
        console.error("Erreur lors de l'obtention de la localisation :", e);
        return [48.8534, 2.3488];
      }
    };

    const updateUserLocationAddress = (userLocation) => {
      console.log(userLocation);
      emit('update:userLocation', userLocation);
    };

    const customIcon = L.icon({
                iconUrl: '/icons/icon-garden.png', // Chemin vers l'image de l'icône
                iconSize: [50, 50], // Taille de l'icône
                popupAnchor: [0, -25],
                customIconId: 'gardenIcon' 
    });

    const customUserIcon = L.icon({
      iconUrl: '/icons/person.png', // Chemin vers l'image de l'icône
      iconSize: [50, 50], // Taille de l'icône
      iconAnchor: [25, 50],
      popupAnchor: [0, -25],
      customIconId: 'gardenIcon' 
    })        

    onMounted(async () => {
      // Retarder l'initialisation de la carte
      if (mapContainer.value) {
        const userCoords = await getCurrentLocation();
        console.log(userCoords);
        setTimeout(() => {
          map.value = L.map(mapContainer.value).setView(userCoords, 13);
          console.log(props.gardenLocation)
          const hasValidLocation = props.gardenLocation && props.gardenLocation.length === 2;
          const defaultCoords = hasValidLocation ? [props.gardenLocation[0], props.gardenLocation[1]] : userCoords; // Coordonnées par défaut si gardenLocation n'est pas valide

          // Initialisation de la carte avec les coordonnées de gardenLocation si elles sont disponibles
          map.value.setView(defaultCoords, 13);

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(map.value);

          // Ajouter un marqueur pour gardenLocation
          if (hasValidLocation) {
            L.marker(defaultCoords, { icon: customIcon }).addTo(map.value);
          }

          // Ajouter un marqueur pour la position de l'utilisateur
          L.marker(userCoords, { icon: customUserIcon }).addTo(map.value);
        }, 500);
      }
    });

    onUnmounted(() => {
      if (map.value) {
        map.value.remove();
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
    };
  },
  watch: {
    gardenLocation(newValue) {
      
      if (this.map && newValue && newValue.length === 2) {
        const customIcon = L.icon({
                iconUrl: '/icons/garden.png', // Chemin vers l'image de l'icône
                iconSize: [50, 50], // Taille de l'icône
                popupAnchor: [0, -25],
                customIconId: 'gardenIcon' 
            });
            this.map.eachLayer(function (layer) {
              if (layer instanceof L.Marker && layer.options.icon && layer.options.icon.options.customIconId === 'gardenIcon') {
                console.log('remove')
                layer.remove();
              }
            });
        this.map.setView(newValue, 13);
        L.marker(newValue, { icon: customIcon, zIndexOffset: -1 }).addTo(this.map);
      }
    }
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
