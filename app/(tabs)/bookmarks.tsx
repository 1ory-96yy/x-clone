import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useConvexAuth, useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";
import { styles } from "@/styles/feed.styles";
import { NoBookmarksFound } from "@/components/NoBookmarksFound";

type BookmarkedPost = {
  _id: string;
  imageUrl: string;
};

export default function BookmarksScreen() {
  const { isAuthenticated } = useConvexAuth();
  const router = useRouter();

  const bookmarkedPosts = useQuery(
    isAuthenticated ? api.bookmarks.getBookmarkedPosts : ("skip" as any),
  );

  const renderPost = ({ item }: { item: BookmarkedPost }) => (
    <TouchableOpacity
      style={styles.bookmarkPostContainer}
      onPress={() => router.push(`/post/${item._id}`)}
      activeOpacity={0.8}
    >
      <Image
        source={item.imageUrl}
        style={styles.bookmarkPostImage}
        contentFit="cover"
      />
    </TouchableOpacity>
  );

  if (!isAuthenticated) {
    return <NoBookmarksFound />;
  }

  if (bookmarkedPosts === undefined) {
    return (
      <View style={styles.container}>
        <Text style={styles.bookmarkMessage}>Loading bookmarks...</Text>
      </View>
    );
  }

  if (bookmarkedPosts.length === 0) {
    return <NoBookmarksFound />;
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