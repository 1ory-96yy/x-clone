import { COLORS } from "@/constants/theme";
import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceLight,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.white,
  },
  logoutButton: {
    padding: 8,
  },
  logoutText: {
    color: COLORS.primary,
    fontSize: 16,
  },
  storiesContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceLight,
  },
  storyWrapper: {
    alignItems: "center",
    marginRight: 16,
  },
  storyRing: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  storyRingActive: {
    borderColor: COLORS.primary,
  },
  storyRingInactive: {
    borderColor: COLORS.grey,
  },
  storyAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  storyUsername: {
    fontSize: 12,
    color: COLORS.white,
    marginTop: 4,
    textAlign: "center",
  },
  postsContainer: {
    flex: 1,
  },
  post: {
    backgroundColor: COLORS.surface,
    marginBottom: 8,
    padding: 16,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  postUsername: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.white,
  },
  postImage: {
    width: width - 32,
    height: width - 32,
    borderRadius: 8,
    marginBottom: 12,
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  actionText: {
    color: COLORS.grey,
    fontSize: 14,
    marginLeft: 4,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  commentContainer: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: height * 0.6,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
    borderRadius: 8,
    padding: 12,
    color: COLORS.white,
    fontSize: 16,
    marginBottom: 16,
  },
  // BOOKMARKS
  bookmarksHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  bookmarksTitle: {
    fontSize: 28,
    color: COLORS.white,
    fontFamily: "JetBrainsMono-Medium",
  },
  bookmarksGridContainer: {
    paddingHorizontal: 1,
    paddingTop: 10,
  },
  bookmarkPostContainer: {
    width: width / 3 - 2,
    height: width / 3 - 2,
    margin: 1,
  },
  bookmarkPostImage: {
    width: "100%",
    height: "100%",
  },
  bookmarkMessage: {
    color: "#d1d5db",
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
  },
  bookmarkEmptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  bookmarkEmptyTitle: {
    fontSize: 24,
    color: COLORS.white,
    fontFamily: "JetBrainsMono-Medium",
    marginBottom: 8,
    textAlign: "center",
  },
  bookmarkEmptySubtitle: {
    fontSize: 16,
    color: "#d1d5db",
    textAlign: "center",
    fontFamily: "SpaceMono-Regular",
  },
  //StoryStyles
  addWrapper: {
    alignItems: "center",
    marginHorizontal: 8,
    width: 72,
  },
  addRing: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
    backgroundColor: COLORS.surface,
  },
  addLabel: {
    fontSize: 11,
    color: COLORS.white,
    textAlign: "center",
  },
});
