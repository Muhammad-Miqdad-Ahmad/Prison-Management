import { View, Text } from "react-native";
import React from "react";
import CustomBR from "../../Custom/customBR";
import { RadioButton, TextInput } from "react-native-paper";
import {
  AdminAddPrisonerStyle,
  ButtonStyles,
  centre,
} from "../../Styles/AdminStyling";
import { ScrollView } from "react-native-gesture-handler";
import { textInputForMenu } from "../../Functions/Functions";
import CustomSubmit from "../../Custom/CustomSubmit";
import { submitUpdatePrisoner } from "../../Functions/Functions";
import CustomTextInput from "../../Custom/CustomTextinput";

const UpdatePrisoner = () => {
  const [checked, setChecked] = React.useState("");
  const [data, setData] = React.useState({});
  return (
    <ScrollView>
      <View style={[centre.centre, AdminAddPrisonerStyle.container]}>
        <CustomTextInput
          outlineColor="#d6c50b"
          activeOutlineColor="red"
          label="prisonerID"
          data={data}
          setData={setData}
          keyboardType="numeric"
        >
          {"Enter the ID of the prisoner you want to update the data of"}
        </CustomTextInput>
        <CustomBR />
        <CustomTextInput
          outlineColor="#d6c50b"
          activeOutlineColor="red"
          label="FirstName"
          data={data}
          setData={setData}
        >
          {"Enter the first name of the prisoner"}
        </CustomTextInput>
        <CustomBR />
        <CustomTextInput
          outlineColor="#d6c50b"
          activeOutlineColor="red"
          label="LastName"
          data={data}
          setData={setData}
        >
          {"Enter the last name of the prisoner"}
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
          {"Enter the age of the prisoner"}
        </CustomTextInput>
        <CustomBR />
        {textInputForMenu("Gender of the prisoner")}
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
          label="Crime"
          data={data}
          setData={setData}
        >
          {"Enter the crime of the prisoner"}
        </CustomTextInput>
        <CustomBR />
        <CustomTextInput
          outlineColor="#d6c50b"
          activeOutlineColor="red"
          label="Sentence"
          data={data}
          setData={setData}
        >
          {"Enter the sentence of the prisoner"}
        </CustomTextInput>
        <CustomBR />

        <View style={ButtonStyles.buttonContainer}>
          <CustomSubmit data={data} callback={submitUpdatePrisoner} />
        </View>
      </View>
    </ScrollView>
  );
};

export default UpdatePrisoner;
