import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "../views/TabsPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/tabs/jardin",
  },
  {
    path: "/welcome",
    component: () => import("@/views/WelcomePage.vue"), // Ajouter la route de bienvenue
  },
  {
    path: "/login",
    component: () => import("@/views/LoginAuth.vue"), // Ajouter la route de connexion
  },
  {
    path: "/register",
    component: () => import("@/views/RegisterAuth.vue"), // Ajouter la route d'inscription
  },

  {
    path: "/DetailPlante/:id",
    name: "DetailPlante",
    props: true,
    component: () => import("@/views/DetailsPlante.vue"), // Ajouter la route d'inscription
  },

  {
    path: "/tabs/",
    component: TabsPage,
    children: [
      {
        path: "",
        redirect: "/tabs/jardin",
      },
      {
        path: "jardin",
        component: () => import("@/views/JardinPage.vue"),
      },
      {
        path: "/jardin-specifique/:id",
        name: "JardinSpecifique",
        props: true,
        component: () => import("@/views/JardinSpecifique.vue"),
      },
      {
        path: "/AjouterPlante/:id",
        name: "AjouterPlante",
        props: true,
        component: () => import("@/views/PlantPage.vue"), // Ajouter la route d'inscription
      },
      {
        path: "user",
        component: () => import("@/views/UserProfile.vue"),
      },
      {
        path: "map",
        component: () => import("@/views/ProxiMap.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register", "/welcome"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  if (authRequired && !loggedIn) {
    next("/welcome");
  } else {
    next();
  }
});

export default router;
