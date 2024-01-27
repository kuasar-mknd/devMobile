<template>
  <ion-card-content style="height: 100%">
    <div ref="mapContainer" style="height: 100%"></div>
  </ion-card-content>
</template>

<script lang="ts">
import { IonCardContent } from "@ionic/vue";
import L from "leaflet";
import { onMounted, onUnmounted, ref, watch } from "vue";
import { Geolocation } from "@capacitor/geolocation";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  components: {
    IonCardContent,
  },
  props: {
    gardenLocation: {
      type: Array,
    },
    gardenName: {
      type: String,
      default: "",
    },
    gardenMap: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const map = ref(null);
    const mapContainer = ref(null);
    const userMarker = ref(null); // Référence pour le marqueur de l'utilisateur
    const store = useStore();
    const router = useRouter();
    let watchId;

    const getCurrentLocation = async () => {
      try {
        const coordinates = await Geolocation.getCurrentPosition({
          enableHighAccuracy: true,
        });
        updateUserLocationAddress([
          coordinates.coords.latitude,
          coordinates.coords.longitude,
        ]);
        return [coordinates.coords.latitude, coordinates.coords.longitude];
      } catch (e) {
        console.error("Erreur lors de l'obtention de la localisation :", e);
        return [48.8534, 2.3488];
      }
    };

    const updateUserLocationAddress = (userLocation) => {
      emit("update:userLocation", userLocation);
    };

    const customIcon = L.icon({
      iconUrl: "/icons/icon-garden.png", // Chemin vers l'image de l'icône
      iconSize: [50, 50], // Taille de l'icône
      popupAnchor: [0, -25],
      customIconId: "gardenIcon",
    });

    const customUserIcon = L.icon({
      iconUrl: "/icons/person.png", // Chemin vers l'image de l'icône
      iconSize: [80, 80], // Taille de l'icône
      iconAnchor: [25, 50],
      popupAnchor: [0, -25],
      customIconId: "userIcon",
    });

    onMounted(async () => {
      // Retarder l'initialisation de la carte
      if (mapContainer.value) {
        const userCoords = await getCurrentLocation();
        setTimeout(() => {
          map.value = L.map(mapContainer.value).setView(userCoords, 13);
          const hasValidLocation =
            props.gardenLocation && props.gardenLocation.length === 2;
          const defaultCoords = hasValidLocation
            ? [props.gardenLocation[0], props.gardenLocation[1]]
            : userCoords; // Coordonnées par défaut si gardenLocation n'est pas valide

          // Initialisation de la carte avec les coordonnées de gardenLocation si elles sont disponibles
          map.value.setView(defaultCoords, 16);

          L.tileLayer(
            "https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg",
            {
              maxZoom: 16,
              attribution:
                '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
            }
          ).addTo(map.value);

          // Ajouter un marqueur pour gardenLocation
          if (hasValidLocation) {
            L.marker(defaultCoords, { icon: customIcon }).addTo(map.value);
          }

          // Ajouter un marqueur pour la position de l'utilisateur
          L.marker(userCoords, { icon: customUserIcon }).addTo(map.value);

          if (props.gardenMap) {
            const gardens = store.state.garden.gardens;
            gardens.forEach((garden: any) => {
              const gardenCoords = [
                garden.location.coordinates[0],
                garden.location.coordinates[1],
              ];
              const popupContent = `<div class="popup-content" data-id="${garden._id}"><b>${garden.name}</b></div>`;

              L.marker(gardenCoords, { icon: customIcon })
                .addTo(map.value)
                .bindPopup(popupContent)
                .on("popupopen", (e) => {
                  const popupElement = document.querySelector(".popup-content");
                  popupElement.addEventListener("click", () => {
                    router.push({
                      name: "JardinSpecifique",
                      params: { id: garden._id },
                    });
                  });
                });
            });
          }
        }, 500);
        watchId = await watchPosition();
      }
    });

    onUnmounted(() => {
      if (map.value) {
        map.value.remove();
      }
      Geolocation.clearWatch({ id: watchId });
    });

    const watchPosition = async () => {
      watchId = Geolocation.watchPosition(
        { enableHighAccuracy: true },
        (position, err) => {
          if (err) {
            console.error("Erreur de suivi de position :", err);
            return;
          }
          const newPos = [position.coords.latitude, position.coords.longitude];
          if (userMarker.value) {
            userMarker.value.setLatLng(newPos);
          } else if (map.value) {
            //clear user marker
            map.value.eachLayer(function (layer) {
              if (
                layer instanceof L.Marker &&
                layer.options.icon &&
                layer.options.icon.options.customIconId === "userIcon"
              ) {
                layer.remove();
              }
            });
            userMarker.value = L.marker(newPos, { icon: customUserIcon }).addTo(
              map.value
            );
            updateUserLocationAddress(newPos);
          }
        }
      );
      return watchId;
    };

    watch(map, (newMap) => {
      if (newMap) {
        newMap.on("locationfound", (e) => {
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
          iconUrl: "/icons/icon-garden.png", // Chemin vers l'image de l'icône
          iconSize: [50, 50], // Taille de l'icône
          popupAnchor: [0, -25],
          customIconId: "gardenIcon",
        });
        this.map.eachLayer(function (layer) {
          if (
            layer instanceof L.Marker &&
            layer.options.icon &&
            layer.options.icon.options.customIconId === "gardenIcon"
          ) {
            layer.remove();
          }
        });
        this.map.setView(newValue, 16);
        L.marker(newValue, { icon: customIcon, zIndexOffset: -1 }).addTo(
          this.map
        );
      }
    },
  },
  methods: {
    invalidateMapSize() {
      this.$nextTick(() => {
        if (this.map) {
          this.map.invalidateSize();
        }
      });
    },
  },
};
</script>
<style scoped>
ion-card-content {
  padding: 0 !important;
}
</style>
