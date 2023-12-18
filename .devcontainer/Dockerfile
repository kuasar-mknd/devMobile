# Utilisation de l'image de base Node.js
FROM node:latest

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers 'package.json' et 'package-lock.json' (si disponible)
COPY package*.json ./

# Installation des dépendances globales
RUN npm install -g @ionic/cli @vue/cli

# Installation des dépendances du projet
RUN npm install

# Copier les fichiers et dossiers restants du projet dans le conteneur
COPY . .

# Exposer le port utilisé par l'application
EXPOSE 8100

# Commande pour démarrer l'application
CMD ["ionic", "serve", "--external"]
