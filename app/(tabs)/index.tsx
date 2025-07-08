
import { Button, Text, View } from "react-native";
import { login, register } from "@/services/authService";
import { getServerVersion } from "@/services/serverStatusService";
import LoginForm from "@/components/LoginForm";
import { useTranslation } from "react-i18next";
import RegisterForm from "@/components/RegisterForm";

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
      <Button onPress={async () => {
        getServerVersion()
          .then((version) => {
            console.log("Server version:", version);
          })
          .catch((error) => {
            console.error("Error fetching server version:", error);
          });
      }}
      title="version"/>
      <RegisterForm
        buttonLabel={t('register') || 'Register'}
        onSubmit={async (username, password, email, birthdate, phoneNumber) => {
          try {
            const response = await register(username, password, email, birthdate, phoneNumber);
            console.log('Registration successful:', response);
          } catch (error) {
            console.error('Registration failed:', error);
          }
        }}
      />
  
    </View>
  );

}
