import LoginForm from "@/components/LoginForm";
import { login } from "@/viewModels/authViewModel";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { useRouter } from "expo-router";

export default function Login() {
    const { t } = useTranslation();
    const router = useRouter();
    
    return (
      <View style={styles.container}>
        <LoginForm
          buttonLabel={t("login") || "Log In"}
          showTitle={true}
          onSubmit={async (username, password) => {
            try {
              const response = await login(username, password);
              console.log("Login successful:", response);
              router.replace("/(tabs)/main");
            } catch (error) {
              console.error("Login failed:", error);
            }
          }}
          />
          <Pressable onPress={() => {
            router.push("/(auth)/register");
          }}>
            <Text>{t("no_account_create_one")}</Text>
          </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: "80%",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});