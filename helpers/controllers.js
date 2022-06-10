import axios from "axios";
import * as SecureStore from "expo-secure-store";

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
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  await SecureStore.setItemAsync("username", JSON.stringify(null));
  await SecureStore.setItemAsync("password", JSON.stringify(null));
};

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

export const logIn = async (user) => {
  try {
    const { data } = await axios.post(
      `https://misqke-recipe-cloud.herokuapp.com/api/auth/login`,
      user
    );
    await setUser(user);
    return data;
  } catch (error) {
    console.log(error);
    return { error: error.response.data.error };
  }
};

export const getLikedRecipes = async (userId) => {
  const { data } = await axios.get(
    `https://misqke-recipe-cloud.herokuapp.com/api/recipes/likes/?id=${userId}`
  );
  return data.recipes;
};

export const toggleLike = async (id, token) => {
  try {
    const { data } = await axios.get(
      `https://misqke-recipe-cloud.herokuapp.com/api/recipes/${id}/like`,
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
