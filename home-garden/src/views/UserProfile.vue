<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 3</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-label>
        <ion-buttons slot="end">
            <AreaUpdateDelete class="btnUpdDel"/>
        </ion-buttons>
        <h1 class="titrePage">Profil</h1>
        <ProfilUser class="profilUsr" name="Kermit" imgURL="https://s.yimg.com/ny/api/res/1.2/HJrbLM56ZSZRmYQeDcAtuw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTYxODtoPTQxMg--/https://media.zenfs.com/en_US/News/TheWrap/Mom_Turns_Herself_Into_Evil-99f50dd3df2549fe02d0a55ad3f7b399" />
      </ion-label>
    <div class="profile-section">
      <div class="profile-detail">
        <label>Identifiant</label>
        <span>Kermit</span>
      </div>
      </div>
      <ion-button expand="full" @click="showEditForm">Changer de mot de passe</ion-button>
      <ion-button expand="full" @click="logout">Se déconnecter</ion-button>
    </ion-content>
    <EditForm v-if="isEditFormVisible" @close="isEditFormVisible = false" />
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import AreaUpdateDelete from '@/components/AreaUpdateDelete.vue';
import ProfilUser from '@/components/ProfilUser.vue';
import EditForm from '@/components/EditForm.vue';

export default {
  name: 'UserProfile',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    AreaUpdateDelete,
    ProfilUser,
    EditForm
},
  setup() {
        const store = useStore();
        const router = useRouter();
        const isEditFormVisible = ref(false);

        const showEditForm = () => {
      isEditFormVisible.value = true;
    };
  const updatePwd = async () => {
  };
  const logout = async () => {
    await store.dispatch('logout');
    router.push('/login'); // Redirigez vers la page de connexion après déconnexion
  };
  return { logout, updatePwd, showEditForm, isEditFormVisible };
      }
  };

</script>
<style scoped>
  .btnUpdDel{
    margin-left: 80%;
    margin-top: 15%;
    height: 7%;
    width: 7%;
  }
  .titrePage{
    margin-left: 7%;
    margin-top: 5%;
    color: #37AA9F;
  }
  .profilUsr{
    margin-left: 5%;
    margin-top: 5%;
  }
  .profile-name {
    margin-top: 8px;
    font-weight: 600;
  }
  .profile-section {
    margin-top: 16px;
    margin-left: 5%;
    padding: 16px;
    font-family: 'Open Sans', sans-serif;
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
  </style>