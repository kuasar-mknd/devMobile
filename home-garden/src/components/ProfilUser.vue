<template>
  <ion-grid>
    <ion-row>
      <ion-col>
        <div class="helloName">
          <div>Bonjour,</div>
          <h1>{{ name }}</h1>
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
.helloName{
  justify-content: left;
}
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
