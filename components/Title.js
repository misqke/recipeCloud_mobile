import { Text, View } from "react-native";
import { FONTS, COLORS, SIZES } from "../helpers/constants";
import React from "react";

const Title = ({ children }) => {
  return (
    <View
      style={{
        padding: SIZES.text,
        paddingTop: SIZES.small,
        backgroundColor: COLORS.dark,
        width: "100%",
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
      }}
    >
      <Text
        style={{
          fontFamily: FONTS.bold,
          color: COLORS.primary,
          fontSize: SIZES.large,
        }}
      >
        {children}
      </Text>
    </View>
  );
};

export default Title;
