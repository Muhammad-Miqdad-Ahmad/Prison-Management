import { TouchableWithoutFeedback, ScrollView } from "react-native";
import React from "react";

const dismissKeyboard = () => {
  Keyboard.dismiss();
};

const RemovePrisoner = ({ route }) => {
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <ScrollView>
        {route?.params?.components?.map((component) => component)}
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default RemovePrisoner;
