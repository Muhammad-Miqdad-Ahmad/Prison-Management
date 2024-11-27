// CustomCountrySelector.js
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import { Button } from "react-native-paper";
import { AdminAddPrisonerStyle } from "../Styles/AdminStyling";
import CustomBR from "./customBR";

const CustomCountrySelector = () => {
  const [country, setCountry] = useState(null); // State to store selected country
  const [visible, setVisible] = useState(false); // Control modal visibility

  const onSelect = (selectedCountry) => {
    setCountry(selectedCountry);
    setVisible(false); // Close the modal after selection
  };

  return (
    <View style={AdminAddPrisonerStyle.textDiv}>
      <Text
        style={[
          AdminAddPrisonerStyle.text,
          AdminAddPrisonerStyle.dateHeadingText,
        ]}
      >
        Select Country
      </Text>

      {/* Country Picker Modal */}
      <CountryPicker
        countryCode={country ? country.cca2 : "US"} // Use cca2 code for selected country
        withFilter
        withFlag
        withCountryNameButton
        withAlphaFilter
        withCallingCode
        visible={visible}
        onClose={() => setVisible(false)}
        onSelect={onSelect}
      />
      <CustomBR />
      {/* Button to open the Country Picker */}
      <Button
        onPress={() => setVisible(true)}
        mode="contained-tonal"
        uppercase={false}
      >
        {country ? `${country.name}` : "Choose a country"}
      </Button>
    </View>
  );
};

// Styles for the component to match your UI
const styles = StyleSheet.create({
  countryDisplay: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    paddingBottom: 3,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    borderColor: "#d3d3d3",
    borderWidth: 1,
    width: "90%",
    justifyContent: "center",
  },
  countryFlag: {
    fontSize: 24,
    marginRight: 8,
  },
});

export default CustomCountrySelector;
