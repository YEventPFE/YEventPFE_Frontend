# YEvent

YEvent_Front est la partie front de l'application YEvent développée avec [Expo](https://expo.dev/) en React Native.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :
- [Node.js](https://nodejs.org/) **v22.13** ou supérieur
- [npm](https://www.npmjs.com/) (installé avec Node.js)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) :  
   ```bash
   npm install -g expo-cli
   ```
- Expo SDK **53**
- Un éditeur de code (ex : [Visual Studio Code](https://code.visualstudio.com/))
- Un émulateur mobile ou un appareil physique pour tester l’application

## Installation

1. Clonez le dépôt.
2. Installez les dépendances :
    ```bash
    npm install
    ```
3. Configurez le fichier `.env` avant le premier lancement avec l'adresse du serveur YEvent_back.

## Lancement de l'application

```bash
npx expo start
```

## Traduction

Une commande i18n est disponible pour rajouter les traductions manquantes dans les fichiers json de i18n :
```bash
npm run i18n:extract
```

## Linting

Pour vérifier le code avec ESLint :
```bash
npm run lint
```
Ou utiliser l'extension VSCode ESLint.

## Tests

Pour lancer les tests avec Jest :
```bash
npm run test
```
Cela va générer un rapport de test dans ./test-report.html
