import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useQuery, useConvexAuth } from "convex/react";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

import { api } from "@/convex/_generated/api";
import Post from "@/components/Post";
import StoriesSection from "@/components/StoriesSection";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { COLORS } from "@/constants/theme";

export default function HomeScreen() {
  const { signOut } = useAuth();
  const { user } = useUser();
  const { isAuthenticated } = useConvexAuth();

  const posts = useQuery(api.posts.getPosts);

  if (!isAuthenticated) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#1d9bf0" />
        <Text style={styles.message}>Please login to join the conversation</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Link href="/profile" style={styles.headerLeft}>
          <Image 
            source={user?.imageUrl} 
            style={styles.headerAvatar} 
          />
        </Link>

        <Text style={styles.headerTitle}>Feeds</Text>

        <TouchableOpacity style={styles.headerRight} onPress={() => signOut()}>
          <Ionicons name="log-out-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item._id.toString()}
        ListHeaderComponent={<StoriesSection />}
        renderItem={({ item }) => <Post post={item} />}
        ListEmptyComponent={() => (
          <View style={styles.centerContainer}>
            {posts === undefined ? (
              <ActivityIndicator color="#1d9bf0" />
            ) : (
              <Text style={styles.message}>No posts yet.</Text>
            )}
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 54, 
    borderBottomWidth: 0.5,
    borderBottomColor: "#333",
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "JetBrainsMono-Medium",
    color: COLORS.primary,
  },
  headerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#333",
  },
  headerLeft: {
    width: 40,
  },
  headerRight: {
    width: 40,
    alignItems: "flex-end",
  },
  centerContainer: {
    paddingTop: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    color: "#71767b",
    fontSize: 16,
    marginTop: 12,
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 24,
    backgroundColor: "#1d9bf0",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});