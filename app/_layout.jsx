import { Stack } from "expo-router/stack";

const Layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(splash)/index" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="wallpaperDetail/[id]" />
    </Stack>
  );
};

export default Layout;
