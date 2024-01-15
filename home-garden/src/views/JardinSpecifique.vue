<template>
    <ion-page class="ion-margin-horizontal">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>Back Button</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true" class="content">
            <ion-grid>
                <ion-row class="ion-justify-content-center">
                    <ion-col size="3">
                        <ion-img
                        src="../../resources/homegardenLogo_transparent-resize.png"
                        alt="logo de homegarden, plante centrale à 3 feuilles avec le titre homegarden dessous">
                    </ion-img>
                </ion-col>
            </ion-row>
        </ion-grid>
        
        <ion-grid>
            <ion-row class="ion-justify-content-center">
                <ion-col size="3">
                    <ion-text class="ion-text-center">
                        <p>Plongez dans le monde secret de la botanique! Créez et gérez vos jardins où seules vos mains vertes auront accès à ces oasis cachées.</p>
                    </ion-text>
                </ion-col>
            </ion-row>
        </ion-grid>
        
        <ion-title color="tertiary" class="ion-margin-bottom">Mes jardins</ion-title>
        <SearchBar></SearchBar>
        
        <ion-grid>
            <ion-row class="ion-justify-content-center">
                <ion-col size="3">
                    <ButtonAdd></ButtonAdd>
                </ion-col>
            </ion-row>
        </ion-grid>
    </ion-content>
</ion-page>
</template>



<script lang="ts">
import { IonBackButton, IonButtons, IonHeader, IonToolbar, IonGrid, IonPage,IonRow, IonCol,IonImg,IonTitle, IonContent,IonText } from '@ionic/vue';
import SearchBar from '../components/SearchBar.vue';
import ButtonAdd from '../components/ButtonAdd.vue';
import { useRouter } from 'vue-router';

export default {
    components: {
        IonBackButton, 
        IonButtons, 
        IonHeader, 
        IonTitle, 
        IonToolbar,
        IonGrid,
        IonRow,
        IonCol,
        IonImg,
        IonPage,
        IonContent,
        SearchBar,
        ButtonAdd,
        IonText
    },
    setup() {
        const router = useRouter();
        
        const goToJardinSpecifique = () => {
            router.push({ name: 'JardinSpecifique' }); // Use the correct route name or path
        };
        
        return {
            goToJardinSpecifique,
        };
    }
}

</script>

<style>
.class-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
}

ion-col {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}


</style>