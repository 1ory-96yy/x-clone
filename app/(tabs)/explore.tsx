import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import { useState, useCallback } from "react";
import { useQuery, useMutation, useConvexAuth } from "convex/react";
import { api } from "@/convex/_generated/api";
import { COLORS } from "@/constants/theme";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useUser } from "@clerk/expo";
import { Id } from "@/convex/_generated/dataModel";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const GRID_ITEM_SIZE = (SCREEN_WIDTH - 4) / 3; // 3 колонки з відступом 1px

// ─── Типи ────────────────────────────────────────────────────────────────────

type UserResult = {
  _id: Id<"users">;
  username: string;
  fullname: string;
  image: string;
  followers: number;
  isFollowing: boolean;
};

type PostResult = {
  _id: Id<"posts">;
  imageUrl: string;
  likes: number;
  author: { username: string };
};

// ─── Компонент: Рядок результату-користувача ─────────────────────────────────

function UserResultItem({
  user,
  onFollowToggle,
}: {
  user: UserResult;
  onFollowToggle: (userId: Id<"users">) => void;
}) {
  return (
    <Link href={`/user/${user._id}`} asChild>
      <TouchableOpacity style={styles.userItem}>
        <Image
          source={user.image}
          style={styles.userAvatar}
          contentFit="cover"
          transition={200}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userUsername}>@{user.username}</Text>
          <Text style={styles.userFullname}>{user.fullname}</Text>
          <Text style={styles.userFollowers}>{user.followers} followers</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.followButton,
            user.isFollowing && styles.followingButton,
          ]}
          onPress={() => onFollowToggle(user._id)}
        >
          <Text
            style={[
              styles.followButtonText,
              user.isFollowing && styles.followingButtonText,
            ]}
          >
            {user.isFollowing ? "Following" : "Follow"}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Link>
  );
}

// ─── Компонент: Клітинка сітки поста ─────────────────────────────────────────

