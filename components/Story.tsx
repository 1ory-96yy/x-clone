import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { styles } from "@/styles/feed.styles";

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
      style={styles.storyWrapper}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.storyRing,
          story.hasStory ? styles.storyRingActive : styles.storyRingInactive,
        ]}
      >
        <Image source={{ uri: story.avatar }} style={styles.storyAvatar} />
      </View>

      <Text style={styles.storyUsername}>{story.username}</Text>
    </TouchableOpacity>
  );
}
