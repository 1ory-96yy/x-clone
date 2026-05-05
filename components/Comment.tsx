import { View, Text, StyleSheet } from "react-native";
import { Doc } from "@/convex/_generated/dataModel";

type Props = {
  comment: Doc<"comments">;
};

export default function Comment({ comment }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{comment.content}</Text>

      <Text style={styles.date}>
        {new Date(comment.createdAt).toLocaleString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: "gray",
  },
});