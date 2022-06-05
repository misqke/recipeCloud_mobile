import { View, Text, StyleSheet, Image } from "react-native";
import { foodPlaceholder, COLORS } from "../helpers/constants";
import React from "react";

const RecipeCard = ({ recipe }) => {
  return (
    <View style={styles.container}>
      <Image
        source={
          recipe.image.url === "/food-placeholder.png"
            ? foodPlaceholder
            : { uri: recipe.image.url }
        }
        resizeMode="cover"
        style={styles.img}
      ></Image>
      <View style={styles.content}>
        <Text>{recipe.name}</Text>
        <Text>{recipe.createdBy}</Text>
      </View>
    </View>
  );
};

export default RecipeCard;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginHorizontal: "5%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  img: {
    width: "90%",
    height: 200,
  },
});
