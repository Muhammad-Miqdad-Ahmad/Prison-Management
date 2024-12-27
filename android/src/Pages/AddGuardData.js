import React, { lazy, Suspense, useEffect, useState } from "react";
import { View, Text, useColorScheme, ScrollView } from "react-native";
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
import CustomSubmit from "../Custom/CustomSubmit";
import { submitAddGuard, textInputForMenu } from "../Functions/Functions";
const CustomDatePicker = lazy(() => import("../Custom/CustomDatePicker"));

const AddGuardData = ({ data, setData, setscan }) => {
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
        {/* ID of the prisoner */}
        <View style={[centre.centre, AdminAddPrisonerStyle.container]}>
          <View style={AdminAddPrisonerStyle.textDiv}>
            <Button />
            <Text
              style={[
                AdminAddPrisonerStyle.text,
                AdminAddPrisonerStyle.dateHeadingText,
              ]}
            >
              The Guard ID is
            </Text>
          </View>
          {data?.guardID ? textInputForMenu(`${data?.guardID}`) : null}
          <CustomBR />
          <View style={{ width: "85%" }}>
            <Button
              mode="contained-tonal"
              onPress={() => {
                console.log("pressed");
                setscan({ label: "guardID", scan: false });
              }}
            >
              Scan For Guard ID
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
            keyboardType="numeric"
          >
            {"Enter The Prison ID of where the prisoner is held"}
          </CustomTextInput>
          <CustomBR />
          {/* Shift of the guard */}
          <CustomTextInput
            outlineColor="blue"
            activeOutlineColor="red"
            label="guardShift"
            data={data}
            setData={setData}
          >
            {"Enter The shift of the guard"}
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
            data={data}
            setData={setData}
            setDate={setdateOfCapture}
            theme={theme}
            lable={"dateOfJoining"}
          >
            <></>
            {"Date of Joining"}
          </CustomDatePicker>
        </Suspense>
        <CustomBR />
        <View style={[centre.centre, AdminAddPrisonerStyle.container]}>
          {/* qr code */}
          <View style={AdminAddPrisonerStyle.textDiv}>
            <Button />
            <Text
              style={[
                AdminAddPrisonerStyle.text,
                AdminAddPrisonerStyle.dateHeadingText,
              ]}
            >
              Data from the qr code
            </Text>
          </View>
          {data?.qrCode ? textInputForMenu(`${data?.qrCode}`) : null}
          <CustomBR />
          <View style={{ width: "85%" }}>
            <Button
              mode="contained-tonal"
              onPress={() => {
                console.log("pressed");
                setscan({ label: "qrCode", scan: false });
              }}
            >
              Scan for the qr code
            </Button>
            <CustomBR />
            <CustomBR />
            <CustomSubmit callback={submitAddGuard} data={data} />
          </View>
          <CustomBR />
        </View>
      </ScrollView>
    </PaperProvider>
  );
};

export default AddGuardData;
