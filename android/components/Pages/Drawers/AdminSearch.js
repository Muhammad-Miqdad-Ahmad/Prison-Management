import React, { useState, useCallback, useRef } from "react";
import {
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import _ from "lodash";
import {
  AdminAddPrisonerStyle,
  AdminSearchStyle,
  centre,
} from "../../Styles/AdminStyling";
import CustomBR from "../../Custom/customBR";
import { TextInput } from "react-native-paper";
import CustomButtonSelector from "../../Custom/CustomButtonSelector";
import { searchDebounce } from "../../Functions/Functions";


const AdminSearch = () => {
  const searchInputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [searchResults, setsearchResults] = useState({});
  const [removeBasedOn, setRemoveBasedOn] = useState("Admin");

  const debouncedSearch = useCallback(
    _.debounce((searchQuery) => {
      console.log("Searching for:", searchQuery);
      setsearchResults(searchDebounce());
    }, 500),
    []
  );

  const handleChange = (text) => {
    setQuery(text);
    debouncedSearch(text);
  };

  const dismissKeyboard = () => {
    if (searchInputRef.current) {
      searchInputRef.current.blur();
    }
    Keyboard.dismiss();
  };

  const buttonLabels = ["Admin", "Prisoner", "Guard", "Relatives", "Visitors"];

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={[centre.centre, AdminAddPrisonerStyle.container]}>
          <Text style={AdminSearchStyle.header}>AdminSearch</Text>
          <TextInput
            value={query}
            label="Search"
            mode="outlined"
            outlineColor="blue"
            ref={searchInputRef}
            activeOutlineColor="red"
            onChangeText={handleChange}
            style={[AdminAddPrisonerStyle.input]}
            outlineStyle={AdminAddPrisonerStyle.inputBorderStyle}
          />
          <CustomBR />
          <View style={AdminSearchStyle.buttonsContainer}>
            <CustomButtonSelector
              buttonLabels={buttonLabels}
              selectedState={removeBasedOn}
              setSelectedState={setRemoveBasedOn}
              buttonStyle={AdminSearchStyle}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default AdminSearch;
