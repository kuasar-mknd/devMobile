<template>
  <div class="container">
    <!-- Ion Button avec une image -->
    <ion-button class="buttonUpdateDelete" :id="`open-action-sheet-${plantId}`">
      <div class="imgTroisPoints">
        <img
          class="button-image"
          src="/dots_menu.png"
          alt="Description de l'image"
        />
      </div>
    </ion-button>
    <ion-action-sheet
      :trigger="`open-action-sheet-${plantId}`"
      class="my-custom-class"
      :buttons="actionSheetButtons"
      @didDismiss="logResult($event)"
    ></ion-action-sheet>
    <EditForm v-if="showEditForm" @close="closeEditForm" />
  </div>
</template>

<script lang="ts">
import { IonActionSheet, IonButton } from "@ionic/vue";
import { defineComponent, ref } from "vue";
import EditForm from "./EditForm.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  components: { IonActionSheet, IonButton, EditForm },
  name: "AreaUpdateDelete",
  props: {
    plantId: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const router = useRouter();
    const showEditForm = ref(false);

    const actionSheetButtons = [
      {
        text: "Supprimer",
        role: "destructive",

        handler: () => {
          emit("delete-plant");
          router.back();
        },
      },
      {
        text: "Modifier",
        handler: () => {
          emit("edit-plant");
        },
      },
      {
        text: "Annuler",
        role: "cancel",
        class: "action-sheet-cancel",
      },
    ];

    const logResult = (ev: CustomEvent) => {
    };

    const closeEditForm = () => {
      showEditForm.value = false;
    };

    return {
      actionSheetButtons,
      showEditForm,
      logResult,
      closeEditForm,
    };
  },
});
</script>

<style scoped>
.imgTroisPoints {
  width: 25px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;
}
.buttonUpdateDelete .button-image {
  width: 100%; /* Ajuster selon vos besoins */
  height: 100%; /* Ajuster selon vos besoins */
}
ion-action-sheet.my-custom-class .action-sheet-cancel {
  color: #a99f9f !important; /* Change text color */
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;
}
.button-container {
  width: 100%;
  height: 100%;
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
