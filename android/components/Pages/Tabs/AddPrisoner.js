import React, { useState } from "react";
import {
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import FingerprintScanner from "react-native-fingerprint-scanner"

const dismissKeyboard = () => {
  Keyboard.dismiss();
};

export const AddPrisoner = ({ route }) => {
  const [data, setData] = useState({});
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <ScrollView>
        {route?.params?.components?.map((component, index) =>
          React.cloneElement(component, { key: index, data, setData })
        )}
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default AddPrisoner;
