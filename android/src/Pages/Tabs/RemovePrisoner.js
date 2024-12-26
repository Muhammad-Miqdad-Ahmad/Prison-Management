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
import { submitDeletePrisoner } from "../../Functions/Functions";

const RemovePrisoner = ({ buttonLabels = ["PrisonerID"] }) => {
  const [removeBasedOn, setRemoveBasedOn] = useState("PrisonerID");
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
          <CustomSubmit callback={submitDeletePrisoner} data={searchQuery} />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default RemovePrisoner;
