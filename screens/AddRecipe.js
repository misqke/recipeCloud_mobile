import { ActivityIndicator } from "react-native";
import { Screen, RecipeForm, Title } from "../components";
import { addRecipe } from "../helpers/controllers";
import React, { useState } from "react";
import { COLORS } from "../helpers/constants";

const AddRecipe = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (recipe) => {
    setLoading(true);
    const newRecipe = await addRecipe(recipe);
    navigation.navigate("recipe", newRecipe);
  };

  return (
    <Screen>
      <Title>New Recipe</Title>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <RecipeForm recipe={{}} submit={handleSubmit} />
      )}
    </Screen>
  );
};

export default AddRecipe;
