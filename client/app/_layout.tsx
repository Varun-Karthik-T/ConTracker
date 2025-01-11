import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerTitleAlign: "center", headerTintColor: "#2c3e50" }}>
      <Stack.Screen name="index" options={{ headerTitle: "Login Portals" }} />
      <Stack.Screen name="contractBottom" options={{ headerTitle: "Contractor" }} />
      <Stack.Screen name="peopleBottom" options={{ headerTitle: "People" }} />
      <Stack.Screen name="gov" options={{ headerTitle: "Government" }} />
      <Stack.Screen name="ContractDesc" options={{ headerTitle: "" }} />
      <Stack.Screen name="TenderDesc" options={{ headerTitle: "Tender Details" }} />
      <Stack.Screen name="bid" options={{ headerTitle: "Bid Info" }} />
      <Stack.Screen name="bidauth" options={{ headerTitle: "" }} />
      <Stack.Screen name="Paymentdesc" options={{ headerTitle: "Payment Description" }} />
      {/* Add other screens here with their respective titles */}
    </Stack>
  );
}