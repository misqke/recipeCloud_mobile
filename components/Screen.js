import { View } from "react-native";
import React from "react";
import { COLORS } from "../helpers/constants";

const Screen = ({ children }) => {
  return (
    <View
      style={{
        flex: 1,
        position: "relative",
        backgroundColor: COLORS.secondary,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 60,
      }}
    >
      {children}
    </View>
  );
};

export default Screen;
