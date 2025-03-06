import { theme } from "@/theme/theme";
import { Tabs } from "expo-router";
import { Icon } from "react-native-paper";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.tertiary,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#ddd",
          height: 60,
          paddingBottom: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Icon source="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="account/index"
        options={{
          title: "Account",
          tabBarIcon: ({ color, size }) => (
            <Icon source="account" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="users/index"
        options={{
          title: "Nearby users",
          tabBarIcon: ({ color, size }) => (
            <Icon source="account" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          tabBarIcon: ({ color, size }) => (
            <Icon source="chat-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
