<!-- InputUrl.vue -->
<template>
  <ion-input
    :label="internalLabelText"
    label-placement="floating"
    fill="outline"
    :placeholder="placeholderText"
    type="url"
    v-model="inputValue"
    :style="{ height: '40px', borderRadius: '5px', width: 'calc(100% - 30px)'}"
    class="custom-input"
    @update:modelValue="$emit('update:modelValue', inputValue)"
  ></ion-input>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import { IonInput } from '@ionic/vue';

const props = defineProps(['labelText']);
const emits = defineEmits( ['update:modelValue']);
const placeholderText = ref("Entrez l'URL");
const internalLabelText = props.labelText || "Nom";
const inputValue = ref('');

emits('update:modelValue');

</script>

<style scoped>
/* Style personnalisé pour la carte, si nécessaire */

.custom-input {
  margin-right: 15px;
}
</style>
