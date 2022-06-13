import axios from "axios";
import * as SecureStore from "expo-secure-store";

// handle auth
export const logIn = async (user) => {
  try {
    const { data } = await axios.post(
      `https://misqke-recipe-cloud.herokuapp.com/api/auth/login`,
      user
    );
    await setUser({
      username: user.username,
      password: user.password,
      token: data.token,
    });
    return data;
  } catch (error) {
    console.log(error);
    return { error: error.response.data.error };
  }
};

export const logout = async () => {
  await axios.get("https://misqke-recipe-cloud.herokuapp.com/api/auth/logout");
  await SecureStore.setItemAsync("username", JSON.stringify(null));
  await SecureStore.setItemAsync("password", JSON.stringify(null));
  await SecureStore.setItemAsync("token", JSON.stringify(null));
};

// handle secure storage
export const checkUser = async () => {
  try {
    let jsonUsername = await SecureStore.getItemAsync("username");
    let jsonPassword = await SecureStore.getItemAsync("password");

    const username = JSON.parse(jsonUsername);
    const password = JSON.parse(jsonPassword);

    return username ? { username, password } : null;
  } catch (error) {
    return null;
  }
};

export const setUser = async (user) => {
  try {
    await SecureStore.setItemAsync("username", JSON.stringify(user.username));
    await SecureStore.setItemAsync("password", JSON.stringify(user.password));
    await SecureStore.setItemAsync("token", JSON.stringify(user.token));
  } catch (error) {
    console.log(error);
  }
};

// handle getting recipes
export const getRecipes = async (page = 1, search = "") => {
  const { data } = await axios.get(
    `https://misqke-recipe-cloud.herokuapp.com/api/recipes/?page=${page}&limit=8&search=${search}`
  );
  return data;
};

export const getBookRecipes = async (author, viewer) => {
  const { data } = await axios.get(
    `https://misqke-recipe-cloud.herokuapp.com/api/recipes/?username=${author}&viewer=${viewer}`
  );
  return data.recipes;
};

export const getLikedRecipes = async (userId) => {
  const { data } = await axios.get(
    `https://misqke-recipe-cloud.herokuapp.com/api/recipes/likes/?id=${userId}`
  );
  return data.recipes;
};

// handle likes
export const toggleLike = async (recipeId) => {
  try {
    const jsonToken = await SecureStore.getItemAsync("token");
    const token = JSON.parse(jsonToken);
    const { data } = await axios.get(
      `https://misqke-recipe-cloud.herokuapp.com/api/recipes/${recipeId}/like`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data.user.liked_recipes;
  } catch (error) {
    console.log(error);
    return { error: error.response.data.error };
  }
};

// handle comments
export const addComment = async (recipeId, comment) => {
  try {
    const jsonToken = await SecureStore.getItemAsync("token");
    const token = JSON.parse(jsonToken);
    const { data } = await axios.patch(
      `https://misqke-recipe-cloud.herokuapp.com/api/recipes/${recipeId}/comment`,
      { comment },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (data.recipe) {
      return data.recipe;
    } else {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async (recipeId, index) => {
  try {
    const jsonToken = await SecureStore.getItemAsync("token");
    const token = JSON.parse(jsonToken);
    const { data } = await axios.patch(
      `https://misqke-recipe-cloud.herokuapp.com/api/recipes/${recipeId}/comment/delete`,
      { index },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (data.recipe) {
      return data.recipe;
    } else {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

// add or update recipes
export const addRecipe = async (recipe) => {
  try {
    const jsonToken = await SecureStore.getItemAsync("token");
    const token = JSON.parse(jsonToken);
    const { data } = await axios.post(
      `https://misqke-recipe-cloud.herokuapp.com/api/recipes`,
      recipe,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data.recipe;
  } catch (error) {
    console.log(error);
  }
};

export const updateRecipe = async (recipe) => {
  try {
    const jsonToken = await SecureStore.getItemAsync("token");
    const token = JSON.parse(jsonToken);
    const id = recipe._id;
    const { data } = await axios.patch(
      `https://misqke-recipe-cloud.herokuapp.com/api/recipes/${id}`,
      recipe,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data.recipe;
  } catch (error) {
    console.log(error);
  }
};
