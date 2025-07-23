export default {
  expo: {
    "plugins": [
      "expo-font",
      "expo-localization",
      "expo-secure-store",
    ],
    extra: {
      expectedServerVersion: '0.3.0',
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
