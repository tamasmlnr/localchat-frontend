import ProfilePhotoIcon from "@/components/ProfilePhotoIcon";
import { useGetUserDetails } from "@/hooks/queries/useGetUserDetails";
import { selectUser } from "@/store/selectors/authSelectors";
import { theme } from "@/theme/theme";
import { Tabs } from "expo-router";
import { Icon } from "react-native-paper";
import { useSelector } from "react-redux";

export default function TabLayout() {
  const userId = useSelector(selectUser);
  const { data: currentUser, refetch, isFetching } = useGetUserDetails(userId ?? '');

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
          title: "Account",
          tabBarIcon: ({ color, size }) => (
            <ProfilePhotoIcon source={currentUser?.profilePhotoUrl} size={size} />
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
