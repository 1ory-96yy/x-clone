import { FlatList } from "react-native";
import Story from "./Story";
import { STORIES } from "@/constants/mock-data";

export default function StoriesSection() {
  return (
    <FlatList
      data={STORIES}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Story username={item.username} image={item.image} />
      )}
      showsHorizontalScrollIndicator={false}
    />
  );
}

