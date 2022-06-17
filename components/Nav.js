import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../helpers/constants";
import Icon from "./Icon";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/userSlice";
import { logout } from "../helpers/controllers";

const Nav = () => {
  const user = useSelector((state) => state.user);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogoutPress = async () => {
    dispatch(logoutUser());
    await logout();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("home")}
      >
        <Icon name="home" color={COLORS.secondary} size={SIZES.large} />
        <Text style={styles.text}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("recipeBook", user.username)}
      >
        <Icon name="book" color={COLORS.secondary} size={SIZES.large} />
        <Text style={styles.text}>Recipe Book</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("addRecipe")}
      >
        <Icon name="document" color={COLORS.secondary} size={SIZES.large} />
        <Text style={styles.text}>Add Recipe</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => handleLogoutPress()}>
        <Icon name="log-out" color={COLORS.secondary} size={SIZES.large} />
        <Text style={styles.text}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Nav;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 60,
    backgroundColor: COLORS.dark,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  btn: {
    shadowColor: COLORS.primary,
    shadowRadius: 5,
    shadowOpacity: 0.75,
    alignItems: "center",
  },
  text: {
    color: COLORS.secondary,
    fontSize: SIZES.small,
  },
});
