import {
  FlatList,
  useWindowDimensions,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { Screen, RecipeCard, Title } from "../components";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getBookRecipes, getLikedRecipes } from "../helpers/controllers";
import { useIsFocused } from "@react-navigation/native";

const RecipeBook = ({ route }) => {
  const isFocused = useIsFocused();
  const user = useSelector((state) => state.user);
  const author = route.params;
  const [recipes, setRecipes] = useState([]);
  const { width, height } = useWindowDimensions();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRecipes = async () => {
      const { recipes, msg } = await getBookRecipes(author, user.username);
      if (author === user.username) {
        const data = await getLikedRecipes(user._id);
        if (msg) {
          setRecipes([...data]);
        } else {
          setRecipes([...recipes, ...data]);
        }
      } else {
        setRecipes(recipes);
      }
      setLoading(false);
    };
    if (isFocused) getRecipes();
  }, [author, user, isFocused]);

  return (
    <Screen>
      <Title>{author}'s recipes</Title>
      <FlatList
        data={recipes}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
        keyExtractor={(item) => item._id}
        numColumns={width > 600 ? 3 : 2}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator />
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>You have no recipes yet.</Text>
            </View>
          )
        }
        style={{
          flex: 1,
          width: "100%",
        }}
        contentContainerStyle={{
          width: "100%",
        }}
        columnWrapperStyle={{
          justifyContent: "center",
        }}
      />
    </Screen>
  );
};

export default RecipeBook;
