import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { useColorScheme } from "@/hooks/useColorScheme";
import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";
import { theme } from "@/theme/theme";
import { QueryClient, QueryClientProvider } from "react-query";

export default function RootLayout() {

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <Stack screenOptions={{ headerShown: false }} />
      </PaperProvider>
    </QueryClientProvider>
  );
}
