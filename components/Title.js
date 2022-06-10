import { Text, View } from "react-native";
import { FONTS, COLORS, SIZES } from "../helpers/constants";
import React from "react";

const Title = ({ children }) => {
  return (
    <View
      style={{
        padding: SIZES.small,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.dark,
        width: "100%",
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        position: "absolute",
        top: 0,
        zIndex: 10,
      }}
    >
      <Text
        style={{
          fontFamily: FONTS.bold,
          color: COLORS.white,
          fontSize: SIZES.large,
          lineHeight: SIZES.large,
          letterSpacing: 1.25,
        }}
      >
        {children}
      </Text>
    </View>
  );
};

export default Title;
