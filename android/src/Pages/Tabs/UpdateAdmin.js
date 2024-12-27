import { View } from "react-native";
import React from "react";
import CustomBR from "../../Custom/customBR";
import {
  AdminAddPrisonerStyle,
  ButtonStyles,
  centre,
} from "../../Styles/AdminStyling";
import { ScrollView } from "react-native-gesture-handler";
import CustomSubmit from "../../Custom/CustomSubmit";
import { submitUpdateAdmin } from "../../Functions/Functions";
import CustomTextInput from "../../Custom/CustomTextinput";

const UpdateAdmin = () => {
  const [data, setData] = React.useState({});
  return (
    <ScrollView>
      <View style={[centre.centre, AdminAddPrisonerStyle.container]}>
        <CustomTextInput
          outlineColor="#d6c50b"
          activeOutlineColor="red"
          label="adminID"
          data={data}
          setData={setData}
          keyboardType="numeric"
        >
          {"Enter your admin email"}
        </CustomTextInput>
        <CustomBR />
        <CustomTextInput
          outlineColor="#d6c50b"
          activeOutlineColor="red"
          label="adminPassword"
          data={data}
          setData={setData}
        >
          {"Enter the new password"}
        </CustomTextInput>
        <CustomBR />

        <View style={ButtonStyles.buttonContainer}>
          <CustomSubmit data={data} callback={submitUpdateAdmin} />
        </View>
      </View>
    </ScrollView>
  );
};

export default UpdateAdmin;
