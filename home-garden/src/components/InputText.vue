<template>
  <ion-input
    :label="internalLabelText"
    label-placement="floating"
    fill="outline"
    :placeholder="placeholderText"
    :style="{ width: '216px', height: '40px', borderRadius: '5px' }"
    class="custom-input"
  ></ion-input>
</template>

<script lang="ts">
import { IonInput } from '@ionic/vue';
import { defineComponent, ref, PropType } from 'vue';

export default defineComponent({
  components: { IonInput },
  props: {
    labelText: String as PropType<string>,
  },
  setup(props) {
    const placeholderText = ref("Entrez le texte"); // Modifiez le texte du placeholder ici

    return {
      placeholderText,
      internalLabelText: props.labelText || "Nom", // Utilisez la prop ou une valeur par défaut
    };
  },
});
</script>

<style scoped>
/* Style personnalisé pour la carte, si nécessaire */
</style>
