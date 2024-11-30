import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
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
import CustomSearchMenu from "../../Custom/CustomSearchMenu";
import DisplayData from "../DisplayData";

const AdminSearch = () => {
  const searchInputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [blurr, setBlurr] = useState(false);
  const [selected, setSelected] = useState(undefined);
  const [searchResults, setsearchResults] = useState([]);
  const [searchBasedOn, setSearchBasedOn] = useState("Admins");

  useEffect(() => {
    console.log(searchBasedOn);
  }, [searchBasedOn]);

  useEffect(() => {
    if (selected) {
      console.log("selected is: ", selected);
    }
  }, [selected]);

  const handleSearch = async (searchQuery, basedOn) => {
    if (searchQuery === "") {
      setsearchResults([]);
      return;
    }
    const res = await searchDebounce(basedOn.toLowerCase(), searchQuery);
    const temp = await res.json();
    if (temp?.data.length < 1) setsearchResults([]);
    else setsearchResults(temp?.data);
  };

  const debouncedSearch = useCallback(
    _.debounce((text) => {
      handleSearch(text, searchBasedOn);
    }, 500),
    [searchBasedOn]
  );

  const handleChange = (text) => {
    setQuery(text);
    debouncedSearch(text);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const buttonLabels = ["Admins", "Prisoners", "Guards", "Prisons", "Visitors"];

  return (
    <>
      {blurr ? (
        <CustomSearchMenu
          data={searchResults}
          setData={setSelected}
          shown={setBlurr}
        />
      ) : null}

      <TouchableWithoutFeedback
        onPress={dismissKeyboard}
        accessible={false} // Avoid blocking touch events
      >
        <>
          <ScrollView>
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
                onBlur={() => setBlurr(false)}
                onFocus={() => setBlurr(true)}
                onSubmitEditing={(event) => console.log(event.nativeEvent.text)}
                style={[AdminAddPrisonerStyle.input]}
                outlineStyle={AdminAddPrisonerStyle.inputBorderStyle}
              />

              <CustomBR />
              <View style={AdminSearchStyle.buttonsContainer}>
                <CustomButtonSelector
                  buttonLabels={buttonLabels}
                  selectedState={searchBasedOn}
                  setSelectedState={setSearchBasedOn}
                  buttonStyle={AdminSearchStyle}
                />
              </View>
            </View>
            <DisplayData display={selected} setDisplay={setSelected} />
          </ScrollView>
        </>
      </TouchableWithoutFeedback>
    </>
  );
};

export default AdminSearch;
