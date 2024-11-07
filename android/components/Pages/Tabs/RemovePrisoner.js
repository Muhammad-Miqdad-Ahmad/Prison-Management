import React, { useState, useCallback } from "react";
import { View, ScrollView, Keyboard, TouchableWithoutFeedback } from "react-native";
import CustomBR from "../../Custom/customBR";
import { TextInput, Button } from "react-native-paper";
import { AdminAddPrisonerStyle, centre } from "../../Styles/AdminStyling";
import _ from "lodash";

const AddPrisoner = () => {
  const [removeBasedOn, setremoveBasedOn] = useState("PrisonerID");
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
    debouncedSearch(text);  // Call the debounced search function
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();  // Dismiss keyboard when clicking outside
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
            <Button
              buttonColor={removeBasedOn === "PrisonerID" ? "red" : ""}
              mode={removeBasedOn === "PrisonerID" ? "contained" : "elevated"}
              onPress={() => setremoveBasedOn("PrisonerID")}
            >
              PrisonerID
            </Button>
            <Button
              buttonColor={removeBasedOn === "Email" ? "red" : ""}
              mode={removeBasedOn === "Email" ? "contained" : "elevated"}
              onPress={() => setremoveBasedOn("Email")}
            >
              Email
            </Button>
            <Button
              buttonColor={removeBasedOn === "Name" ? "red" : ""}
              mode={removeBasedOn === "Name" ? "contained" : "elevated"}
              onPress={() => setremoveBasedOn("Name")}
            >
              Name
            </Button>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default AddPrisoner;
