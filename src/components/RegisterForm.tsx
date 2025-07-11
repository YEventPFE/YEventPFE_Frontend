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
    const [birthdate, setBirthdate] = useState<Date | null>(null);
    const [birthdateString, setBirthdateString] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        setError(null);
        setLoading(true);
        try {
            await onSubmit(username, password, email, birthdate!, phoneNumber);
        } catch (err: any) {
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
            <TextInput
                placeholder={t("birthdate")}
                value={birthdateString}
                onChangeText={(text) => {
                    try{
                        setBirthdateString(text);
                        setBirthdate(new Date(text))
                        console.log("Birthdate set to:", birthdate);
                    }catch (e) {
                        setError("Invalid date format");
                        console.error("Invalid date format", e);
                        return;
                    }
                }}
                autoCapitalize="none"
                style={styles.input}
            />
            <TextInput
                placeholder={t("phoneNumber")}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                autoCapitalize="none"
                style={styles.input}
            />
            {error && <Text style={styles.error}>{error}</Text>}
            <Button
                title={buttonLabel}
                onPress={handleRegister}
                disabled={loading}
            />
            {loading && <ActivityIndicator size="small" color="#333" />}
        </View>
    );
}

export default RegisterForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});