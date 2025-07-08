import LoginForm from "@/components/LoginForm";
import { login } from "@/services/authService";
import { useTranslation } from "react-i18next";

export default function Login() {
    const { t } = useTranslation();
    
    return (
      <LoginForm
        buttonLabel={t("login") || "Log In"}
        onSubmit={async (username, password) => {
          try {
            const response = await login(username, password);
            console.log("Login successful:", response);
          } catch (error) {
            console.error("Login failed:", error);
          }
        }}
      />
    );
}