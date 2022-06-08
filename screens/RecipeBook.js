import { View, Text, FlatList } from "react-native";
import { Screen, RecipeCard, Title } from "../components";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getBookRecipes } from "../helpers/controllers";

const RecipeBook = ({ route }) => {
  const user = useSelector((state) => state.user);
  const author = route.params;
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      const bookRecipes = await getBookRecipes(author, user.username);
      setRecipes(bookRecipes);
    };
    getRecipes();
  }, [author, user]);

  return (
    <Screen>
      <Title>{author}'s recipes</Title>
      <FlatList
        data={recipes}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
        keyExtractor={(item) => item._id}
        numColumns={2}
        style={{
          flex: 1,
          width: "100%",
        }}
      />
    </Screen>
  );
};

export default RecipeBook;
