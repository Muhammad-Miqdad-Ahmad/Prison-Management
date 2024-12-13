import React, { lazy, Suspense, useEffect, useState } from "react";
import { View, useColorScheme, ScrollView, Text } from "react-native";
import CustomBR from "../Custom/customBR";
import {
  Provider as PaperProvider,
  MD3DarkTheme,
  MD3LightTheme,
  Button,
} from "react-native-paper";
import { AdminAddPrisonerStyle, centre } from "../Styles/AdminStyling";
import CustomTextInput from "../Custom/CustomTextinput";
import CustomComponentLoader from "../Custom/CustomComponentLoader";
const CustomDatePicker = lazy(() => import("../Custom/CustomDatePicker"));
import { textInputForMenu } from "../Functions/Functions";

const AddPrisonerData = ({ data, setData, setscan }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? MD3DarkTheme : MD3LightTheme;
  const [dateOfCapture, setdateOfCapture] = useState(undefined);

  const getScanedID = (someID) => {
    setData({ ...data, prisonerID: someID });
  };

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
          {/* ID */}
          <View style={AdminAddPrisonerStyle.textDiv}>
            <Text
              style={[
                AdminAddPrisonerStyle.text,
                AdminAddPrisonerStyle.dateHeadingText,
              ]}
            >
              The Prisoner ID is
            </Text>
          </View>
          {data?.prisonerID ? textInputForMenu(`${data?.prisonerID}`) : null}
          <CustomBR />
          <View style={{ width: "85%" }}>
            <Button
              mode="contained-tonal"
              onPress={() => {
                console.log("pressed");
                setscan({ label: "prisonerID", scan: false });
              }}
            >
              Scan For Prisoner ID
            </Button>
          </View>
          <CustomBR />

          {/* Prison of the prisoner */}
          <CustomTextInput
            outlineColor="blue"
            activeOutlineColor="red"
            label="prisonID"
            data={data}
            setData={setData}
          >
            {"Enter The Prison ID of where the prisoner is held"}
          </CustomTextInput>
          <CustomBR />

          {/* Status of the prisoner */}
          <CustomTextInput
            outlineColor="blue"
            activeOutlineColor="red"
            label="prisonerStatus"
            data={data}
            setData={setData}
          >
            {"Enter The status of the prisoner"}
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
            {/* Sentence of the prisoner */}
            <View style={[centre.centre, AdminAddPrisonerStyle.container]}>
              <CustomTextInput
                data={data}
                maxLength={200}
                label="prisonerSentence"
                setData={setData}
                outlineColor="blue"
                activeOutlineColor="red"
              >
                {"Enter The Sentence of The Prisoner"}
              </CustomTextInput>
              <CustomBR />
            </View>
            {"Date of Capture"}
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
            maxLength={15}
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
            maxLength={15}
          >
            {"Enter The CNIC of the second relative"}
          </CustomTextInput>
          <CustomBR />
        </View>
      </ScrollView>
    </PaperProvider>
  );
};

export default AddPrisonerData;
