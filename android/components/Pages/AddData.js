import React, { useEffect, useState } from "react";
import {
  View,
  useColorScheme,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import CustomBR from "../Custom/customBR";
import {
  TextInput,
  RadioButton,
  Text,
  Provider as PaperProvider,
  MD3DarkTheme,
  MD3LightTheme,
} from "react-native-paper";
import CustomDatePicker from "../Custom/CustomDatePicker"; // Import CustomDatePicker
import { AdminAddPrisonerStyle, centre } from "../Styles/AdminStyling";
import { textInputForMenu } from "../Functions/Functions";
import CustomTextInput from "../Custom/CustomTextinput";
import CustomCountrySelector from "../Custom/CountrySelector";

const AddPersonData = ({ data, setData }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? MD3DarkTheme : MD3LightTheme;
  const [checked, setChecked] = useState("");
  const [date, setDate] = useState(undefined);
  const [dateOfBirth, setDateOfBirth] = useState(undefined);

  return (
    <PaperProvider theme={theme}>
      <ScrollView>
        <CustomDatePicker date={dateOfBirth} setDate={setDateOfBirth}>
          {/* Use CustomDatePicker with AddPrisoner fields as children */}
          <View style={[centre.centre, AdminAddPrisonerStyle.container]}>
            {/* First name of the prisoner */}
            <CustomTextInput
              outlineColor="blue"
              activeOutlineColor="red"
              label="First Name"
            >
              {"Enter The First Name"}
            </CustomTextInput>
            <CustomBR />

            {/* Last name of the prisoner */}
            <CustomTextInput
              outlineColor="blue"
              activeOutlineColor="red"
              label="Last Name"
            >
              {"Enter The last Name"}
            </CustomTextInput>
            <CustomBR />

            {/* Gender selection */}
            {textInputForMenu("Please Select The Gender")}
            <View style={AdminAddPrisonerStyle.radioContainer}>
              <View
                style={[AdminAddPrisonerStyle.radioContainer, centre.centre]}
              >
                <Text style={AdminAddPrisonerStyle.text}>Male</Text>
                <RadioButton
                  color="blue"
                  uncheckedColor="grey"
                  value="male"
                  status={checked === "male" ? "checked" : "unchecked"}
                  onPress={() => setChecked("male")}
                />
              </View>
              <View
                style={[AdminAddPrisonerStyle.radioContainer, centre.centre]}
              >
                <Text style={AdminAddPrisonerStyle.text}>Female</Text>
                <RadioButton
                  color="red"
                  uncheckedColor="grey"
                  value="female"
                  status={checked === "female" ? "checked" : "unchecked"}
                  onPress={() => setChecked("female")}
                />
              </View>
            </View>
            <CustomBR />

            {/* Age of the prisoner */}
            <CustomTextInput
              outlineColor="blue"
              activeOutlineColor="red"
              label="Age"
            >
              {"Enter The Age of The Prisoner"}
            </CustomTextInput>
            <CustomBR />
          </View>
          {"Date of Birth"}
        </CustomDatePicker>

        <View style={[centre.centre, AdminAddPrisonerStyle.container]}>
          <CustomBR />

          {/* Nationality */}
          <CustomCountrySelector />
        </View>
      </ScrollView>
    </PaperProvider>
  );
};

export default AddPersonData;
