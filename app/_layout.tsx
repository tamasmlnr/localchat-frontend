import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { useColorScheme } from "@/hooks/useColorScheme";
import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";
import { theme } from "@/theme/theme";

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <Stack screenOptions={{ headerShown: false }} />
    </PaperProvider>
  );
}
