import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useQuery } from "convex/react";
import { useState } from "react"; 
import { Image } from "expo-image"; 
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Post from "@/components/Post";
import Comment from "@/components/Comment";
import { Loader } from "@/components/Loader";
import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";

export default function PostDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: Id<"posts"> }>();
  const router = useRouter();

  const [isImageModalVisible, setIsImageModalVisible] = useState(false);

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
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Post</Text>
          <View style={{ width: 32 }} />
        </View>

        <TouchableOpacity activeOpacity={1} onPress={() => setIsImageModalVisible(true)}>
          <Post post={post} />
        </TouchableOpacity>

        {/* COMMENTS SECTION */}
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

      {/* FULLSCREEN IMAGE MODAL */}
      <Modal
        visible={isImageModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsImageModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <TouchableOpacity 
            style={styles.modalCloseButton} 
            onPress={() => setIsImageModalVisible(false)}
          >
            <Ionicons name="close" size={30} color={COLORS.white} />
          </TouchableOpacity>
          
          <Image
            source={post.imageUrl}
            style={styles.fullImage}
            contentFit="contain"
          />
        </View>
      </Modal>
    </View>
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
    borderTopWidth: 0.5,
    borderTopColor: "#333",
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
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCloseButton: {
    position: "absolute",
    top: 100,
    right: 0,
    zIndex: 10,
    padding: 10,
  },
  fullImage: {
    width: "100%",
    height: "80%",
  },
});