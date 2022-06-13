import { View, Text } from "react-native";
import { Screen, RecipeForm, Title } from "../components";
import { addRecipe } from "../helpers/controllers";
import React from "react";

const AddRecipe = ({ navigation }) => {
  const handleSubmit = async (recipe) => {
    const newRecipe = await addRecipe(recipe);
    navigation.navigate("recipe", newRecipe);
  };

  return (
    <Screen>
      <Title>New Recipe</Title>
      <RecipeForm recipe={{}} submit={handleSubmit} />
    </Screen>
  );
};

export default AddRecipe;
