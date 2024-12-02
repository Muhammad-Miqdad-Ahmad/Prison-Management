import { View, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";

const Loader = () => {
  return (
    <View style={[styles.loaderDiv]}>
      <ActivityIndicator style={styles.indicator} size={70} color='#0017fe' />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderDiv: {
    backgroundColor: "#939393",
    opacity: 0.5,
    zIndex: 3,
    height: "100%",
    width: "100%",
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    padding: 12,
    backgroundColor: '#555',
    borderRadius: 12
  },
});

export default Loader;
