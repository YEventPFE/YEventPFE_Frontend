import RegisterForm from "@/components/RegisterForm";
import { register } from "@/viewModels/authViewModel";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
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
            console.error("Register failed:", error);
          }
        }}
      />
    );
}