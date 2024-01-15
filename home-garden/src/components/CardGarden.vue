<template>

    <ion-list :inset="true">
      <ion-item :button="true" :detail="true" class="custom-detail-icon">
        <ion-img slot="start" :src="imageSrc"></ion-img>
        <ion-label>{{ label }}
          <p>{{ localisation }}</p>
        </ion-label>
      </ion-item>
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
    setup() {
      return { chevronForward, listCircle };
    },
  });
</script>

<style scoped>


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