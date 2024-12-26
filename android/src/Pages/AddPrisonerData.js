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
import CustomSubmit from "../Custom/CustomSubmit";
import { submitAddPrisoner } from "../Functions/Functions";

const AddPrisonerData = ({ data, setData, setscan }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? MD3DarkTheme : MD3LightTheme;
  const [dateOfCapture, setdateOfCapture] = useState(undefined);
  const [dateOfRelease, setdateOfRelease] = useState(undefined);

  useEffect(() => {
    if (data === undefined || data === null || typeof data !== 'object') {
      console.log("I am changing data because data was: ", data);
      setData({});
    }
  }, [data]);

  return (
    <PaperProvider theme={theme}>
      <ScrollView>
        {/* Use CustomDatePicker with AddPrisoner fields as children */}
        <View style={[centre.centre, AdminAddPrisonerStyle.container]}>
          {/* ID */}
          <View style={AdminAddPrisonerStyle.textDiv}>
            <Button />
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
            keyboardType="nummeric"
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
            date={dateOfRelease}
            data={data}
            setData={setData}
            setDate={setdateOfRelease}
            lable={"dateOfRelease"}
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
          <CustomDatePicker
            date={dateOfCapture}
            setData={setData}
            setDate={setdateOfCapture}
            lable={"dateOfCapture"}
            theme={theme}
          >
            {/* crime of the prisoner */}
            <View style={[centre.centre, AdminAddPrisonerStyle.container]}>
              <CustomTextInput
                data={data}
                maxLength={200}
                label="prisonerCrime"
                setData={setData}
                outlineColor="blue"
                activeOutlineColor="red"
              >
                {"Enter The Crime of The Prisoner"}
              </CustomTextInput>
              <CustomBR />
            </View>
            {"Date of Release"}
          </CustomDatePicker>
        </Suspense>
        <CustomBR />
        <View style={[centre.centre, AdminAddPrisonerStyle.container]}>
          {/* ID of the prisoner relative 1 */}
          <View style={AdminAddPrisonerStyle.textDiv}>
            <Button />
            <Text
              style={[
                AdminAddPrisonerStyle.text,
                AdminAddPrisonerStyle.dateHeadingText,
              ]}
            >
              ID of the first relative
            </Text>
          </View>
          {data?.relative_1 ? textInputForMenu(`${data?.relative_1}`) : null}
          <CustomBR />
          <View style={{ width: "85%" }}>
            <Button
              mode="contained-tonal"
              onPress={() => {
                console.log("pressed");
                setscan({ label: "relative_1", scan: false });
              }}
            >
              Scan for the relative ID
            </Button>
          </View>
          <CustomBR />
          <View style={AdminAddPrisonerStyle.textDiv}>
            <Button />
            <Text
              style={[
                AdminAddPrisonerStyle.text,
                AdminAddPrisonerStyle.dateHeadingText,
              ]}
            >
              ID of the second relative
            </Text>
          </View>
          {data?.relative_2 ? textInputForMenu(`${data?.relative_2}`) : null}
          <CustomBR />
          <View style={{ width: "85%" }}>
            <Button
              mode="contained-tonal"
              onPress={() => {
                console.log("pressed");
                setscan({ label: "relative_2", scan: false });
              }}
            >
              Scan for the relative ID
            </Button>
            <CustomBR />
            <CustomBR />
            <CustomSubmit callback={submitAddPrisoner} data={data} />
          </View>
        </View>
      </ScrollView>
    </PaperProvider>
  );
};

export default AddPrisonerData;
