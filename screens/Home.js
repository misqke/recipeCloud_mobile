import { View, Text, FlatList } from "react-native";
import { Screen, RecipeCard } from "../components";
import axios from "axios";
import React, { useState, useEffect } from "react";

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const { data } = await axios.get(
          "https://misqke-recipe-cloud.herokuapp.com/api/recipes"
        );
        setRecipes(data.recipes);
        console.log(data.recipes[0]);
      } catch (error) {
        console.log(error.message);
      }
    };
    getRecipes();
  }, []);

  return (
    <Screen>
      <Text>Home</Text>
      <FlatList
        data={recipes}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
        keyExtractor={(item) => item._id}
        style={{
          flex: 1,
          width: "100%",
        }}
      />
    </Screen>
  );
};

export default Home;
