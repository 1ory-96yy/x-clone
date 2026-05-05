import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useAuth } from "@clerk/clerk-expo";

const feedData = [
  {
    id: "1",
    title: "New build ready",
    subtitle: "Review the latest app shell and layout changes.",
  },
  {
    id: "2",
    title: "Font assets loaded",
    subtitle: "SpaceMono and JetBrainsMono are now available.",
  },
  {
    id: "3",
    title: "FlatList screen",
    subtitle: "Developer feed is rendered using FlatList.",
  },
  {
    id: "4",
    title: "Clerk auth active",
    subtitle: "Sign out is still available from the header.",
  },
];

function FeedItem({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <View style={styles.item}>
      <Text style={styles.itemTitle}>{title}</Text>
      <Text style={styles.itemSubtitle}>{subtitle}</Text>
    </View>
  );
}

export default function HomeScreen() {
  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Developer Feed</Text>
          <Text style={styles.subtitle}>
            Live updates from the UI screen lesson
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => signOut()}>
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={feedData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FeedItem title={item.title} subtitle={item.subtitle} />
        )}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    color: "#fff",
    fontFamily: "JetBrainsMono-Medium",
    marginBottom: 4,
  },
  subtitle: {
    color: "#d1d5db",
    fontSize: 14,
    fontFamily: "SpaceMono-Regular",
  },
  button: {
    backgroundColor: "#1DA1F2",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "JetBrainsMono-Medium",
    fontSize: 14,
  },
  listContent: {
    paddingBottom: 24,
  },
  item: {
    backgroundColor: "#111827",
    borderRadius: 16,
    padding: 18,
  },
  itemTitle: {
    fontSize: 18,
    color: "#fff",
    fontFamily: "JetBrainsMono-Medium",
    marginBottom: 6,
  },
  itemSubtitle: {
    color: "#9ca3af",
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "SpaceMono-Regular",
  },
  separator: {
    height: 12,
  },
});
