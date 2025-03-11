import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { theme } from "@/theme/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store } from "@/store";

export default function RootLayout() {
  const queryClient = new QueryClient();
  console.log(process.env);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PaperProvider theme={theme}>
          <Stack screenOptions={{ headerShown: false }} />
        </PaperProvider>
      </QueryClientProvider>
    </Provider>
  );
}
