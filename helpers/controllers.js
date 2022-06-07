import axios from "axios";

export const getRecipes = async (page = 1, search = "") => {
  const { data } = await axios.get(
    `https://misqke-recipe-cloud.herokuapp.com/api/recipes/?page=${page}&limit=8&search=${search}`
  );
  return data;
};

export const logIn = async (user) => {
  try {
    const { data } = await axios.post(
      `https://misqke-recipe-cloud.herokuapp.com/api/auth/login`,
      user
    );
    return data;
  } catch (error) {
    return { error: error.response.data.error };
  }
};
