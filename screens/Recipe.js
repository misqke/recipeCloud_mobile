import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import { Screen, Title, Icon } from "../components";
import { COLORS, SIZES, foodPlaceholder, FONTS } from "../helpers/constants";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Ingredient = ({ ingredient }) => {
  return <View style={styles.ingredientRow}></View>;
};

const Recipe = ({ route, navigation }) => {
  const recipe = route.params;
  const user = useSelector((state) => state.user);
  const [isAuthor, setIsAuthor] = useState(false);
  console.log(recipe);

  useEffect(() => {
    if (user.username === recipe.createdBy) {
      setIsAuthor(true);
    }
  }, []);

  return (
    <Screen>
      <Title>{recipe.name}</Title>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          flex: 1,
          width: "100%",
        }}
      >
        <View style={styles.row}>
          {isAuthor ? (
            <>
              <Pressable
                onPress={() => navigation.navigate("editRecipe", recipe)}
              >
                <Text style={{ fontSize: SIZES.text, color: COLORS.primary }}>
                  Edit recipe
                </Text>
              </Pressable>
            </>
          ) : (
            <>
              <Pressable
                onPress={() =>
                  navigation.navigate("recipeBook", recipe.createdBy)
                }
              >
                <View style={styles.moreRecipes}>
                  <Text style={{ fontSize: SIZES.text }}>
                    More recipes by{" "}
                    <Text style={{ color: COLORS.primary }}>
                      {recipe.createdBy}
                    </Text>
                  </Text>
                </View>
              </Pressable>
              <Icon
                name={
                  user.likes.includes(recipe._id) ? "heart" : "heart-outline"
                }
                color="red"
                size={SIZES.large + 5}
              />
            </>
          )}
        </View>
        <Image
          style={styles.img}
          source={
            recipe.image.url === "/food-placeholder.png"
              ? foodPlaceholder
              : { uri: recipe.image.url }
          }
          resizeMode="cover"
        />
        <View style={styles.row}>
          <Text>Time: {recipe.time}</Text>
        </View>
        <View style={styles.ingredientsContainer}>
          <Text style={styles.header}>Ingredients</Text>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default Recipe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  moreRecipes: {
    fontSize: SIZES.text,
    width: "100%",
  },
  img: {
    width: "100%",
    height: 200,
  },
  header: {
    fontSize: SIZES.large,
    color: COLORS.dark,
    textDecorationLine: "underline",
    textDecorationColor: COLORS.primary,
  },
  ingredientsContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
  },
});