function PostGridItem({ post }: { post: PostResult }) {
  return (
    <Link href={`/post/${post._id}`} asChild>
      <TouchableOpacity style={styles.gridItem} activeOpacity={0.8}>
        <Image
          source={post.imageUrl}
          style={styles.gridImage}
          contentFit="cover"
          cachePolicy="memory-disk"
          transition={200}
        />
        {/* Overlay з кількістю лайків */}
        <View style={styles.gridOverlay}>
          <Ionicons name="heart" size={12} color="#fff" />
          <Text style={styles.gridLikes}>{post.likes}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

// ─── Головний екран Explore ───────────────────────────────────────────────────

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { isAuthenticated } = useConvexAuth();
  const toggleFollow = useMutation(api.users.toggleFollow);

  // Популярні пости для початкового стану (без пошуку)
  const explorePosts = useQuery(
    api.search.getExplorePosts,
    isAuthenticated ? {} : "skip"
  );

  // Результати пошуку — активуються тільки коли є текст
  const userResults = useQuery(
    api.search.searchUsers,
    isAuthenticated && searchQuery.trim()
      ? { searchQuery: searchQuery.trim() }
      : "skip"
  );

  const postResults = useQuery(
    api.search.searchPosts,
    isAuthenticated && searchQuery.trim()
      ? { searchQuery: searchQuery.trim() }
      : "skip"
  );

  // Обробка натискання Follow/Unfollow
  const handleFollowToggle = useCallback(
    async (userId: Id<"users">) => {
      try {
        await toggleFollow({ followingId: userId });
      } catch (error) {
        console.error("Error toggling follow:", error);
      }
    },
    [toggleFollow]
  );

  // Очистити пошук
  const handleClearSearch = () => {
    setSearchQuery("");
    setIsSearchActive(false);
  };

  const isLoading = userResults === undefined || postResults === undefined;
  const hasQuery = searchQuery.trim().length > 0;

  return (
    <View style={styles.container}>
      {/* ── ХЕДЕР ── */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore</Text>
      </View>

      {/* ── РЯДОК ПОШУКУ ── */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color={COLORS.grey}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search users or #hashtags..."
          placeholderTextColor={COLORS.grey}
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            setIsSearchActive(text.length > 0);
          }}
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="search"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={handleClearSearch}>
            <Ionicons name="close-circle" size={20} color={COLORS.grey} />
          </TouchableOpacity>
        )}
      </View>

      {/* ── ВМІСТ ── */}
      {!hasQuery ? (
        // ── Початковий стан: сітка популярних постів ──
        <>
          <Text style={styles.sectionTitle}>Popular Posts</Text>
          {explorePosts === undefined ? (
            <ActivityIndicator
              color={COLORS.primary}
              style={{ marginTop: 40 }}
            />
          ) : (
            <FlatList
              data={explorePosts}
              numColumns={3}
              keyExtractor={(item) => item._id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 80 }}
              renderItem={({ item }) => <PostGridItem post={item} />}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <MaterialIcons
                    name="photo-library"
                    size={48}
                    color={COLORS.grey}
                  />
                  <Text style={styles.emptyText}>No posts yet</Text>
                </View>
              }
            />
          )}
        </>
      ) : (
        // ── Режим пошуку: результати ──
        <FlatList
          data={[]} // FlatList використовується лише як scroll-контейнер
          keyExtractor={() => "search-results"}
          ListHeaderComponent={
            <>
              {isLoading ? (
                <ActivityIndicator
                  color={COLORS.primary}
                  style={{ marginTop: 40 }}
                />
              ) : (
                <>
                  {/* Секція: Користувачі */}
                  {userResults && userResults.length > 0 && (
                    <>
                      <Text style={styles.sectionTitle}>People</Text>
                      {userResults.map((user) => (
                        <UserResultItem
                          key={user._id}
                          user={user}
                          onFollowToggle={handleFollowToggle}
                        />
                      ))}
                    </>
                  )}

                  {/* Секція: Пости */}
                  {postResults && postResults.length > 0 && (
                    <>
                      <Text style={styles.sectionTitle}>Posts</Text>
                      <View style={styles.postsGrid}>
                        {postResults.map((post) => (
                          <PostGridItem key={post._id} post={post} />
                        ))}
                      </View>
                    </>
                  )}

                  {/* Порожній стан пошуку */}
                  {userResults?.length === 0 && postResults?.length === 0 && (
                    <View style={styles.emptyContainer}>
                      <Ionicons
                        name="search-outline"
                        size={48}
                        color={COLORS.grey}
                      />
                      <Text style={styles.emptyText}>
                        No results for &quot;{searchQuery}&quot;
                      </Text>
                      <Text style={styles.emptySubtext}>
                        Try searching by username or #hashtag
                      </Text>
                    </View>
                  )}
                </>
              )}
            </>
          }
          renderItem={() => null}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
    </View>
  );
}

// ─── Стилі ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background, // "#000"
  },

  // Header
  header: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.white,
  },

  // Search bar
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: COLORS.white,
    fontSize: 16,
  },

  // Section title
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  // Grid
  gridItem: {
    width: GRID_ITEM_SIZE,
    height: GRID_ITEM_SIZE,
    margin: 0.5,
    position: "relative",
  },
  gridImage: {
    width: "100%",
    height: "100%",
  },
  gridOverlay: {
    position: "absolute",
    bottom: 4,
    left: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  gridLikes: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  postsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  // User result item
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#1a1a1a",
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userUsername: {
    color: COLORS.white,
    fontWeight: "600",
    fontSize: 15,
  },
  userFullname: {
    color: COLORS.grey,
    fontSize: 13,
    marginTop: 1,
  },
  userFollowers: {
    color: COLORS.grey,
    fontSize: 12,
    marginTop: 2,
  },
  followButton: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  followingButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  followButtonText: {
    color: COLORS.primary,
    fontWeight: "600",
    fontSize: 13,
  },
  followingButtonText: {
    color: COLORS.white,
  },

  // Empty state
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
    gap: 12,
  },
  emptyText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "600",
  },
  emptySubtext: {
    color: COLORS.grey,
    fontSize: 14,
  },
});