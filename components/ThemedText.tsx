import { theme } from '@/theme/theme';
import { Text, type TextProps, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'body';
  color?: 'light' | 'dark' | string;
};

export function ThemedText({ style, type = 'default', color, ...rest }: ThemedTextProps) {
  const { colors } = useTheme();

  const textColor =
    color === 'light'
      ? theme.colors.secondary
      : color === 'dark'
        ? theme.colors.primary
        : color || theme.colors.primary;

  return (
    <Text
      style={[
        { color: textColor },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? { ...styles.link, color: colors.primary } : undefined,
        type === 'body' ? { ...styles.body, color: colors.tertiary } : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 14,
    lineHeight: 24,
    fontFamily: 'System',
    fontWeight: '400',
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'System',
    fontWeight: '600',
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    fontFamily: 'System',
    lineHeight: 40,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '600',
    fontFamily: 'System',
    lineHeight: 28,
  },
  link: {
    lineHeight: 30,
    fontSize: 14,
    fontFamily: 'System',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  body: {
    lineHeight: 30,
    fontSize: 12,
    fontFamily: 'System',
    fontWeight: '500'
  }
});
