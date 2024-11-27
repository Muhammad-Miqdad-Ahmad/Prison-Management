import { View, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";

const CustomComponentLoader = ({ hite, size = 70, color = "#00cb53" }) => {
  return (
    <View style={[styles.loaderDiv, { height: hite }]}>
      <ActivityIndicator style={styles.indicator} size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderDiv: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  indicator: {
    padding: 12,
    borderRadius: 12,
  },
});

export default CustomComponentLoader;
