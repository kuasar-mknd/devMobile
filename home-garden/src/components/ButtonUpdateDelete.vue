<template>
    <div>
      <img class="menuIcon" src="../../resources/dots_menu.png" alt="altMenu">
    </div>
  </template>
    
  <script>
  export default {
    name: 'ButtonUpdateDelete',
    props: {
      id: {
        type: String,
        required: true
      }
    },
    setup() {
    }
  }
  </script>
    
    <style>
      .menuIcon {
        width: 20px;
        height: 20px;
        margin: 0 10px;
      }
    </style>
    