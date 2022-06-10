import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Screen, RecipeCard, Title, Icon } from "../components";
import React, { useState, useEffect, useRef } from "react";
import { getRecipes } from "../helpers/controllers";
import { COLORS, SIZES } from "../helpers/constants";
import { useSelector } from "react-redux";

const SearchBar = ({ func }) => {
  const [search, setSearch] = useState("");

  return (
    <View style={styles.searchBar}>
      <TextInput
        style={styles.searchInput}
        value={search}
        clearButtonMode="always"
        onChangeText={(text) => setSearch(text)}
        onEndEditing={() => {
          func(search);
        }}
      />
      <View style={styles.searchIcon}>
        <Icon name="search" color={COLORS.gray} size={SIZES.medium} />
      </View>
    </View>
  );
};

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
  const user = useSelector((state) => state.user);
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

  const handleSearch = async (search) => {
    const data = await getRecipes(1, search);
    setRecipes(data.recipes);
    setPage(1);
    setPages(data.pages);
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
        <Title>
          Welcome {user.username !== null ? `${user.username}` : "Guest"}
        </Title>
        <View>
          <Text>Loading recipes...</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <Title>
        Welcome {user.username !== null ? `${user.username}` : "Guest"}
      </Title>
      <FlatList
        ref={listRef}
        data={recipes}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
        keyExtractor={(item) => item._id}
        numColumns={2}
        ListHeaderComponent={<SearchBar func={handleSearch} />}
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
    marginVertical: 10,
  },
  searchBar: {
    width: "100%",
    alignItems: "center",
    position: "relative",
  },
  searchInput: {
    width: "80%",
    backgroundColor: COLORS.white,
    fontSize: SIZES.text,
    padding: 6,
    paddingLeft: "8%",
    borderRadius: 8,
    borderColor: COLORS.dark,
    borderWidth: 1,
    borderStyle: "solid",
  },
  searchIcon: {
    position: "absolute",
    left: "12%",
    top: "50%",
    transform: [{ translateY: -SIZES.medium / 2 }],
  },
});
