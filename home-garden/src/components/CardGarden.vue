<template>

    <ion-list class="card" :inset="true">
      <div @click="navigateToGarden" >
      <ion-item :button="true" :detail="true" class="custom-detail-icon">
        <ion-img slot="start" :src="imageSrc"></ion-img>
        <ion-label>{{ label }}
        </ion-label>
      </ion-item>
    </div>
    </ion-list>


  <!--       
    <CardGarden
          label="salut"
          imageSrc="https://ionicframework.com/docs/demos/api/list/avatar-finn.png"
        />
        -->
</template>

<script lang="ts">
  import {

    IonItem,
    IonLabel,
    IonList,
    IonImg,

  } from '@ionic/vue';
  import { defineComponent,PropType } from 'vue';
  import { chevronForward, listCircle  } from 'ionicons/icons';

  export default defineComponent({
    name: 'CardGarden',
    components: {
      IonItem,
      IonLabel,
      IonList,
      IonImg,

    },
    props: {
    label: String as PropType<string>,
    imageSrc: String as PropType<string>,
    localisation: Array as PropType<string[]>,
    },
    methods: {
    navigateToGarden() {
      this.$emit('navigate');
    }
  },
    setup() {
      return { chevronForward, listCircle };
    },
  });
</script>

<style scoped>

.card {
  border: 1.5px solid #FDAE36;
  padding-top: 2%;
  padding-bottom: 2%;
  margin-left: 1%;
  box-shadow: 1px 1px 5px #b4b3b2;
}

.custom-detail-icon::part(native) {
  --detail-icon-color: rgb(253, 174, 54); /* Solid color for the detail icon */
  --detail-icon-opacity: 1; /* Remove transparency */
}
  .unread-indicator {
    background: var(--ion-color-primary);

    width: 10px;
    height: 10px;

    border-radius: 100%;

    position: absolute;

    inset-inline-start: 12px;
    top: 12px;
  }
  

  .metadata-end-wrapper {
    position: absolute;

    top: 10px;
    inset-inline-end: 10px;

    font-size: 0.8rem;

    display: flex;
    align-items: center;
  }

  ion-label strong {
    display: block;

    max-width: calc(100% - 60px);

    overflow: hidden;

    text-overflow: ellipsis;
  }

  ion-label ion-note {
    font-size: 0.9rem;
  }
</style>