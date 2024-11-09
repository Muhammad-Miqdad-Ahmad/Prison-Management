import React from "react";
import { Keyboard, ScrollView, TouchableWithoutFeedback } from "react-native";

const dismissKeyboard = () => {
  Keyboard.dismiss();
};

const UpdatePrisoner = ({ route }) => {
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <ScrollView>
        {route?.params?.components?.map((component) => component)}
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default UpdatePrisoner;
