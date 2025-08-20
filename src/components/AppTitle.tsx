import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import Colors from '@/constants/colors';
import Typography from '@/constants/typography';
import GlobalStyles from '@/styles/global';


type AppTitleProps = {
    showSubtitle?: Boolean;
    userName?: string;
}

const AppTitle : React.FC<AppTitleProps> = ({
    showSubtitle,
    userName
}) => {
    const { t } = useTranslation();
    return (
      <>
        <Text style={styles.title}>YEvent</Text>
        {userName && (
          <Text style={styles.greeting}>{t("hello")} { userName }</Text>
        )}
        {showSubtitle !== false && (
          <Text style={styles.subtitle}>{t("motto")}</Text>
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
        letterSpacing: 8,
        textAlign: 'center',
        marginBottom: 8,
    },
    greeting:{
        ...GlobalStyles.text,
        fontSize: Typography.fontSize.medium,
        color: Colors.text.secondary,
        textAlign: 'center',
    },
    subtitle: {
        ...GlobalStyles.text,
        fontSize: Typography.fontSize.medium,
        color: Colors.text.secondary,
        textAlign: 'center',
    },
});

