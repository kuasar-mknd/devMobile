<template>
  <ion-card>
    <img :src="imageSrc" class="imagePlante" />
    <ion-card-content>
      {{ name }}
      <br />
      <b>Watering :</b> {{ watering }}
    </ion-card-content>
  </ion-card>
  <!--
     <CardPlant
          imageSrc="https://ionicframework.com/docs/demos/api/card/madison.jpg"
          watering="2 fois par semaine"
        />
  -->
</template>

<script lang="ts">
import { IonCard, IonCardContent } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "CardPlant",
  components: { IonCard, IonCardContent },
  props: {
    imageSrc: String,
    watering: String,
    name: String,
  },
});
</script>

<style scoped>
.imagePlante {
  width: 100%;
  height: 100px;
  object-fit: cover;
}
</style>
