import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import EventDetails from "@/components/EventDetails";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import UserDetails from "@/components/UserDetails";
import { UserProfileDTO } from "@/dto/userDTO";
import { fetchUserAndRedirect } from "@/viewModels/authViewModel";
import { fetchUserProfileAndRedirect } from "@/viewModels/profileViewModel";

export default function UserProfile() {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserProfileDTO | undefined>(undefined);

  useEffect(() => {
    if (!id) {
      console.error("No user ID provided in search params.");
      return;
    }

    try {
      fetchUserProfileAndRedirect(router, id, setUser);
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

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>{t("user_not_found")}</Text>
      </View>
    );
  }
  console.log("User profile fetched:", user);
  return (
    <ScrollView style={styles.container}>
      <UserDetails user={user} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
