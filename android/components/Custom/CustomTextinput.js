import React from "react";
import { TextInput } from "react-native-paper";
import { AdminAddPrisonerStyle } from "../Styles/AdminStyling";

const CustomTextInput = ({
  children,
  outlineColor = "blue",
  activeOutlineColor = "red",
  label,
  keyboardType = "text",
  data,
  setData,
  maxLength = 50,
  onSubmitEditing = console.log,
}) => {
  const handleTextChange = (text) => {
    setData((prevData) => ({
      ...prevData,
      [label]: text, // Update the specific field in the data object
    }));
  };

  return (
    <TextInput
      label={label}
      multiline={true}
      mode={"outlined"}
      maxLength={maxLength}
      placeholder={children}
      value={data[label] || ""}
      keyboardType={keyboardType}
      outlineColor={outlineColor}
      onChangeText={handleTextChange}
      onSubmitEditing={onSubmitEditing}
      style={[AdminAddPrisonerStyle.input]}
      activeOutlineColor={activeOutlineColor}
      outlineStyle={AdminAddPrisonerStyle.inputBorderStyle}
    />
  );
};

export default CustomTextInput;
