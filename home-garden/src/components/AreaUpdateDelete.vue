<template>
  <div class="container">
    <ion-button id="open-action-sheet">Open</ion-button>
    <ion-action-sheet
      trigger="open-action-sheet"
      class="my-custom-class"
      :buttons="actionSheetButtons"
      @didDismiss="logResult($event)"
    ></ion-action-sheet>
  </div>
</template>

<script lang="ts">
  import { IonActionSheet, IonButton } from '@ionic/vue';

  export default {
    components: { IonActionSheet, IonButton },
    name:"AreaUpdateDelete",
    setup() {
      const actionSheetButtons = [
        {
          text: 'Supprimer',
          role: 'destructive',
          data: {
            action: 'Supprimer',
          },
        },
        {
          text: 'Modifier',
          data: {
            action: 'Modifier',
          },
        },
        {
          text: 'Annuler',
          role: 'cancel',
          class: 'action-sheet-cancel',
          data: {
            action: 'Annuler',
          },
        },
      ];

      const logResult = (ev: CustomEvent) => {
        console.log(JSON.stringify(ev.detail, null, 2));
      };

      return {
        actionSheetButtons,
        logResult,
      };
    },
  };
</script>

<style>

ion-action-sheet.my-custom-class .action-sheet-cancel {
  color: #A99F9F !important; /* Change text color */
}

.container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    flex-direction: column;
  }

  ion-action-sheet.my-custom-class .action-sheet-group {
    background: rgba(212, 230, 219, 1);
  }

  ion-action-sheet.my-custom-class .action-sheet-title {
    color: #fff;
  }

  ion-action-sheet.my-custom-class .action-sheet-button,
  ion-action-sheet.my-custom-class .action-sheet-button.ion-focused {
    color: #000000;

  }

  @media (any-hover: hover) {
    ion-action-sheet.my-custom-class .action-sheet-button:hover {
      color: #000000;
    }
  }

  ion-action-sheet.my-custom-class ion-backdrop {
    opacity: 0.6;
  }
</style>

