import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { useQuery, useConvexAuth } from "convex/react";
import { api } from "@/convex/_generated/api";
import Post from "../../components/Post";
import { Redirect } from "expo-router";

export default function HomeScreen() {
  const { signOut } = useAuth();
  const { isAuthenticated } = useConvexAuth();
  const posts = useQuery(api.posts.getPosts);

  

  if (!isAuthenticated) {
    return <Redirect href={"/(auth)/login"} />;
  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Developer Feed</Text>
          <Text style={styles.subtitle}>Latest posts from the community</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => signOut()}>
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </View>

      {posts === undefined ? (
        <Text style={styles.message}>Loading posts...</Text>
      ) : posts.length === 0 ? (
        <Text style={styles.message}>No posts yet. Create the first one!</Text>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => <Post post={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
    color: "#fff",
  },
  title: {
    fontSize: 28,
    color: "#000",
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
  message: {
    color: "#d1d5db",
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
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
