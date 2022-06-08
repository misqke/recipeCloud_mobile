import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Pressable,
} from "react-native";
import { foodPlaceholder, COLORS, FONTS, SIZES } from "../helpers/constants";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const RecipeCard = ({ recipe }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate("recipe", recipe)}
    >
      <ImageBackground
        source={
          recipe.image.url === "/food-placeholder.png"
            ? foodPlaceholder
            : { uri: recipe.image.url }
        }
        resizeMode="cover"
        style={styles.img}
      ></ImageBackground>
      <View style={styles.content}>
        <Text style={styles.contentTitle}>{recipe.name}</Text>
        <Text style={styles.contentAuthor}>{recipe.createdBy}</Text>
      </View>
    </Pressable>
  );
};

export default RecipeCard;

const styles = StyleSheet.create({
  container: {
    width: "45%",
    marginHorizontal: "2.5%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginVertical: SIZES.small,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 4, height: 5 },
    shadowRadius: 3,
    shadowOpacity: 0.5,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.light,
  },
  img: {
    width: "100%",
    height: 200,
  },
  content: {
    position: "absolute",
    bottom: SIZES.small,
    left: SIZES.small,
    shadowColor: COLORS.dark,
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 1.5,
    shadowOpacity: 1,
  },
  contentTitle: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.text,
    color: COLORS.white,
    textShadowColor: COLORS.black,
    textShadowRadius: 1,
  },
  contentAuthor: {
    fontSize: SIZES.small + 2,
    color: COLORS.white,
    textShadowColor: COLORS.black,
    textShadowRadius: 1,
  },
});
