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
import CustomButtonSelector from "../../Custom/CustomButtonSelector";
import CustomSubmit from "../../Custom/CustomSubmit";
import { submitDeleteAdmin } from "../../Functions/Functions";

const RemoveAdmin = ({ buttonLabels = ["adminID"] }) => {
  const [removeBasedOn, setRemoveBasedOn] = useState("adminID");
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
            placeholder="Enter the admin ID"
            outlineColor="blue"
            activeOutlineColor="red"
            label={"adminID"}
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
          <CustomSubmit callback={submitDeleteAdmin} data={searchQuery} />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default RemoveAdmin;
