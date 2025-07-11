// just welcome text


import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet } from "react-native";
import AppTitle from "@/components/AppTitle";

export default function Main() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <AppTitle showSubtitle={true} />
      <Text style={styles.welcomeText}>{t("welcome_to_your_yevent")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  welcomeText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "#333",
  },
});