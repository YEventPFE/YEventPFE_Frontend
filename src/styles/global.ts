import { StyleSheet, TextInput } from 'react-native';
import Colors from '@/constants/colors';
import Typography from '@/constants/typography';
import { Button } from '@react-navigation/elements';

const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
  text: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.medium,
    color: Colors.textPrimary,
  },
  textInput: {
    height: 40,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.medium,
    color: Colors.textPrimary,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: 'center',
  }
});

export default GlobalStyles;
