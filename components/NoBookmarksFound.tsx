import { View, Text } from "react-native";
import { styles } from "@/styles/feed.styles";
 
export function NoBookmarksFound() {
  return (
    <View style={styles.container}>
        <Text style={styles.bookmarkMessage}>
            No bookmarks found. Start bookmarking your favorite posts!
        </Text>
    </View>
    );
}
 