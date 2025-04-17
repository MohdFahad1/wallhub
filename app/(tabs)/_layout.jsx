import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarItemStyle: {
          borderRadius: 30,
          marginHorizontal: 8,
          marginVertical: 10,
          overflow: "hidden",
        },

        // ICON COLORS
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "black",

        // PILL BACKGROUNDS
        tabBarActiveBackgroundColor: "#000",
        tabBarInactiveBackgroundColor: "transparent",

        tabBarStyle: {
          position: "absolute",
          height: 60,
          borderTopWidth: 0,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          elevation: 5, // Android shadow
          shadowOpacity: 0.1, // iOS shadow
          backgroundColor: "#fff",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="th-list" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="search" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="heart" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
