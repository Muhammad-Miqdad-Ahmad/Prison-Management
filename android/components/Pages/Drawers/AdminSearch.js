import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Animated,
  Dimensions,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import _ from "lodash";
import {
  AdminAddPrisonerStyle,
  AdminSearchStyle,
  centre,
} from "../../Styles/AdminStyling";
import CustomBR from "../../Custom/customBR";

const screenWidth = Dimensions.get("window").width;

const AdminSearch = () => {
  const [query, setQuery] = useState("");
  const [removeBasedOn, setRemoveBasedOn] = useState("Admin");
  const searchInputRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  // Debounce the search function
  const debouncedSearch = useCallback(
    _.debounce((searchQuery) => {
      handleSearch(searchQuery);
    }, 500),
    []
  );

  const handleChange = (text) => {
    setQuery(text);
    debouncedSearch(text);
  };

  const handleSearch = (searchQuery) => {
    console.log("Searching for:", searchQuery);
    // Add actual search logic or API calls here
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
            <Animated.ScrollView
              horizontal
              style={AdminSearchStyle.scroll}
              showsHorizontalScrollIndicator={false}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: false }
              )}
              scrollEventThrottle={16}
            >
              {buttonLabels.map((label, index) => {
                // Start the buttons off-screen to the right (or left if you prefer)
                const slideAnim = useRef(new Animated.Value(screenWidth)).current;

                // Trigger slide-in animation when the button is about to appear on the screen
                useEffect(() => {
                  Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                  }).start();
                }, []);

                return (
                  <Animated.View
                    key={index}
                    style={[
                      AdminSearchStyle.button,
                      { transform: [{ translateX: slideAnim }] },
                    ]}
                  >
                    <Button
                      buttonColor={removeBasedOn === label ? "red" : ""}
                      mode={removeBasedOn === label ? "contained" : "elevated"}
                      onPress={() => setRemoveBasedOn(label)}
                    >
                      {label}
                    </Button>
                  </Animated.View>
                );
              })}
            </Animated.ScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default AdminSearch;
