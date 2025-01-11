import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerTitleAlign: "center", headerTintColor: "green" }}>
      <Stack.Screen name="index" options={{ headerTitle: "Login Portals" }} />
      <Stack.Screen name="contractBottom" options={{ headerTitle: "Contractor" }} />
      <Stack.Screen name="peopleBottom" options={{ headerTitle: "People" }} />
      <Stack.Screen name="gov" options={{ headerTitle: "Government" }} />
      {/* Add other screens here with their respective titles */}
    </Stack>
  );
}