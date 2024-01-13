<template>
  <div>
    <label for="seasonSelect">Saison :</label>
    <div>
      <select
        id="seasonSelect"
        style="
          width: 216px;
          height: 44px;
          background-color: #f0f5f2;
          border: 1px solid #000;
          border-radius: 5px;
        "
      >
        <option value="spring">Printemps</option>
        <option value="summer">Été</option>
        <option value="autumn">Automne</option>
        <option value="winter">Hiver</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'InputList',
});
</script>

<style scoped>
label {
  display: block;
  margin-bottom: 5px;
}
</style>
