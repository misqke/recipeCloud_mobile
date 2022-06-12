import { View, Text } from "react-native";
import { Screen, RecipeForm, Title } from "../components";
import React from "react";

const AddRecipe = () => {
  return (
    <Screen>
      <Title>New Recipe</Title>
      <RecipeForm recipe={{}} />
    </Screen>
  );
};

export default AddRecipe;
