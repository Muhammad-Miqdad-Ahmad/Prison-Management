import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, useColorScheme, ScrollView, Keyboard, TouchableWithoutFeedback } from "react-native";
import CustomBR from "../../Custom/customBR";
import {
  TextInput,
  RadioButton,
  Button,
  Text,
  Provider as PaperProvider,
  MD3DarkTheme,
  MD3LightTheme,
} from "react-native-paper";
import { AdminAddPrisonerStyle, centre } from "../../Styles/AdminStyling";
import {
  DatePickerModal,
  enGB,
  registerTranslation,
} from "react-native-paper-dates";
import { textInputForMenu } from "../../Functions/Functions";

const AddPrisoner = () => {
  const onChangeSingle = useCallback(
    (params) => {
      setSingleOpen(false);
      setDate(params.date);
    },
    [setSingleOpen, setDate]
  );

  const onDismissSingle = useCallback(() => {
    setSingleOpen(false);
  }, [setSingleOpen]);

  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? MD3DarkTheme : MD3LightTheme;

  /** State variables. */
  const [singleOpen, setSingleOpen] = useState(false);
  const [date, setDate] = useState(undefined);
  useEffect(() => registerTranslation("en-GB", enGB));
  const [locale] = useState("en-GB");

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    [locale]
  );

  const [checked, setChecked] = useState("");

  const dismissKeyboard = () => {
    Keyboard.dismiss(); // Dismiss keyboard on touch outside
  };

  return (
    <PaperProvider theme={theme}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <ScrollView>
          <View style={[centre.centre, AdminAddPrisonerStyle.container]}>
            {/* First name of the prisoner */}
            
            <TextInput
              outlineStyle={AdminAddPrisonerStyle.inputBorderStyle}
              style={[AdminAddPrisonerStyle.input]}
              mode="outlined"
              placeholder="Enter the first name of the prisoner"
              outlineColor="blue"
              activeOutlineColor="red"
              label={"First Name"}
            />
            <CustomBR />

            {/* First last of the prisoner */}
            <TextInput
              outlineStyle={AdminAddPrisonerStyle.inputBorderStyle}
              style={[AdminAddPrisonerStyle.input]}
              mode="outlined"
              placeholder="Enter the Last name of the prisoner"
              outlineColor="blue"
              activeOutlineColor="red"
              label={"Last Name"}
            />
            <CustomBR />

            {/* aage of the person */}
            <TextInput
              keyboardType="numeric"
              outlineStyle={AdminAddPrisonerStyle.inputBorderStyle}
              style={[AdminAddPrisonerStyle.input]}
              mode="outlined"
              placeholder="Enter the age of the prisoner"
              outlineColor="blue"
              activeOutlineColor="red"
              label={"Age"}
            />
            <CustomBR />
            {textInputForMenu("Gender of the prisoner")}
            <View style={AdminAddPrisonerStyle.radioContainer}>
              <View style={[AdminAddPrisonerStyle.radioContainer, centre.centre]}>
                <Text style={AdminAddPrisonerStyle.text}>Male</Text>
                <RadioButton
                  color="blue"
                  uncheckedColor="grey"
                  value="male"
                  status={checked === "male" ? "checked" : "unchecked"}
                  onPress={() => setChecked("male")}
                />
              </View>
              <View style={[AdminAddPrisonerStyle.radioContainer, centre.centre]}>
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
            <CustomBR />
            <View style={AdminAddPrisonerStyle.datePickerDiv}>
              <View>
                <Text
                  style={[
                    AdminAddPrisonerStyle.text,
                    AdminAddPrisonerStyle.dateHeadingText,
                  ]}
                >
                  Capture Date
                </Text>
                <Text
                  style={[
                    AdminAddPrisonerStyle.text,
                    AdminAddPrisonerStyle.dateText,
                  ]}
                >
                  {date ? dateFormatter.format(date) : "No date selected."}
                </Text>
                <Button
                  onPress={() => setSingleOpen(true)}
                  uppercase={false}
                  mode="contained-tonal"
                >
                  Pick Capture Date
                </Button>
              </View>

              <DatePickerModal
                locale="en-GB"
                mode="single"
                visible={singleOpen}
                onDismiss={onDismissSingle}
                date={date}
                onConfirm={onChangeSingle}
                validRange={{
                  startDate: null,
                  disabledDates: null,
                }}
                presentationStyle="overFullScreen"
              />
            </View>
            <CustomBR />
            <TextInput
              multiline={true}
              keyboardType="text"
              outlineStyle={AdminAddPrisonerStyle.inputBorderStyle}
              style={[AdminAddPrisonerStyle.input]}
              mode="outlined"
              placeholder="Enter the crime of the prisoner"
              outlineColor="blue"
              activeOutlineColor="red"
              label={"Crime"}
            />
            <CustomBR />
            <TextInput
              multiline={true}
              keyboardType="text"
              outlineStyle={AdminAddPrisonerStyle.inputBorderStyle}
              style={[AdminAddPrisonerStyle.input]}
              mode="outlined"
              placeholder="Enter the sentence of the prisoner"
              outlineColor="blue"
              activeOutlineColor="red"
              label={"Sentence"}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </PaperProvider>
  );
};

export default AddPrisoner;
