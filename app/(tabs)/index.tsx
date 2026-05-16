import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { useQuery, useConvexAuth } from "convex/react";

import { api } from "@/convex/_generated/api";
import { COLORS } from "@/constants/theme";

import Post from "@/components/Post";
import StoriesSection from "@/components/StoriesSection";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { signOut } = useAuth();
  const { isAuthenticated } = useConvexAuth();

  const posts = useQuery(api.posts.getPosts);

  if (!isAuthenticated) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.message}>
          Please login in...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>
            Developer Feed
          </Text>

          <Text style={styles.subtitle}>
            Latest posts from the community
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => signOut()}
        >
          <Text style={styles.buttonText}>
            Sign out
          </Text>
        </TouchableOpacity>
      </View>

      <StoriesSection />

      <View style={{ height: 12 }} />
      {posts === undefined ? (
        <View style={styles.centerContainer}>
          <Text style={styles.message}>
            Loading posts...
          </Text>
        </View>
      ) : posts.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.message}>
            No posts yet. Create the first one!
          </Text>
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) =>
            item._id.toString()
          }
          renderItem={({ item }) => (
            <Post post={item} />
          )}
          contentContainerStyle={
            styles.listContent
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor:
      COLORS.surfaceLight,
  },

  title: {
    fontSize: 30,
    letterSpacing: 1,
    color: COLORS.white,
    fontFamily:
      "JetBrainsMono-Medium",
    marginBottom: 4,
  },

  subtitle: {
    color: "#6B7280",
    fontSize: 13,
    marginTop: 2,
  },

  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,

    borderWidth: 1,
    borderColor: "#4FC3F7",

    shadowColor: COLORS.primary,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },

  buttonText: {
    color: COLORS.white,
    fontFamily:
      "JetBrainsMono-Medium",
    fontSize: 14,
  },

  listContent: {
    paddingTop: 12,
    paddingBottom: 24,
  },

  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:
      COLORS.background,
  },

  message: {
    color: COLORS.grey,
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    fontFamily:
      "SpaceMono-Regular",
  },
});