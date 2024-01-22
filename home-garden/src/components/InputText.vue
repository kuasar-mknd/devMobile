<template>
  <ion-input
    :label="internalLabelText"
    label-placement="floating"
    fill="outline"
    :placeholder="placeholderText"
    v-model="inputValue"
    :style="{ width: '216px', height: '40px', borderRadius: '5px' }"
    class="custom-input"
  ></ion-input>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { IonInput } from '@ionic/vue';

const props = defineProps(['labelText']);
const placeholderText = ref("Entrez le texte");
const internalLabelText = props.labelText || "Nom";
const inputValue = ref('');
</script>

<style scoped>
/* Style personnalisé pour la carte, si nécessaire */
</style>
