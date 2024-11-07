import React, { useState, useCallback, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-paper";
import _ from "lodash";
import { AdminAddPrisonerStyle, centre } from "../../Styles/AdminStyling";

const AdminSearch = () => {
  const [query, setQuery] = useState("");
  const searchInputRef = useRef(null); // Ref for the TextInput component

  // Debounce the search function
  const debouncedSearch = useCallback(
    _.debounce((searchQuery) => {
      handleSearch(searchQuery);
    }, 500), // Adjust the debounce delay as needed
    []
  );

  const handleChange = (text) => {
    setQuery(text);
    debouncedSearch(text); // Call the debounced search function
  };

  const handleSearch = (searchQuery) => {
    console.log("Searching for:", searchQuery);
    // Add actual search logic or API calls here
  };

  const dismissKeyboard = () => {
    if (searchInputRef.current) {
      searchInputRef.current.blur(); // Blur the TextInput
    }
    Keyboard.dismiss();
  };

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={[centre.centre, AdminAddPrisonerStyle.container]}>
          <Text style={styles.header}>AdminSearch</Text>
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
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default AdminSearch;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  input: {
    backgroundColor: "white",
  },
});
