import {
  View,
  Text,
  Modal,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Comment from "./Comment";
import { Ionicons } from "@expo/vector-icons";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-expo";
import { COLORS } from "@/constants/theme";

type Props = {
  visible: boolean;
  onClose: () => void;
  postId: Id<"posts">;
};

export default function CommentsModal({
  visible,
  onClose,
  postId,
}: Props) {
  const { user } = useUser();

  const comments = useQuery(api.comments.getComments, { postId });
  const users = useQuery(api.users.getUsers);

  const commentsWithAuthor = comments?.map((comment) => {
  const author = users?.find(
    (u) => u._id === comment.userId
  );

  return {
    ...comment,
    author: {
      username: author?.username ?? "unknown",
      image: author?.image,
    },
  };
});

  const addComment = useMutation(api.comments.addComment);

  const [text, setText] = useState("");

  const handleAdd = async () => {
    const trimmed = text.trim();
    if (!trimmed || !user) return;

    try {
      await addComment({
        postId,
        content: trimmed,
      });

      setText("");
    } catch (err) {
      console.log("Add comment error", err);
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ flex: 1, padding: 16, backgroundColor: COLORS.background }}>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", color: COLORS.primary }}>
            Comments
          </Text>

          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} style={{color: COLORS.primary }} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={commentsWithAuthor || []}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <Comment comment={item} />}
        />

        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            borderTopWidth: 1,
            paddingTop: 10,
            alignItems: "center",
          }}
        >
          <TextInput
            style={{ flex: 1, padding: 8, marginRight: 30, borderColor: COLORS.white, color: COLORS.white }}
            placeholder="Add a comment..."
            value={text}
            onChangeText={setText}
          />

          <TouchableOpacity onPress={handleAdd}>
            <Text style={{ color: COLORS.primary, fontWeight: "bold" }}>
              Send
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}