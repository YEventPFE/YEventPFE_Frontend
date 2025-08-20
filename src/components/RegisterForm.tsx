import React, {useState} from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import {useTranslation} from "react-i18next";
export type RegisterFormProps = {
  onSubmit: (
    username: string,
    password: string,
    email: string,
    birthdate: Date,
    phoneNumber: string
  ) => Promise<void>;
  buttonLabel?: string;
};

import Typography from "@/constants/typography";
import GlobalStyles from "@/styles/global";
import CrossPlatformDatePicker from "./CrossPlatformDatePicker";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const RegisterForm : React.FC<RegisterFormProps> = ({
  onSubmit,
    buttonLabel = null,
}) => {
    const {t} = useTranslation();
    if (!buttonLabel) {
        buttonLabel = t("register");
    }
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthdate, setBirthdate] = useState<Date | null>(new Date());
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        setError(null);
        setLoading(true);
        try {
            await onSubmit(username, password, email, birthdate!, phoneNumber);
        } catch (err: any) {
            Toast.show({
                type: 'error',
                text1: t('error_registering'),
                text2: (err as Error).message || t('please_try_again_later'),
            });
            setError(err.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };
    return (
        <View style={styles.container}>
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
                secureTextEntry
                style={styles.input}
            />
            <TextInput
                placeholder={t("email")}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                style={styles.input}
            />
            <CrossPlatformDatePicker
                date={birthdate || new Date()}
                onChange={(date: Date) => {
                    setBirthdate(date);
                }}
                placeholderText={t("select_birthdate")}
                showYearDropdown={true}
            />
            <TextInput
                placeholder={t("phoneNumber")}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                autoCapitalize="none"
                style={styles.input}
            />
            <View style={styles.buttonRegisterContainer}>
                <Button
                    title={buttonLabel}
                    color={styles.button.backgroundColor}
                    accessibilityLabel={buttonLabel}
                    onPress={handleRegister}
                    disabled={loading}
                />
                {error && <Text style={styles.error}>{error}</Text>}
                {loading && (
                    <>
                        <ActivityIndicator size="small" color="#333" />
                        <Text>{t('loading')}</Text>
                    </>
                )}
            </View>
        </View>
    );
}

export default RegisterForm;

const styles = StyleSheet.create({
    container: {
        ...GlobalStyles.container,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    input: {
        ...GlobalStyles.textInput,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    error: {
        ...Typography.error,
        marginBottom: 10,
    },
    button: {
        ...GlobalStyles.button,
        marginTop: 10,
    },
    buttonRegisterContainer: {
        marginTop: 30,
    },
});