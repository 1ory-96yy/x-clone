import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Link, Href } from "expo-router";
import { useQuery } from "convex/react";
import { useUser } from "@clerk/clerk-expo";
import { formatDistanceToNow } from "date-fns";

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { COLORS } from "@/constants/theme";

type CommentWithAuthor = Doc<"comments"> & {
  author: {
    _id: string;
    username: string;
    image: string;
  } | null;
};

type Props = {
  comment: CommentWithAuthor;
};

export default function Comment({ comment }: Props) {
  const { user: clerkUser } = useUser();

  const currentUser = useQuery(api.users.getUserByClerkId, { 
    clerkId: clerkUser?.id ?? "" 
  });

  const isMe = currentUser?._id === comment.author?._id;
  const profileRoute = (isMe ? "/(tabs)/profile" : `/user/${comment.author?._id}`) as Href;

  return (
    <View style={styles.container}>
      <View style={styles.avatarColumn}>
        <Link href={profileRoute} asChild>
          <TouchableOpacity activeOpacity={0.7}>
            <Image 
              source={comment.author?.image} 
              style={styles.avatar} 
            />
          </TouchableOpacity>
        </Link>
      </View>

      <View style={styles.contentColumn}>
        <View style={styles.header}>
          <Link href={profileRoute} asChild>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.username}>
                {comment.author?.username || "unknown"}
              </Text>
            </TouchableOpacity>
          </Link>
          
          <Text style={styles.dot}>·</Text>
          
          <Text style={styles.date}>
            {formatDistanceToNow(new Date(comment.createdAt))}
          </Text>
        </View>

        <Text style={styles.text}>
          {comment.content}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: "#333",
    backgroundColor: COLORS.background, 
  },
  avatarColumn: {
    marginRight: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#222",
  },
  contentColumn: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  username: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  dot: {
    color: "#71767b",
    marginHorizontal: 4,
  },
  date: {
    fontSize: 13,
    color: "#71767b",
  },
  text: {
    fontSize: 15,
    color: "#fff",
    lineHeight: 20,
  },
});