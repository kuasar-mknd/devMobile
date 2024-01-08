<template>
  <div>
    <label for="myInput">Nom</label>
    <div>
      <input
        type="number"
        id="myInput"
        style="
          width: 216px;
          height: 44px;
          background-color: #f0f5f2;
          border: 1px solid #000;
          border-radius: 5px;
        "
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'InputNumber',
  });

</script>

<style scoped>
  label {
  display: block;
  margin-bottom: 5px;
}
</style>
