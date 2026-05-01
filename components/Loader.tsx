import { View, ActivityIndicator } from "react-native";

export default function Loader() {
  return (
    <View style={{ marginTop: 30 }}>
      <ActivityIndicator size="large" />
    </View>
  );
}