import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { theme } from "@/theme/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider, useSelector } from "react-redux";
import { store } from "@/store";
import { SocketProvider } from "../contexts/SocketContext";
import { selectUser } from "@/store/selectors/authSelectors";
import SnackbarComponent from "@/components/SnackbarComponent";

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <SocketProvider>
        <QueryClientProvider client={queryClient}>
          <PaperProvider theme={theme}>
            <SnackbarComponent />
            <Stack screenOptions={{ headerShown: false }} />
          </PaperProvider>
        </QueryClientProvider>
      </SocketProvider>
    </Provider>
  );
}
