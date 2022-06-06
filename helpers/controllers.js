import axios from "axios";

export const getRecipes = async (page = 1, search = "") => {
  const { data } = await axios.get(
    `https://misqke-recipe-cloud.herokuapp.com/api/recipes/?page=${page}&limit=8&search=${search}`
  );
  return data;
};
