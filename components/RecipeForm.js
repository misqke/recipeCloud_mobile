import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";

const RecipeForm = ({ recipe }) => {
  const [title, setTitle] = useState(recipe.title || "new recipe");
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContainer}
    >
      <Text>{title}</Text>
    </ScrollView>
  );
};

export default RecipeForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    alignItems: "center",
  },
});
