<template>
  <div>
    <label :for="id">{{ labelText }} :</label>
    <div>
      <select
        :id="id"
        style="
          width: 216px;
          height: 44px;
          background-color: #f0f5f2;
          border: 1px solid #000;
          border-radius: 5px;
        "
      >
        <option v-for="(option, index) in options" :key="index" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';

const { labelText, id } = defineProps(['labelText', 'id']);
const options = ref([
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
]);

</script>

<style scoped>
label {
  display: block;
  margin-bottom: 5px;
}
</style>
