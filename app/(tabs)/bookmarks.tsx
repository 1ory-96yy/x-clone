import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import { Image } from "expo-image";
import { useConvexAuth, useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";

const { width } = Dimensions.get("window");
const itemWidth = width / 3 - 2; // 3 columns with small gap

type BookmarkedPost = {
  _id: string;
  imageUrl: string;
};

export default function BookmarksScreen() {
  const { isAuthenticated } = useConvexAuth();
  const bookmarkedPosts = useQuery(
    isAuthenticated ? api.bookmarks.getBookmarkedPosts : (null as any),
  );

  const renderPost = ({ item }: { item: BookmarkedPost }) => (
    <View style={styles.postContainer}>
      <Image
        source={item.imageUrl}
        style={styles.postImage}
        contentFit="cover"
      />
    </View>
  );

  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Please sign in to view your bookmarks
        </Text>
      </View>
    );
  }

  if (bookmarkedPosts === undefined) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Loading bookmarks...</Text>
      </View>
    );
  }

  if (bookmarkedPosts.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No bookmarks yet</Text>
          <Text style={styles.emptySubtitle}>
            Save posts you want to revisit later
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bookmarks</Text>
      </View>
      <FlatList
        data={bookmarkedPosts}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderPost}
        numColumns={3}
        contentContainerStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    color: "#fff",
    fontFamily: "JetBrainsMono-Medium",
  },
  gridContainer: {
    paddingHorizontal: 1,
    paddingTop: 10,
  },
  postContainer: {
    width: itemWidth,
    height: itemWidth,
    margin: 1,
  },
  postImage: {
    width: "100%",
    height: "100%",
  },
  message: {
    color: "#d1d5db",
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    color: "#fff",
    fontFamily: "JetBrainsMono-Medium",
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#d1d5db",
    textAlign: "center",
    fontFamily: "SpaceMono-Regular",
  },
});
