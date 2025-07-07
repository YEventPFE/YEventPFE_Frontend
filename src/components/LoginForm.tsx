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

export type LoginFormProps = {
  onSubmit: (username: string, password: string) => Promise<void>;
  buttonLabel?: string;
};

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  buttonLabel = "Se connecter",
}) => {
  const { t } = useTranslation();
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
      setError(err.message || "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={t("username") || "Username"}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder={t("password") || "pptest"}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      {error && <Text style={styles.error}>{error}</Text>}

      {loading ? (
        <ActivityIndicator size="small" color="#333" />
      ) : (
        <Button title={buttonLabel} onPress={handleLogin} />
      )}
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    gap: 12,
    padding: 16,
  },
  input: {
    height: 44,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  error: {
    color: "red",
    fontSize: 14,
  },
});
