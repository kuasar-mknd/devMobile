# HomeGarden - Guide d'utilisation
## Présentation

HomeGarden est une application mobile conçue pour aider les passionnés de jardinage à créer et gérer leurs jardins. Elle offre des fonctionnalités pour ajouter des plantes, visualiser des jardins sur une carte, et bien plus encore. Ce projet utilise Vue.js, Ionic, et une API REST avec MongoDB.

Le backend est disponible [ici](https://github.com/kuasar-mknd/archiOweb-api)

## Prérequis

* Docker (pour utiliser le devcontainer)
* Node.js et npm (pour une installation locale sans Docker)
* Un environnement Android pour générer l'APK (si nécessaire)

# Utilisation avec Docker Devcontainer

Le projet est configuré pour être facilement exécuté avec Docker via un devcontainer. Cette méthode prend en charge l'exécution de l'application et la base de données MongoDB localement.

1. Clonez le dépôt : Clonez le dépôt GitHub du projet sur votre machine.

2. Ouvrez avec Docker : Utilisez Visual Studio Code avec l'extension "Remote - Containers" pour ouvrir le projet dans un conteneur Docker.

3. Exécutez l'application : Le devcontainer lancera automatiquement une base de données MongoDB et démarrera le backend localement ainsi que la commande `ionic serve`
# Utilisation sans Docker

Si vous préférez ne pas utiliser Docker, vous pouvez exécuter le projet localement en suivant ces étapes :

1. Configuration des variables d'environnement : Créez un fichier .env à la racine du projet et ajoutez les variables suivantes :
```env
VITE_API_URL=https://homegarden.onrender.com/api/
VITE_CLOUDINARY_URL=<Votre URL Cloudinary>
VITE_CLOUDINARY_UPLOAD_PRESET=<Votre preset Cloudinary>
```
Remplacez `<Votre URL Cloudinary>` et `<Votre preset Cloudinary>` par vos valeurs Cloudinary.

2. Installation des dépendances
```bash
npm install
```

4. Lancement de l'application :
```bash
ionic serve
```

## Application Android

Une version APK de l'application est disponible dans les [releases GitHub](https://github.com/kuasar-mknd/devMobile/releases). 

Téléchargez et installez l'APK sur votre appareil Android pour utiliser l'application.

## Progressive Web App (PWA)

La PWA HomeGarden est accessible sur [homegarden.kuasar.xyz](https://homegarden.kuasar.xyz). Elle est optimisée pour une utilisation sur iPhone et pour ceux qui préfèrent ne pas installer l'application Android.

## Contribution

Les contributions au projet sont les bienvenues. Veuillez suivre les pratiques habituelles de développement de logiciels open source pour soumettre des modifications ou des améliorations.
