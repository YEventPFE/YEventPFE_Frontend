import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useTranslation } from "react-i18next";
import AppTitle from "@/components/AppTitle";
import Colors from "@/constants/colors";
import Typography from "@/constants/typography";
import GlobalStyles from "@/styles/global";
import { Toast } from "react-native-toast-message/lib/src/Toast";

export type LoginFormProps = {
  onSubmit: (username: string, password: string) => Promise<void>;
  buttonLabel?: string;
  showTitle?: boolean;
};

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  buttonLabel = null,
  showTitle = false,
}) => {
  const { t } = useTranslation();
  if (!buttonLabel) {
    buttonLabel = t("login");
  }
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await onSubmit(username, password);
    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1: t('error_logging_in'),
        text2: (err as Error).message || t('please_try_again_later'),
      });
      setError(err.message || "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {showTitle && <AppTitle showSubtitle={false} />}
      <TextInput
        placeholder={t("username")}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder={t("password")}
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        secureTextEntry
        style={styles.input}
      />

      {error && <Text style={styles.error}>{error}</Text>}

      {loading ? (
        <ActivityIndicator size="small" color="#333" />
      ) : (
        <Button title={buttonLabel} color={styles.button.backgroundColor} onPress={handleLogin} />
      )}
    </View>
  );
};

export default LoginForm;


const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
    width: '100%',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    ...GlobalStyles.textInput,
    textAlign: "center",
    width: '50%',
    marginBottom: 10,
  },
  error: {
    ...Typography.error,
    marginBottom: 10,
  },
  button: {
    ...GlobalStyles.button,
  },
});
