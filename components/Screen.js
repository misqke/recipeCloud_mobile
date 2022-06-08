import { View } from "react-native";
import React from "react";
import { COLORS } from "../helpers/constants";

const Screen = ({ children }) => {
  return (
    <View
      style={{
        position: "relative",
        backgroundColor: COLORS.secondary,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        paddingTop: 60,
        paddingBottom: 60,
      }}
    >
      {children}
    </View>
  );
};

export default Screen;
