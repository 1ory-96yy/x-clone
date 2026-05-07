import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
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

  list: {
    paddingVertical: 10,
  },

  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    backgroundColor: COLORS.surface,
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceLight,
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22,
    marginRight: 12,
  },

  content: {
    flex: 1,
  },

  text: {
    color: COLORS.white,
    fontSize: 14,
  },

  username: {
    fontWeight: "bold",
    color: COLORS.white,
  },

  time: {
    fontSize: 12,
    color: COLORS.grey,
    marginTop: 4,
  },

  rightImage: {
    width: 45,
    height: 45,
    borderRadius: 6,
    marginLeft: 10,
  },

  followButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
  },

  followText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    color: COLORS.grey,
    fontSize: 16,
  },
});