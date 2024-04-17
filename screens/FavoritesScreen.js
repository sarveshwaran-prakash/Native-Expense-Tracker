import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../components/Header";

export default function FavoritesScreen({ route }) {
  const { favorites } = route.params || { favorites: [] }; // Handle undefined parameter

  return (
    <View style={styles.container}>
      <Header title="Favorites" />
      <View style={styles.content}>
        <Text style={styles.title}>Favorite Tasks</Text>
        {/* Display favorite tasks here */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
