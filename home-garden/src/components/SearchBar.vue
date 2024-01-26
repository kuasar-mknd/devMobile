<template>
  <ion-searchbar
    class="custom"
    v-model="searchText"
    show-clear-button="focus"
    placeholder="Search"
  ></ion-searchbar>
</template>

<script lang="ts">
import { IonSearchbar } from "@ionic/vue";
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "SearchBar",
  components: { IonSearchbar },
  props: ["modelValue"],
  setup(props, { emit }) {
    const searchText = ref(props.modelValue);

    searchText.value = props.modelValue;
    watch(searchText, (newValue) => {
      emit("update:modelValue", newValue);
    });

    return { searchText };
  },
});
</script>

<style>
.custom {
  padding-left: 0px;
}
</style>
