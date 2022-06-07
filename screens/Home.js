import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Screen, RecipeCard, Title } from "../components";
import React, { useState, useEffect, useRef } from "react";
import { getRecipes } from "../helpers/controllers";
import { COLORS } from "../helpers/constants";

const Pagination = ({ page, pages, press }) => {
  return (
    <View style={styles.paginationContainer}>
      <TouchableOpacity onPress={() => press(-1)}>
        <Text style={{ color: `${page > 1 ? COLORS.primary : COLORS.dark}` }}>
          Prev
        </Text>
      </TouchableOpacity>

      <Text>{`${page} / ${pages}`}</Text>

      <TouchableOpacity onPress={() => press(1)}>
        <Text
          style={{ color: `${page < pages ? COLORS.primary : COLORS.dark}` }}
        >
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Home = () => {
  const listRef = useRef();
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const handlePagePress = async (dir) => {
    if ((dir === 1 && page === pages) || (dir === -1 && page === 1)) return;
    const newRecipes = await getRecipes(page + dir);
    setRecipes(newRecipes.recipes);
    setPage((prev) => prev + dir);
    listRef.current.scrollToOffset({ animated: true, offset: 0 });
  };

  useEffect(() => {
    const getInitialRecipes = async () => {
      const data = await getRecipes(1);
      setRecipes(data.recipes);
      setPages(data.pages);
    };
    getInitialRecipes();
  }, []);

  if (!recipes.length) {
    return (
      <Screen>
        <Title>Welcome Guest</Title>
        <View>
          <Text>Loading recipes...</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <Title>Welcome Guest</Title>
      <FlatList
        ref={listRef}
        data={recipes}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
        keyExtractor={(item) => item._id}
        numColumns={2}
        ListHeaderComponent={
          <Pagination page={page} pages={pages} press={handlePagePress} />
        }
        ListFooterComponent={
          <Pagination page={page} pages={pages} press={handlePagePress} />
        }
        style={{
          flex: 1,
          width: "100%",
        }}
      />
    </Screen>
  );
};

export default Home;

const styles = StyleSheet.create({
  paginationContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 15,
    marginBottom: 20,
  },
});
