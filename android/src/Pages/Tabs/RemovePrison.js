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
import { submitDeleteGuard, submitDeletePrison } from "../../Functions/Functions";

const RemovePrison = ({ buttonLabels = ["prisonID"] }) => {
  const [removeBasedOn, setRemoveBasedOn] = useState("prisonID");
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
            placeholder="Enter the prison ID"
            outlineColor="blue"
            activeOutlineColor="red"
            label={"prisonID"}
            value={searchQuery}
            onChangeText={handleChange}
          />
          <CustomBR />
          <CustomSubmit callback={submitDeletePrison} data={searchQuery} />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default RemovePrison;
