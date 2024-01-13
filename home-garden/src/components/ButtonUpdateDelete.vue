  <template>
    <div class="button-container" @click="toggleMenu">
      <img class="menuIcon" src="../../resources/dots_menu.png" alt="Menu">
      <AreaUpdateDelete v-if="isMenuVisible" />
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import AreaUpdateDelete from './AreaUpdateDelete.vue';
  
  export default {
    name: 'ButtonUpdateDelete',
    components: {
      AreaUpdateDelete
    },
    setup() {
      const isMenuVisible = ref(false);
  
      function toggleMenu() {
        isMenuVisible.value = !isMenuVisible.value;
      }
  
      return { isMenuVisible, toggleMenu };
    }
  }
  </script>
  
  <style>
  .button-container {
    width: 10%;
    height: 5%;
  }
  .menuIcon {
    
  }

  </style>
  