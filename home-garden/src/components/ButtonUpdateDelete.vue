  <template>
    <div class="button-container" @click="toggleMenu">
      <img class="menuIcon" src="/dots_menu.png" alt="Menu">
      <AreaUpdateDelete v-if="isMenuVisible" />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, getCurrentInstance } from 'vue';
  import AreaUpdateDelete from './AreaUpdateDelete.vue';
  
  export default defineComponent({
    name: 'ButtonUpdateDelete',
    components: { AreaUpdateDelete },
    setup() {
      const internalInstance = getCurrentInstance();
      const isMenuVisible = ref(false);
  
      function toggleMenu() {
        isMenuVisible.value = !isMenuVisible.value;
        if (isMenuVisible.value) {
          internalInstance?.emit('open-action-sheet');
        }
      }
  
      return { isMenuVisible, toggleMenu };
    }
  })
  </script>
  
  
  <style>
  .button-container {
    width: 10%;
    height: 5%;
  }

  </style>
  