import { View, Text } from "react-native";
import { COLORS } from "@/constants/theme";
import { styles } from "@/styles/feed.styles";
 
export function NoBookmarksFound() {
  return (
    <View style={styles.container}>
        <Text style={styles.bookmarkMessage}>
            Please sign in to view your bookmarks
        </Text>
    </View>
    );
}
 