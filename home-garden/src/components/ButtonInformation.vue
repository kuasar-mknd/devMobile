<template>
  <ion-chip>
    <ion-icon :icon="informationCircle"></ion-icon>
  </ion-chip>
</template>

<script lang="ts">
import { IonChip, IonIcon } from "@ionic/vue";
import { informationCircle } from "ionicons/icons";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ButtonInformation",
  components: { IonChip, IonIcon },
  setup() {
    return {
      informationCircle,
    };
  },
});
</script>

<style scoped>
ion-icon {
  color: #37aa9f !important;
}

ion-icon {
  font-size: 2rem;
}
</style>
