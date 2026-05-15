import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { styles } from "@/styles/feed.styles";
import { COLORS } from "@/constants/theme";
import * as ImagePicker from "expo-image-picker";
import Story from "./Story";
import { StoryViewerModal } from "./StoryViewerModal";

type StoryUser = {
  id: string;
  username: string;
  avatar: string;
  hasStory: boolean;
};

function StoryWithViewer({ story }: { story: StoryUser }) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const userStories = useQuery(
    api.stories.getStoriesByUser,
    story.hasStory ? { userId: story.id as Id<"users"> } : "skip",
  );

  const handlePress = () => {
    if (story.hasStory && userStories && userStories.length > 0) {
      setViewerOpen(true);
    }
  };

  return (
    <>
      <Story story={story} onPress={handlePress} />
      {viewerOpen && userStories && (
        <StoryViewerModal
          visible={viewerOpen}
          user={story}
          stories={userStories}
          onClose={() => setViewerOpen(false)}
        />
      )}
    </>
  );
}

export default function StoriesSection() {
  const stories = useQuery(api.users.getStoriesUsers);
  const generateUploadUrl = useMutation(api.stories.generateUploadUrl);
  const createStory = useMutation(api.stories.createStory);

  const handleCreateStory = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [9, 16],
        quality: 0.8,
      });

      if (result.canceled) return;

      const asset = result.assets[0];
      const uploadUrl = await generateUploadUrl();

      const response = await fetch(asset.uri);
      const blob = await response.blob();

      const uploadResponse = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": asset.mimeType ?? "image/jpeg" },
        body: blob,
      });

      const { storageId } = await uploadResponse.json();
      await createStory({ storageId });
    } catch (error) {
      Alert.alert("Error", "Failed to create story");
    }
  };

  if (stories === undefined) {
    return (
      <View style={styles.storiesContainer}>
        <ActivityIndicator size="small" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.storiesOuter}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.storiesContent}
      >
        <TouchableOpacity style={styles.addWrapper} onPress={handleCreateStory}>
          <View style={styles.addRing}>
            <Text style={styles.addPlus}>+</Text>
          </View>
        </TouchableOpacity>

        {stories.map((story) => (
          <StoryWithViewer key={story.id} story={story} />
        ))}
      </ScrollView>
    </View>
  );
}
