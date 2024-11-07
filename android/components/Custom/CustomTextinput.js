import React from "react";
import { TextInput } from "react-native-paper";
import { AdminAddPrisonerStyle } from "../Styles/AdminStyling";

// Define the CustomTextInput component that accepts dynamic props
const CustomTextInput = ({
  children,
  outlineColor = "blue",
  activeOutlineColor = "red",
  label = "",
}) => {
  return (
    <TextInput
      multiline={true}
      keyboardType="text"
      outlineStyle={AdminAddPrisonerStyle.inputBorderStyle}
      style={[AdminAddPrisonerStyle.input]}
      mode={"outlined"}
      placeholder={children}
      outlineColor={outlineColor}
      activeOutlineColor={activeOutlineColor}
      label={label}
    />
  );
};

export default CustomTextInput;
