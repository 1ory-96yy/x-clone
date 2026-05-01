import { View, Text } from "react-native";
import { Image } from "expo-image";
import { styles } from "@/styles/feed.styles";
type Props = {
  username: string;
  image: string;
};

export default function Story({ username, image }: Props) {
  return (
    <View style={styles.storyWrapper}>
      <View style={[styles.storyRing, styles.storyRingActive]}>
        <Image source={image} style={styles.storyAvatar} />
      </View>

      <Text style={styles.storyUsername}>{username}</Text>
    </View>
  );
}