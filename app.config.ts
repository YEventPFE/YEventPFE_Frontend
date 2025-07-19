export default {
  expo: {
    "plugins": [
      "expo-font",
      "expo-localization"
    ],
    extra: {
      expectedServerVersion: '0.1.0',
    },
  },
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      '@': ['./src'],
      "assets/*": ["assets/*"],
      "components/*": ["src/components/*"],
    }
  },
};
