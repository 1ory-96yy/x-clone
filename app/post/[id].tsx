import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import  Post  from "@/components/Post";
import Comment from "@/components/Comment";
import { Loader } from "@/components/Loader";
import { COLORS } from "@/constants/theme";

export default function PostDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: Id<"posts"> }>();
  const router = useRouter();

  const post = useQuery(api.posts.getPostById, { postId: id });
  const comments = useQuery(api.comments.getComments, { postId: id });

  if (post === undefined) return <Loader />;
  if (post === null) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Post not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton} activeOpacity={0.7}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Post</Text>
        <View style={{ width: 32 }} />
      </View>

      <Post post={post} />

      <View style={styles.commentsSection}>
        <Text style={styles.commentsTitle}>Comments</Text>
        {comments === undefined ? (
          <Loader />
        ) : comments.length === 0 ? (
          <Text style={styles.noCommentsText}>No comments yet. Be the first to comment!</Text>
        ) : (
          comments.map((comment) => <Comment key={comment._id} comment={comment} />)
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.background,
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "bold",
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  errorContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: COLORS.white,
    fontSize: 18,
  },
  commentsSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: COLORS.surface,
  },
  commentsTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  noCommentsText: {
    color: COLORS.grey,
    textAlign: "center",
    marginTop: 10,
  },
});