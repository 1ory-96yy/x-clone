import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";
import { useMutation } from "convex/react";
import { useState } from "react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { COLORS } from "@/constants/theme";

import CommentsModal from "./CommentsModal";

type PostProps = {
  post: {
    _id: Id<"posts">;
    imageUrl: string;
    caption?: string;
    likes: number;
    createdAt: number;
    isLiked: boolean;
    isBookmarked?: boolean;
    author: {
      username: string;
      image: string;
    };
  };
};

export default function Post({ post }: PostProps) {
  const toggleLike = useMutation(api.posts.toggleLike);
  const toggleBookmark = useMutation(
    api.bookmarks.toggleBookmark,
  );

  const [openComments, setOpenComments] =
    useState(false);

  const handleLike = async () => {
    try {
      await toggleLike({
        postId: post._id,
      });
    } catch (error) {
      console.log("Like error:", error);
    }
  };

  const handleBookmark = async () => {
    try {
      await toggleBookmark({
        postId: post._id,
      });
    } catch (error) {
      console.log("Bookmark error:", error);
    }
  };

  return (
    <View
      style={{
        backgroundColor: COLORS.surface,
        marginBottom: 12,
      }}
    >
      {/* HEADER */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 14,
          paddingVertical: 12,
        }}
      >
        <Image
          source={post.author.image}
          style={{
            width: 42,
            height: 42,
            borderRadius: 21,
          }}
        />

        <Text
          style={{
            color: COLORS.white,
            marginLeft: 12,
            fontSize: 15,
            fontWeight: "700",
          }}
        >
          {post.author.username}
        </Text>
      </View>

      <Image
        source={post.imageUrl}
        style={{
          width: "100%",
          height: 380,
          backgroundColor: "#111",
        }}
        contentFit="cover"
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 12,
          paddingTop: 12,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 18,
          }}
        >
          <TouchableOpacity onPress={handleLike}>
            <Ionicons
              name={
                post.isLiked
                  ? "heart"
                  : "heart-outline"
              }
              size={30}
              color={
                post.isLiked
                  ? "#ff3040"
                  : COLORS.white
              }
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              setOpenComments(true)
            }
          >
            <Ionicons
              name="chatbubble-outline"
              size={28}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleBookmark}
        >
          <Ionicons
            name={
              post.isBookmarked
                ? "bookmark"
                : "bookmark-outline"
            }
            size={28}
            color={COLORS.white}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          paddingHorizontal: 14,
          paddingBottom: 16,
          paddingTop: 10,
        }}
      >
        <Text
          style={{
            color: COLORS.white,
            fontWeight: "700",
            fontSize: 15,
          }}
        >
          {post.likes} likes
        </Text>

        {!!post.caption && (
          <Text
            style={{
              color: COLORS.white,
              marginTop: 8,
              lineHeight: 20,
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                color: COLORS.white,
              }}
            >
              {post.author.username}
            </Text>{" "}
            {post.caption}
          </Text>
        )}

        <Text
          style={{
            color: COLORS.grey,
            marginTop: 10,
            fontSize: 13,
          }}
        >
          {formatDistanceToNow(
            new Date(post.createdAt),
            {
              addSuffix: true,
            },
          )}
        </Text>
      </View>

      <CommentsModal
        visible={openComments}
        onClose={() =>
          setOpenComments(false)
        }
        postId={post._id}
      />
    </View>
  );
}