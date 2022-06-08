import { Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React from "react";

export default ({ name, size, color }) => {
  return (
    <Icon
      name={Platform.OS === "ios" ? `ios-${name}` : `md-${name}`}
      color={color}
      size={size}
    />
  );
};
