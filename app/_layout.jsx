import { Stack } from "expo-router/stack";

const Layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(splash)/index" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
};

export default Layout;
