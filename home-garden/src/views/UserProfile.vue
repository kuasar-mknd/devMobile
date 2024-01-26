<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-row class="ion-justify-content-center">
          <ion-col>
            <ion-img
              src="/homegardenLogo_transparent-resize.png"
              alt="logo de homegarden, plante centrale à 3 feuilles avec le titre homegarden dessous"
            >
            </ion-img>
          </ion-col>
        </ion-row>
      </ion-toolbar>
    </ion-header>
    <ion-content
      :fullscreen="true"
      class="content ion-margin-horizontal ion-padding"
    >
      <ion-grid class="custom-grille">
        <ion-row class="ion-justify-content-center">
          <ion-col size="auto">
            <ion-button @click="logout">Se déconnecter</ion-button>
          </ion-col>
        </ion-row>
        <ion-row class="ion-justify-content-center">
          <ion-col size="auto" class="delBtn">
            <AreaUpdateDelete class="delBtn" />
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonGrid,
  IonCol,
  IonRow,
  IonHeader,
  IonContent,
  IonButton,
  IonToolbar,
  IonImg,
} from "@ionic/vue";
import AreaUpdateDelete from "../components/AreaUpdateDelete.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref, getCurrentInstance } from "vue";

export default {
  name: "UserProfile",
  components: {
    IonGrid,
    IonCol,
    IonRow,
    IonPage,
    IonHeader,
    IonContent,
    IonButton,
    AreaUpdateDelete,
    IonToolbar,
    IonImg,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const dataUser = ref({
      identifier: localStorage
        .getItem("email")
        ?.substring(1, localStorage.getItem("email").length - 1),
      username: localStorage
        .getItem("email")
        ?.substring(1, localStorage.getItem("email").indexOf("@")),
      name: null,
      surname: null,
      birthdate: null,
    });

    const logout = async () => {
      await store.dispatch("logout");
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("user");
      router.push("/login");
    };
    const internalInstance = getCurrentInstance();
    const isMenuVisible = ref(false);

    function toggleMenu() {
      isMenuVisible.value = !isMenuVisible.value;
      if (isMenuVisible.value) {
        internalInstance?.emit("open-action-sheet");
      }
    }
    return {
      logout,
      dataUser,
      toggleMenu,
      isMenuVisible,
    };
  },
};
</script>
<style scoped>
.delBtn {
  --background: red;
  --color: white;
}

.btnUpdDel {
  margin-left: 80%;
  margin-top: 15%;
  height: 7%;
  width: 7%;
}
.titrePage {
  margin-left: 7%;
  margin-top: 5%;
  color: #37aa9f;
}
.profilUsr {
  margin-left: 5%;
  margin-top: 5%;
}

.profile-name {
  margin-top: 8px;
}
.profile-section {
  margin-top: 16px;
  margin-left: 4%;
  padding: 16px;
  font-family: "Open Sans", sans-serif;
}
.profile-section h2 {
  font-size: 1.2em;
  margin-bottom: 16px;
}
.profile-detail {
  margin-bottom: 8px;
}
.profile-detail label {
  display: block;
  font-weight: 600;
  margin-bottom: 4px;
}
.profile-detail span {
  display: block;
}
.change-password {
  display: block;
  text-align: center;
  margin-top: 24px;
  color: #387ef5;
  font-weight: 600;
}

.custom-grille {
  margin-top: 25%;
}
</style>
