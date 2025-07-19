import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';


export type NoInternetScreenProps = {
    onRetry: () => void;
};


const NoInternetScreen: React.FC<NoInternetScreenProps> = ({ onRetry }) => {
    const {t} = useTranslation();
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t('no_internet_connection')}</Text>
            <Text style={styles.message}>{t('please_check_internet_connection')}</Text>
            <Button title={t('retry')} onPress={onRetry} />
        </View>
    );
};

export default NoInternetScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
});