import { StyleSheet, TextInput } from 'react-native';
import Colors from '@/constants/colors';
import Typography from '@/constants/typography';

const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.container.background,
    // backgroundColor: '#00FF0030', //debug
    padding: 16,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: Colors.container.background,
  },
  text: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.medium,
    color: Colors.text.primary,
  },
  textInput: {
    height: 40,
    borderColor: Colors.container.border,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.medium,
    color: Colors.text.primary,
  },
  button: {
    ...Typography.pressable,
    backgroundColor: Colors.container.accent,
    borderColor: Colors.container.border,
    borderWidth: 0,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  cancelButton: {
    ...Typography.pressable,
    backgroundColor: Colors.danger,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
});

export default GlobalStyles;
