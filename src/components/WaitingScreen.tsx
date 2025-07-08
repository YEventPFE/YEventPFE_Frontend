import { useTranslation } from "react-i18next";
import { ActivityIndicator, View, Text, StyleSheet } from "react-native";
import AppTitle from "@/components/AppTitle";

type WaitingScreenProps = {
    loadingText?: string;
    showTitle?: boolean;
}

const WaitingScreen : React.FC<WaitingScreenProps> = ({
    loadingText,
    showTitle = true,
}) => {
    const {t} = useTranslation();
    return (
        <View style={styles.centered}>
            {showTitle && (
                <AppTitle/>
            )}
            <ActivityIndicator style={styles.spinner} size="large" color="#0000ff" />
            <Text>
                {loadingText || t('loading')}
            </Text>
        </View>
    );
}

export default WaitingScreen;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  spinner:{
    marginBottom: 20,
  }
});
