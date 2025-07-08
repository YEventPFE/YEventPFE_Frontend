import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';


type AppTitleProps = {
    showSubtitle?: Boolean;
}

const AppTitle : React.FC<AppTitleProps> = (
    showSubtitle
) => {
    const { t } = useTranslation();
    return (
    <>
        <Text style={ styles.title}>
            YEvent
        </Text>
        <Text style={ styles.subtitle}>
            {showSubtitle ? t('motto') : ''}
        </Text>
    </>
    );
}

export default AppTitle;

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
        marginBottom: 20,
    }
});