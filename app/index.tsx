
import { Button, Text, View } from "react-native";
import { login } from "@/services/authService";
import LoginForm from "@/components/LoginForm";
import { useTranslation } from "react-i18next";

export default function Index() {
  const { t } = useTranslation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoginForm
        buttonLabel={t('login') || 'Log In'}
        onSubmit={async (username, password) => {
          try {
            const response = await login(username, password);
            console.log('Login successful:', response);
          } catch (error) {
            console.error('Login failed:', error);
          }
        }}
      />
    </View>
  );

}
