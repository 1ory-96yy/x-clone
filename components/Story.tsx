import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Image } from "expo-image";

type StoryUser = {
  id: string;
  username: string;
  avatar: string;
  hasStory: boolean;
};

type Props = {
  story: StoryUser;
  onPress?: () => void;
};

export default function Story({ story, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.7}
    >
      <View style={[
        styles.avatarContainer,
        story.hasStory && styles.activeRing
      ]}>
        <Image 
          source={{ uri: story.avatar }} 
          style={styles.avatar} 
        />
      </View>
      <Text style={styles.username} numberOfLines={1}>
        {story.username}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginHorizontal: 8,
    width: 68,
  },
  avatarContainer: {
    padding: 2,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "transparent",
  },
  activeRing: {
    borderColor: "#1d9bf0",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#111",
    borderWidth: 1,
    borderColor: "#000",
  },
  username: {
    color: "#71767b",
    fontSize: 11,
    marginTop: 4,
    textAlign: "center",
  },
});