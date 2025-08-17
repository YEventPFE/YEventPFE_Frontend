import LoginForm from "@/components/LoginForm";
import { login } from "@/viewModels/authViewModel";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { useRouter } from "expo-router";
import Colors from "@/constants/colors";
import Typography from "@/constants/typography";
import GlobalStyles from "@/styles/global";
import { Toast } from "react-native-toast-message/lib/src/Toast";


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
              console.debug("Login successful:", response);
              router.replace("/(tabs)/main");
            } catch (error) {
              Toast.show({
                type: 'error',
                text1: t('error_logging_in'),
                text2: (error as Error).message || t('please_try_again_later'),
              });
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
    ...GlobalStyles.container,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  }
});