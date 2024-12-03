import { View, Text } from "react-native";
import React from "react";
import CustomTextInput from "../Custom/CustomTextinput";
import { AdminAddPrisonerStyle, centre } from "../Styles/AdminStyling";
import CustomBR from "../Custom/customBR";

const AddAdminData = ({ data, setData }) => {
  return (
    <View style={[AdminAddPrisonerStyle.container, centre.centre]}>
      <CustomTextInput label="FirstName" data={data} setData={setData}>
        {"Enter The First Name"}
      </CustomTextInput>
      <CustomBR />
      <CustomTextInput label="LastName" data={data} setData={setData}>
        {"Enter The Last Name"}
      </CustomTextInput>
      <CustomBR />
      <CustomTextInput label="Password" data={data} setData={setData} maxLength={14}>
        {"Enter the Password for the admin account"}
      </CustomTextInput>
      <CustomBR />
      <CustomTextInput
        data={data}
        maxLength={1}
        setData={setData}
        label={"Prison"}
        keyboardType="numeric"
      >
        {"write the prison ID"}
      </CustomTextInput>
      <CustomBR />
    </View>
  );
};

export default AddAdminData;
