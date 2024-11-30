import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

const CustomSubmit = ({ callback = console.log, data = "Some Data" }) => {
  return (
    <View style={{ margin: 16 }}>
      <Button
        mode="contained-tonal"
        onPress={() => {
          callback(data);
        }}
      >
        Submit
      </Button>
    </View>
  );
};

export default CustomSubmit;
