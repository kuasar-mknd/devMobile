<template>
  <ion-grid>
    <ion-row>
      <ion-col>
        <div class="helloName">
          <p class="text-gray-600">Bonjour,</p>
          <h1 class="text-2xl font-extrabold">{{ name }}</h1>
        </div>
      </ion-col>
      <ion-col size="auto">
        <div class="profilPicture">
          <ion-avatar slot="start">
          <img :src="imgURL" alt="Photo de profil">
        </ion-avatar>
        </div>
        
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
export default {
  name: 'ProfilUser',
  props: {
    name: {
      type: String,
      required: true
    },
    imgURL: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.profilPicture {
  height: 7rem;
  width: 7rem;
  overflow: hidden;
}

.roundedImage {
  height: 100%;
  width: 100%;
  border-radius: 50%;
  object-fit: cover;
}

h1 {
  font-weight: 600;
}
</style>
