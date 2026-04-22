import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

type PostProps = {
  post: {
    _id: Id<"posts">;
    imageUrl: string;
    caption?: string;
    likes: number;
    createdAt: number;
    isLiked: boolean;
    author: {
      username: string;
      image: string;
    };
  };
};

export default function Post({ post }: PostProps) {
  const toggleLike = useMutation(api.posts.toggleLike);

  const handleLike = async () => {
    try {
      await toggleLike({ postId: post._id });
    } catch (error) {
      console.log("Like error", error);
    }
  };

  return (
    <View style={{ marginBottom: 20 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Image
          source={post.author.image}
          style={{ width: 40, height: 40, borderRadius: 20 }}
        />
        <Text style={{ marginLeft: 10, fontWeight: "bold" }}>
          {post.author.username}
        </Text>
      </View>

      <Image
        source={post.imageUrl}
        style={{ width: "100%", height: 300 }}
        contentFit="cover"
      />

      <View style={{ flexDirection: "row", padding: 10 }}>
        <TouchableOpacity onPress={handleLike}>
          <Ionicons
            name={post.isLiked ? "heart" : "heart-outline"}
            size={26}
            color={post.isLiked ? "red" : "black"}
          />
        </TouchableOpacity>
      </View>

      <View style={{ paddingHorizontal: 10 }}>
        <Text style={{ fontWeight: "bold" }}>
          {post.likes} likes
        </Text>

        {post.caption && (
          <Text>
            <Text style={{ fontWeight: "bold" }}>
              {post.author.username}
            </Text>{" "}
            {post.caption}
          </Text>
        )}

        <Text style={{ color: "gray", fontSize: 12 }}>
          {formatDistanceToNow(new Date(post.createdAt), {
            addSuffix: true,
          })}
        </Text>
      </View>
    </View>
  );
}