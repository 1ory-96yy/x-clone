import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Post from "../../components/Post";

export default function HomeScreen() {
  const { signOut } = useAuth();
  const posts = useQuery(api.posts.getPosts);

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
  message: {
    color: "#d1d5db",
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
  },
});
