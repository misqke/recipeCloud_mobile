import { View, Text } from "react-native";
import { Screen, RecipeForm, Title } from "../components";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const EditRecipe = ({ route, navigation }) => {
  const recipe = route.params;
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.username !== recipe.createdBy) {
      navigation.navigate("home");
    }
  }, [user]);

  return (
    <Screen>
      <Title>Edit Recipe</Title>
      <RecipeForm recipe={recipe} />
    </Screen>
  );
};

export default EditRecipe;
