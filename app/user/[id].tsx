import { Loader } from "@/components/Loader";
import { COLORS } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { styles } from "@/styles/profile.styles";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter, Link, Href } from "expo-router"; // Добавил Link и Href
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
  FlatList,
} from "react-native";
import { useUser } from "@clerk/clerk-expo";

export default function UserProfileScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { user } = useUser();

  const profile = useQuery(api.users.getUserProfile, {
    id: id as Id<"users">,
  });

  const posts = useQuery(api.posts.getPostsByUser, {
    userId: id as Id<"users">,
  });

  const isFollowing = useQuery(api.users.isFollowing, {
    followingId: id as Id<"users">,
  });

  const toggleFollow = useMutation(api.users.toggleFollow);

  const getOrCreateConversation = useMutation(api.chat.getOrCreateConversation);

  if (
    profile === undefined ||
    posts === undefined ||
    isFollowing === undefined
  ) {
    return <Loader />;
  }

  const handleMessage = async () => {
    try {
      const conversationId = await getOrCreateConversation({
        currentUserId: user!.id,
        otherUserId: profile.clerkId,
      });

      router.push(`/chat/${conversationId}` as Href);
    } catch (error) {
      console.log("Message error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{profile.username}</Text>

        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileInfo}>
          <View style={styles.avatarAndStats}>
            <Image
              source={profile.image}
              style={styles.avatar}
              contentFit="cover"
              cachePolicy="memory-disk"
            />

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{profile.posts}</Text>

                <Text style={styles.statLabel}>Posts</Text>
              </View>

              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{profile.followers}</Text>

                <Text style={styles.statLabel}>Followers</Text>
              </View>

              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{profile.following}</Text>

                <Text style={styles.statLabel}>Following</Text>
              </View>
            </View>
          </View>

          <Text style={styles.name}>{profile.fullname}</Text>

          {profile.bio && <Text style={styles.bio}>{profile.bio}</Text>}

          <View
            style={{
              flexDirection: "row",
              marginTop: 16,
              gap: 10,
            }}
          >
            <Pressable
              style={[
                styles.followButton,
                isFollowing && styles.followingButton,
                { flex: 1 },
              ]}
              onPress={() =>
                toggleFollow({
                  followingId: id as Id<"users">,
                })
              }
            >
              <Text
                style={[
                  styles.followButtonText,
                  isFollowing && styles.followingButtonText,
                ]}
              >
                {isFollowing ? "Following" : "Follow"}
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.followButton,
                {
                  flex: 1,
                  backgroundColor: COLORS.surfaceLight,
                },
              ]}
              onPress={handleMessage}
            >
              <Text style={styles.followButtonText}>Message</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.postsGrid}>
          {posts.length === 0 ? (
            <View style={styles.noPostsContainer}>
              <Ionicons name="images-outline" size={48} color={COLORS.grey} />

              <Text style={styles.noPostsText}>No posts yet</Text>
            </View>
          ) : (
            <FlatList
              data={posts}
              numColumns={3}
              scrollEnabled={false}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <Link href={`/post/${item._id}` as Href} asChild>
                  <TouchableOpacity style={styles.gridItem}>
                    <Image
                      source={item.imageUrl}
                      style={styles.gridImage}
                      contentFit="cover"
                      transition={200}
                      cachePolicy="memory-disk"
                    />
                  </TouchableOpacity>
                </Link>
              )}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}