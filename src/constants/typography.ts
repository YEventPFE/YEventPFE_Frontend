import Colors from "@/constants/colors";

const Typography = {
  fontFamily: {
    regular: 'System',
    bold: 'System-Bold',
  },
  fontSize: {
    small: 12,
    medium: 16,
    large: 20,
    xl: 24,
  },
  title: {
    fontFamily: 'System-Bold',
    fontSize: 24,
    color: Colors.text.primary,
  },
  subtitle: {
    fontFamily: 'System',
    fontSize: 16,
    color: Colors.text.secondary,
  },
  body: {
    fontFamily: 'System',
    fontSize: 14,
    color: Colors.text.primary,
  },
  tag: {
    fontFamily: 'System',
    fontSize: 12,
    color: Colors.text.tag,
  },
  error: {
    fontFamily: 'System',
    fontSize: 14,
    color: Colors.text.error,
  }
};

export default Typography;
