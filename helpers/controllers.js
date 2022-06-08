import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const checkUser = async () => {
  let jsonUser = await SecureStore.getItemAsync("user");
  let jsonToken = await SecureStore.getItemAsync("token");
  let jsonLikes = await SecureStore.getItemAsync("likes");
  const user = JSON.parse(jsonUser);
  const token = JSON.parse(jsonToken);
  const likes = JSON.parse(jsonLikes);
  return user ? { user, token, likes } : null;
};

export const setUser = async (data) => {
  await SecureStore.setItemAsync("user", JSON.stringify(data.user));
  await SecureStore.setItemAsync("token", JSON.stringify(data.token));
  await SecureStore.setItemAsync("likes", JSON.stringify(data.likes));
};

export const logout = async () => {
  await SecureStore.setItemAsync("user", JSON.stringify(null));
  await SecureStore.setItemAsync("token", JSON.stringify(null));
  await SecureStore.setItemAsync("likes", JSON.stringify(null));
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
    setUser(data);
    return data;
  } catch (error) {
    return { error: error.response.data.error };
  }
};
