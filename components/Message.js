import { View, Text } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../helpers/constants";

const Message = ({ children, error = false }) => {
  return (
    <View
      style={{
        position: "absolute",
        width: "100%",
        top: 60,
        backgroundColor: error ? "#f009" : "#33f9",
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
      }}
    >
      <Text
        style={{
          color: COLORS.white,
          fontSize: SIZES.text,
        }}
      >
        {children}
      </Text>
    </View>
  );
};

export default Message;
