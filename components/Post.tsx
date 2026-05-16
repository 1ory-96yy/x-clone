import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { Link, Href } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import CommentsModal from "./CommentsModal";

type PostProps = {
  post: {
    _id: Id<"posts">;
    imageUrl: string;
    caption?: string;
    likes: number;
    comments: number;
    createdAt: number;
    isLiked: boolean;
    isBookmarked?: boolean;
    author: {
      _id: Id<"users">;
      username: string;
      image: string;
    };
  };
};

export default function Post({ post }: PostProps) {
  const { user: clerkUser } = useUser();
  
  const currentUser = useQuery(api.users.getUserByClerkId, { 
    clerkId: clerkUser?.id ?? "" 
  });

  const toggleLike = useMutation(api.posts.toggleLike);
  const toggleBookmark = useMutation(api.bookmarks.toggleBookmark);
  const deletePost = useMutation(api.posts.deletePost);

  const [openComments, setOpenComments] = useState(false);
  const [commentsCount, setCommentsCount] = useState(post.comments || 0);

  const isMe = currentUser?._id === post.author._id;
  const profileRoute = (isMe ? "/(tabs)/profile" : `/user/${post.author._id}`) as Href;
  const postDetailsRoute = `/post/${post._id}` as Href;

  const handleLike = async () => {
    try {
      await toggleLike({ postId: post._id });
    } catch (error) {
      console.log("Like error:", error);
    }
  };

  const handleBookmark = async () => {
    try {
      await toggleBookmark({ postId: post._id });
    } catch (error) {
      console.log("Bookmark error:", error);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Post",
      "Are you sure? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive", 
          onPress: async () => {
            try {
              await deletePost({ postId: post._id });
            } catch (error) {
              console.log("Delete error:", error);
            }
          } 
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <Link href={profileRoute} asChild>
          <TouchableOpacity activeOpacity={0.8}>
            <Image source={post.author.image} style={styles.avatar} />
          </TouchableOpacity>
        </Link>
      </View>

      <View style={styles.rightColumn}>
        <View style={styles.topRow}>
          <View style={styles.userInfo}>
            <Link href={profileRoute} asChild>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.username} numberOfLines={1}>
                  {post.author.username}
                </Text>
              </TouchableOpacity>
            </Link>
            <Text style={styles.dot}>·</Text>
            <Text style={styles.timestamp}>
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: false })}
            </Text>
          </View>

          {isMe && (
            <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
              <Ionicons name="trash-outline" size={18} color="#71767b" />
            </TouchableOpacity>
          )}
        </View>

        {!!post.caption && (
          <Text style={styles.caption}>{post.caption}</Text>
        )}

        {!!post.imageUrl && (
          <Link href={postDetailsRoute} asChild>
            <TouchableOpacity activeOpacity={0.9}>
              <Image
                source={post.imageUrl}
                style={styles.postImage}
                contentFit="cover"
              />
            </TouchableOpacity>
          </Link>
        )}

        <View style={styles.actionsRow}>
          <TouchableOpacity
            onPress={() => setOpenComments(true)}
            style={styles.actionButton}
          >
            <Ionicons name="chatbubble-outline" size={18} color="#71767b" />
            <Text style={styles.actionCount}>{commentsCount}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLike} style={styles.actionButton}>
            <Ionicons
              name={post.isLiked ? "heart" : "heart-outline"}
              size={18}
              color={post.isLiked ? "#f91880" : "#71767b"}
            />
            <Text style={[
              styles.actionCount, 
              post.isLiked && { color: "#f91880" }
            ]}>
              {post.likes}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleBookmark}>
            <Ionicons
              name={post.isBookmarked ? "bookmark" : "bookmark-outline"}
              size={18}
              color={post.isBookmarked ? "#1d9bf0" : "#71767b"}
            />
          </TouchableOpacity>
        </View>
      </View>

      <CommentsModal
        visible={openComments}
        onClose={() => setOpenComments(false)}
        postId={post._id}
        onCommentsAdd={() => setCommentsCount((c) => c + 1)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#333",
    flexDirection: "row",
  },
  leftColumn: {
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#111",
  },
  rightColumn: {
    flex: 1,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 8,
  },
  username: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  dot: {
    color: "#71767b",
    marginHorizontal: 4,
  },
  timestamp: {
    color: "#71767b",
    fontSize: 14,
  },
  deleteButton: {
    padding: 4,
  },
  caption: {
    color: "#fff",
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 8,
  },
  postImage: {
    width: "100%",
    height: 280,
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: "#333",
    marginBottom: 12,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 12,
    marginTop: 4,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionCount: {
    color: "#71767b",
    marginLeft: 8,
    fontSize: 13,
  },
});