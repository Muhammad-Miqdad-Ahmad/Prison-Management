import React, { useState, useCallback } from "react";
import {
  View,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import CustomBR from "../Custom/customBR";
import { TextInput } from "react-native-paper";
import { AdminAddPrisonerStyle, centre } from "../Styles/AdminStyling";
import _ from "lodash";
import CustomButtonSelector from "../Custom/CustomButtonSelector";

const RemovePerson = ({
  buttonLabels = ["PrisonerID", "Email", "Name"],
  data,
  setData,
}) => {
  const [removeBasedOn, setRemoveBasedOn] = useState("PrisonerID");
  const [searchQuery, setSearchQuery] = useState("");

  // Debounce function for search
  const debouncedSearch = useCallback(
    _.debounce((query) => {
      handleSearch(query);
    }, 500),
    []
  );

  const handleSearch = (query) => {
    console.log("Searching for:", query);
    // Place your search logic here
  };

  const handleChange = (text) => {
    setSearchQuery(text);
    debouncedSearch(text); // Call the debounced search function
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss(); // Dismiss keyboard when clicking outside
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <ScrollView>
        <View style={[centre.centre, AdminAddPrisonerStyle.container]}>
          <TextInput
            outlineStyle={AdminAddPrisonerStyle.inputBorderStyle}
            style={[AdminAddPrisonerStyle.input]}
            mode="outlined"
            placeholder="Search For the Prisoner"
            outlineColor="blue"
            activeOutlineColor="red"
            label={"Search"}
            value={searchQuery}
            onChangeText={handleChange}
          />
          <CustomBR />
          <View style={AdminAddPrisonerStyle.removebuttonContainer}>
            <CustomButtonSelector
              buttonLabels={buttonLabels}
              selectedState={removeBasedOn}
              setSelectedState={setRemoveBasedOn}
            />
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default RemovePerson;
