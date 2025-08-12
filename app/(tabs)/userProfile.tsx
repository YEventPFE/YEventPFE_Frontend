import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import EventDetails from "@/components/events/EventDetails";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import UserDetails from "@/components/user/UserDetails";
import { UserDTO, UserProfileDTO } from "@/dto/userDTO";
import { fetchUserAndRedirect } from "@/viewModels/authViewModel";
import { fetchAndSetUserProfile } from "@/viewModels/profileViewModel";
import { useOnAddFriendPress } from "@/viewModels/friendViewModel";
import NotLoggedIn from "@/components/NotLoggedIn";
import { CommentDTO } from "@/dto/commentDTO";
import { goToEventByComment } from "@/viewModels/eventViewModel";
import { useNavigateToEvent } from "@/viewModels/navigationViewModel";

export default function UserProfile() {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [connectedUser, setConnectedUser] = useState<{ token: string , user: UserDTO } | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfileDTO | undefined>(undefined);

  const onEventPress = useNavigateToEvent();

  useEffect(() => {
    if (!id) {
      console.error("No user ID provided in search params.");
      return;
    }

    try {
      fetchAndSetUserProfile(id, setUserProfile);
      fetchUserAndRedirect(router, setConnectedUser);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>{t("loading_user_profile")}</Text>
      </View>
    );
  }

  if (!connectedUser) {
    return (
      <>
        <NotLoggedIn />
      </>
    );
  }

  const onAddFriendPress = useOnAddFriendPress(connectedUser.token);

  if (!userProfile) {
    return (
      <View style={styles.container}>
        <Text>{t("user_not_found")}</Text>
      </View>
    );
  }

  console.debug("User profile fetched:", userProfile);
  return (
    <ScrollView style={styles.container}>
      <UserDetails user={userProfile} onAddFriendPress={onAddFriendPress} commentListProps={{
        comments: userProfile.publicComments,
        onCommentPress: (comment) => {
          if (comment.event && comment.event.id) {
            console.debug("onCommentPress");
            onEventPress(comment.event);
          }
        },
        onUserPress: (userId) => router.push(`/users/${userId}`),
      }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
