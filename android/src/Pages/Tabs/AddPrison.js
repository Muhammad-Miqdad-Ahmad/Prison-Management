import { View, Text } from "react-native";
import React from "react";
import CustomTextInput from "../../Custom/CustomTextinput";
import { AdminAddPrisonerStyle, centre } from "../../Styles/AdminStyling";
import CustomBR from "../../Custom/customBR";
import CustomSubmit from "../../Custom/CustomSubmit";
import { submitAddPrison } from "../../Functions/Functions";

const AddPrison = () => {
  const [data, setData] = React.useState({});
  return (
    <View style={[AdminAddPrisonerStyle.container, centre.centre]}>
      <CustomTextInput
        label="prisonName"
        data={data}
        setData={setData}
        maxLength={14}
      >
        {"Enter the Name Of the new Prison"}
      </CustomTextInput>
      <CustomBR />
      <CustomTextInput
        data={data}
        setData={setData}
        label={"prisonLocation"}
      >
        {"Enter the Location of the new Prison"}
      </CustomTextInput>
      <CustomBR />
      <CustomSubmit callback={submitAddPrison} data={data} />
    </View>
  );
};

export default AddPrison;
