import { View, Text, FlatList } from "react-native";
import { Image } from "expo-image";
import { useConvexAuth, useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";
import { styles } from "@/styles/feed.styles";

type BookmarkedPost = {
  _id: string;
  imageUrl: string;
};

export default function BookmarksScreen() {
  const { isAuthenticated } = useConvexAuth();

  const bookmarkedPosts = useQuery(
    isAuthenticated ? api.bookmarks.getBookmarkedPosts : ("skip" as any),
  );

  const renderPost = ({ item }: { item: BookmarkedPost }) => (
    <View style={styles.bookmarkPostContainer}>
      <Image
        source={item.imageUrl}
        style={styles.bookmarkPostImage}
        contentFit="cover"
      />
    </View>
  );

  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <Text style={styles.bookmarkMessage}>
          Please sign in to view your bookmarks
        </Text>
      </View>
    );
  }

  if (bookmarkedPosts === undefined) {
    return (
      <View style={styles.container}>
        <Text style={styles.bookmarkMessage}>Loading bookmarks...</Text>
      </View>
    );
  }

  if (bookmarkedPosts.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.bookmarkEmptyContainer}>
          <Text style={styles.bookmarkEmptyTitle}>No bookmarks yet</Text>

          <Text style={styles.bookmarkEmptySubtitle}>
            Save posts you want to revisit later
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.bookmarksHeader}>
        <Text style={styles.bookmarksTitle}>Bookmarks</Text>
      </View>

      <FlatList
        data={bookmarkedPosts}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderPost}
        numColumns={3}
        contentContainerStyle={styles.bookmarksGridContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
