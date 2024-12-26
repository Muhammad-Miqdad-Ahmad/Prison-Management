import React, { useState, useCallback } from "react";
import {
  View,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import CustomBR from "../../Custom/customBR";
import { TextInput } from "react-native-paper";
import { AdminAddPrisonerStyle, centre } from "../../Styles/AdminStyling";
import _ from "lodash";
import CustomButtonSelector from "../../Custom/CustomButtonSelector";
import CustomSubmit from "../../Custom/CustomSubmit";
import { submitDeleteGuard } from "../../Functions/Functions";

const RemoveGuard = ({ buttonLabels = ["guardID"] }) => {
  const [removeBasedOn, setRemoveBasedOn] = useState("guardID");
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (text) => {
    setSearchQuery(text);
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
            placeholder="Enter the prisoner ID"
            outlineColor="blue"
            activeOutlineColor="red"
            label={"prisonerID"}
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
          <CustomSubmit callback={submitDeleteGuard} data={searchQuery} />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default RemoveGuard;
