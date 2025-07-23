import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import Colors from '@/constants/colors';
import Typography from '@/constants/typography';
import GlobalStyles from '@/styles/global';


type AppTitleProps = {
    showSubtitle?: Boolean;
}

const AppTitle : React.FC<AppTitleProps> = ({
    showSubtitle
}) => {
    const { t } = useTranslation();
    console.log('AppTitle rendered with showSubtitle:', showSubtitle);
    return (
    <>
        <Text style={ styles.title}>
            YEvent
        </Text>
        {showSubtitle !== false && (
            <Text style={styles.subtitle}>
                {t('motto')}
            </Text>
        )}
    </>
    );
}

export default AppTitle;

const styles = StyleSheet.create({
    title: {
        ...GlobalStyles.text,
        fontFamily: Typography.fontFamily.bold,
        fontSize: Typography.fontSize.xl,
        color: Colors.primary,
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        ...GlobalStyles.text,
        fontSize: Typography.fontSize.medium,
        color: Colors.text.secondary,
        textAlign: 'center',
    },
});