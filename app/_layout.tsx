import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import InitialLayout from "@/components/InitialLayout";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL;

if (!publishableKey) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

if (!convexUrl) {
  throw new Error(
    "Add your Convex URL to the .env file (EXPO_PUBLIC_CONVEX_URL)",
  );
}

const convex = new ConvexReactClient(convexUrl, {
  unsavedChangesWarning: false,
});

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={undefined}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
          <InitialLayout />
        </SafeAreaView>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
