import RegisterForm from "@/components/RegisterForm";
import { register } from "@/viewModels/authViewModel";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { Toast } from "react-native-toast-message/lib/src/Toast";
export default function Register() {
    const { t } = useTranslation();
    const router = useRouter();
    
    return (
      <RegisterForm
        buttonLabel={t("register") || "Register"}
        onSubmit={async (username, password, email, birthdate, phoneNumber) => {
          try {
            const response = await register(username, password, email, birthdate, phoneNumber);
            console.debug("Register successful:", response);
            router.push("/(auth)/login"); // Redirect to login after successful registration
          } catch (error) {
            Toast.show({
              type: 'error',
              text1: t('error_registering'),
              text2: (error as Error).message || t('please_try_again_later'),
            });
            console.error("Register failed:", error);
          }
        }}
      />
    );
}