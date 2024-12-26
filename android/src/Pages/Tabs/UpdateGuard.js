import { View, Text } from "react-native";
import React from "react";
import CustomBR from "../../Custom/customBR";
import { RadioButton } from "react-native-paper";
import {
  AdminAddPrisonerStyle,
  ButtonStyles,
  centre,
} from "../../Styles/AdminStyling";
import { ScrollView } from "react-native-gesture-handler";
import { submitUpdateGuard, textInputForMenu } from "../../Functions/Functions";
import CustomSubmit from "../../Custom/CustomSubmit";
import CustomTextInput from "../../Custom/CustomTextinput";

const UpdateGuard = () => {
  const [data, setData] = React.useState({});
  return (
    <ScrollView>
      <View style={[centre.centre, AdminAddPrisonerStyle.container]}>
        <CustomTextInput
          outlineColor="#d6c50b"
          activeOutlineColor="red"
          label="guardID"
          data={data}
          setData={setData}
          keyboardType="numeric"
        >
          {"Enter the ID of the guard you want to update the data of"}
        </CustomTextInput>
        <CustomBR />
        <CustomTextInput
          outlineColor="#d6c50b"
          activeOutlineColor="red"
          label="FirstName"
          data={data}
          setData={setData}
        >
          {"Enter the first name of the guard"}
        </CustomTextInput>
        <CustomBR />
        <CustomTextInput
          outlineColor="#d6c50b"
          activeOutlineColor="red"
          label="LastName"
          data={data}
          setData={setData}
        >
          {"Enter the last name of the guard"}
        </CustomTextInput>
        <CustomBR />
        <CustomTextInput
          outlineColor="#d6c50b"
          activeOutlineColor="red"
          label="Age"
          data={data}
          setData={setData}
          keyboardType="numeric"
        >
          {"Enter the age of the guard"}
        </CustomTextInput>
        <CustomBR />
        {textInputForMenu("Gender of the guard")}
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

        <CustomTextInput
          outlineColor="#d6c50b"
          activeOutlineColor="red"
          label="guardShift"
          data={data}
          setData={setData}
        >
          {"Enter the shift of the prisoner"}
        </CustomTextInput>
        <CustomBR />

        <View style={ButtonStyles.buttonContainer}>
          <CustomSubmit data={data} callback={submitUpdateGuard} />
        </View>
      </View>
    </ScrollView>
  );
};

export default UpdateGuard;
