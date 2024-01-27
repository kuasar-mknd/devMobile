<template>
  <ion-chip class="custom-chip">
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
.custom-chip {
  --background: transparent;
  --color: #37aa9f;
  --border-color: #37aa9f;
  --border-radius: 50%;
  --border-width: 1px;
  --padding-start: 0;
  --padding-end: 0;
  --padding-top: 0;
  --padding-bottom: 0;
}
ion-icon {
  color: #37aa9f !important;
}

ion-icon {
  font-size: 2rem;
}
</style>
