<template>
  <div class="container">
    <ion-button class="buttonUpdateDelete" id="open-action-sheet">
        Supprimer le compte
    </ion-button>
    <ion-action-sheet
      trigger="open-action-sheet"
      class="my-custom-class"
      :buttons="actionSheetButtons"
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
  setup() {
    const store = useStore();
    const router = useRouter();
    const showEditForm = ref(false);

    const deleteUser = async () => {
      await store.dispatch("delUser");
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("user");
      router.push("/login");
    };

      const actionSheetButtons = [
        {
          text: 'Confirmer la suppression du compte',
          role: 'destructive',
          class: "destruction",
          handler: deleteUser // Utilisez `handler` ici
        },
        {
          text: 'Annuler',
          role: 'cancel',
          class: 'action-sheet-cancel'
        },
      ];

      const closeEditForm = () => {
        showEditForm.value = false;
      };
  
      return {
        actionSheetButtons,
        showEditForm,
        closeEditForm
      };
    },
  });
</script>

<style scoped>
.imgTroisPoints{
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
  .buttonUpdateDelete ion-button {
    background: red;
    color: #fff;
  }
ion-action-sheet.my-custom-class .action-sheet-cancel {
  color: #000000 !important; /* Change text color */
  background-color: white;
}
ion-action-sheet.my-custom-class .destrinction {
  color: #000000 !important; /* Change text color */
  background-color: white;
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
  AreaUpdateDelete ion-button {
      background-color: red;
      color: white;
  }
</style>
