import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import {
  homeIcon,
  writeIcon,
  bookIcon,
  logoutIcon,
  COLORS,
  SIZES,
} from "../helpers/constants";
import { useNavigation } from "@react-navigation/native";
import React from "react";

const Nav = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("home")}
      >
        <Image source={homeIcon} resizeMode="contain" style={styles.img} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("recipeBook")}
      >
        <Image source={bookIcon} resizeMode="contain" style={styles.img} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("addRecipe")}
      >
        <Image source={writeIcon} resizeMode="contain" style={styles.img} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn}>
        <Image source={logoutIcon} resizeMode="contain" style={styles.img} />
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
    shadowColor: COLORS.white,
    shadowRadius: 5,
    shadowOpacity: 1,
  },
  img: {
    width: 30,
    height: 30,
    shadowColor: COLORS.light,
    shadowRadius: 1,
    shadowOpacity: 0.5,
  },
});
