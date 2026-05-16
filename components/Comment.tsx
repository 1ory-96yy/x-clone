import { View, Text, StyleSheet } from "react-native";
import { Doc } from "@/convex/_generated/dataModel";
import { COLORS } from "@/constants/theme";

type CommentWithAuthor = Doc<"comments"> & {
  author: {
    username: string;
  };
};

type Props = {
  comment: CommentWithAuthor;
};

export default function Comment({ comment }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>
          @{comment.author.username}
        </Text>

        <Text style={styles.date}>
          {new Date(comment.createdAt).toLocaleString()}
        </Text>
      </View>

      <Text style={styles.text}>
        {comment.content}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: COLORS.surfaceLight,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },

  username: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "600",
  },

  text: {
    fontSize: 15,
    color: "#fff",
    lineHeight: 22,
  },

  date: {
    fontSize: 11,
    color: COLORS.grey,
  },
});