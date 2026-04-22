import { View, Text, ScrollView } from "react-native";
import { Image } from "expo-image";

type Story = {
  id: string;
  username: string;
  image: string;
};

const mockStories: Story[] = [
  {
    id: "1",
    username: "alex",
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "2",
    username: "maria",
    image: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: "3",
    username: "john",
    image: "https://i.pravatar.cc/150?img=3",
  },
];

export default function StoriesSection() {
  return (
    <View style={{ paddingVertical: 10 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {mockStories.map((story) => (
          <View
            key={story.id}
            style={{
              alignItems: "center",
              marginHorizontal: 10,
            }}
          >
            <Image
              source={story.image}
              style={{
                width: 70,
                height: 70,
                borderRadius: 35,
              }}
            />
            <Text style={{ fontSize: 12 }}>{story.username}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
