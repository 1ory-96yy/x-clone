import { View, Text, FlatList } from "react-native";
import { styles } from "@/styles/notification.styles";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader } from "@/components/Loader";
import { NoNotificationsFound } from "@/components/NoNotificationsFound";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NotificationItem } from "@/components/NotificationItem";


export default function ScreenNotifications() {
  const { isAuthenticated } = useConvexAuth();
    
    const notifications =  useQuery(api.notifications.getNotifications, (isAuthenticated ? {} : "skip"));
  
    if (notifications === undefined) {
      return <Loader/>;
    }
  
    if (notifications.length === 0) {
      return <NoNotificationsFound/>;
    }

    if (!isAuthenticated) {
      return <NoNotificationsFound/>;
    }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Notifications</Text>
        </View>
        <FlatList
          data={notifications}
          renderItem={({ item }) => <NotificationItem notification={item}/>}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </GestureHandlerRootView>
  );
}