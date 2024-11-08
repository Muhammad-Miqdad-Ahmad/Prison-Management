import React from "react";
import { TextInput } from "react-native-paper";
import { AdminAddPrisonerStyle } from "../Styles/AdminStyling";

const CustomTextInput = ({
  children,
  outlineColor,
  activeOutlineColor,
  label,
  data,
  setData
}) => {
  const handleTextChange = (text) => {
    setData((prevData) => ({
      ...prevData,
      [label]: text, // Update the specific field in the data object
    }));
  };

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
      value={data[label] || ''} // Display the value for the specific label in the input
      onChangeText={handleTextChange} // Call handleTextChange on text change
    />
  );
};

export default CustomTextInput;
