import { ActivityIndicator } from "react-native";
import { Screen, RecipeForm, Title } from "../components";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { updateRecipe } from "../helpers/controllers";
import { COLORS } from "../helpers/constants";

const EditRecipe = ({ route, navigation }) => {
  const recipe = route.params;
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (submission) => {
    setLoading(true);
    const newRecipe = await updateRecipe({ ...submission, _id: recipe._id });
    navigation.navigate("recipe", newRecipe);
  };

  useEffect(() => {
    if (user.username !== recipe.createdBy) {
      navigation.navigate("home");
    }
  }, [user]);

  return (
    <Screen>
      <Title>Edit Recipe</Title>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <RecipeForm recipe={recipe} submit={handleSubmit} />
      )}
    </Screen>
  );
};

export default EditRecipe;
