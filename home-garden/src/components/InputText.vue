<template>
  <ion-input
    :label="internalLabelText"
    label-placement="floating"
    fill="outline"
    :placeholder="placeholderText"
    v-model="inputValue"
    :style="{ height: '40px', borderRadius: '5px', width: 'calc(100% - 30px)' }"
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

.custom-input {
  margin-right: 15px;
}
</style>
