import React, { lazy, Suspense, useEffect, useState } from "react";
import { View, useColorScheme, ScrollView } from "react-native";
import CustomBR from "../Custom/customBR";
import {
  RadioButton,
  Text,
  Provider as PaperProvider,
  MD3DarkTheme,
  MD3LightTheme,
} from "react-native-paper";
import { AdminAddPrisonerStyle, centre } from "../Styles/AdminStyling";
import { textInputForMenu } from "../Functions/Functions";
import CustomTextInput from "../Custom/CustomTextinput";
import CustomComponentLoader from "../Custom/CustomComponentLoader";
const CustomCountrySelector = lazy(() => import("../Custom/CountrySelector"));
const CustomDatePicker = lazy(() => import("../Custom/CustomDatePicker"));

const AddPersonData = ({ data, setData }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? MD3DarkTheme : MD3LightTheme;
  const [dateOfBirth, setDateOfBirth] = useState(undefined);

  useEffect(() => {
    if (data === undefined || data === null || typeof data !== 'object') {
      console.log("I am changing data because data was: ", data);
      setData({});
    }
  }, [data]);

  return (
    <PaperProvider theme={theme}>
      <ScrollView>
        <View style={[centre.centre, AdminAddPrisonerStyle.container]}>
          {/* First name */}
          <CustomTextInput
            outlineColor="blue"
            activeOutlineColor="red"
            label="FirstName"
            data={data}
            setData={setData}
          >
            {"Enter The First Name"}
          </CustomTextInput>
          <CustomBR />

          {/* Last name */}
          <CustomTextInput
            outlineColor="blue"
            activeOutlineColor="red"
            label="LastName"
            data={data}
            setData={setData}
          >
            {"Enter The last Name"}
          </CustomTextInput>
          <CustomBR />

          {/* Gender selection */}
          {textInputForMenu("Please Select The Gender")}
          <View style={AdminAddPrisonerStyle.radioContainer}>
            <View style={[AdminAddPrisonerStyle.radio, centre.centre]}>
              <Text style={AdminAddPrisonerStyle.text}>Male</Text>
              <RadioButton
                color="blue"
                uncheckedColor="grey"
                value="male"
                status={data?.gender === "male" ? "checked" : "unchecked"}
                onPress={() => setData({ ...data, gender: "male" })}
              />
            </View>
            <View style={[AdminAddPrisonerStyle.radio, centre.centre]}>
              <Text style={AdminAddPrisonerStyle.text}>Female</Text>
              <RadioButton
                color="red"
                uncheckedColor="grey"
                value="female"
                status={data?.gender === "female" ? "checked" : "unchecked"}
                onPress={() => setData({ ...data, gender: "female" })}
              />
            </View>
          </View>
          <CustomBR />

          {/* Age of the prisoner */}
          <CustomTextInput
            outlineColor="blue"
            activeOutlineColor="red"
            label="Age"
            data={data}
            setData={setData}
            keyboardType="number-pad"
          >
            {"Enter The Age of The Prisoner"}
          </CustomTextInput>
          <CustomBR />
        </View>
        <Suspense
          fallback={
            <CustomComponentLoader hite={150} size={50} color="#d17bf6" />
          }
        >
          <CustomDatePicker
            data={data}
            setData={setData}
            date={dateOfBirth}
            setDate={setDateOfBirth}
            lable={"dateOfBirth"}
            theme={theme}
          >
            <Text></Text>
            {"Date of Birth"}
          </CustomDatePicker>
        </Suspense>

        <View style={[centre.centre, AdminAddPrisonerStyle.container]}>
          <CustomBR />

          {/* Nationality */}
          <Suspense
            fallback={
              <CustomComponentLoader hite={150} size={50} color="#d17bf6" />
            }
          >
            <CustomCountrySelector countrySetter={setData} data={data} />
          </Suspense>
        </View>
      </ScrollView>
    </PaperProvider>
  );
};

export default AddPersonData;
