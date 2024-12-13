import React, { lazy, Suspense, useEffect, useState } from "react";
import { View, useColorScheme, ScrollView } from "react-native";
import CustomBR from "../Custom/customBR";
import {
  Provider as PaperProvider,
  MD3DarkTheme,
  MD3LightTheme,
} from "react-native-paper";
import { AdminAddPrisonerStyle, centre } from "../Styles/AdminStyling";
import CustomTextInput from "../Custom/CustomTextinput";
import CustomComponentLoader from "../Custom/CustomComponentLoader";
const CustomDatePicker = lazy(() => import("../Custom/CustomDatePicker"));

const AddGuardData = ({ data, setData }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? MD3DarkTheme : MD3LightTheme;
  const [dateOfCapture, setdateOfCapture] = useState(undefined);

  useEffect(() => {
    if (!data) setData({});
    else console.log(data);
  }, []);

  useEffect(() => {
    setData({ ...data, dateOfCapture: dateOfCapture }); // Update data state
  }, [dateOfCapture]);

  return (
    <PaperProvider theme={theme}>
      <ScrollView>
        {/* Use CustomDatePicker with AddPrisoner fields as children */}
        <View style={[centre.centre, AdminAddPrisonerStyle.container]}>
          {/* ID of the prisoner */}
          <CustomTextInput
            outlineColor="blue"
            activeOutlineColor="red"
            label="GuardID"
            data={data}
            setData={setData}
          >
            {"Enter The Prisoner ID"}
          </CustomTextInput>
          <CustomBR />

          {/* Prison of the prisoner */}
          <CustomTextInput
            outlineColor="blue"
            activeOutlineColor="red"
            label="PrisonID"
            data={data}
            setData={setData}
          >
            {"Enter The Prison ID of where the prisoner is held"}
          </CustomTextInput>
          <CustomBR />
        </View>
        <Suspense
          fallback={
            <CustomComponentLoader hite={150} size={50} color="#d17bf6" />
          }
        >
          <CustomDatePicker
            date={dateOfCapture}
            setDate={setdateOfCapture}
            theme={theme}
          >
            <></>
            {"Date of Joining"}
          </CustomDatePicker>
        </Suspense>
        <CustomBR />
        <View style={[centre.centre, AdminAddPrisonerStyle.container]}>
          {/* ID of the prisoner */}
          <CustomTextInput
            keyboardType="numbers-and-punctuation"
            outlineColor="blue"
            activeOutlineColor="red"
            label="relative-1"
            data={data}
            setData={setData}
          >
            {"Enter The CNIC of the first relative"}
          </CustomTextInput>
          <CustomBR />

          {/* Prison of the prisoner */}
          <CustomTextInput
            keyboardType="numbers-and-punctuation"
            outlineColor="blue"
            activeOutlineColor="red"
            label="relative-2"
            data={data}
            setData={setData}
          >
            {"Enter The CNIC of the second relative"}
          </CustomTextInput>
          <CustomBR />
        </View>
      </ScrollView>
    </PaperProvider>
  );
};

export default AddGuardData;
