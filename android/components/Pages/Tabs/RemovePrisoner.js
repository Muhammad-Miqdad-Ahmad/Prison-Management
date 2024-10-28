import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import CustomBR from "../../Custom/customBR";
import { TextInput } from "react-native-paper";
import { AdminAddPrisonerStyle, centre } from "../../Styles/AdminStyling";
import { textInputForMenu } from "../../Functions/Functions";
import { Button } from "react-native-paper";

const AddPrisoner = () => {
  const [removeBasedOn, setremoveBasedOn] = useState("PrisonerID");
  return (
    <ScrollView>
      <View style={[centre.centre, AdminAddPrisonerStyle.container]}>
        <TextInput
          outlineStyle={AdminAddPrisonerStyle.inputBorderStyle}
          style={[AdminAddPrisonerStyle.input]}
          mode="outlined"
          placeholder="Search For the Prisoner"
          outlineColor="blue"
          activeOutlineColor="red"
          label={"Search"}
        />
        <CustomBR />
        <View style={AdminAddPrisonerStyle.removebuttonContainer}>
          <Button
          buttonColor={removeBasedOn === "PrisonerID" ? "red" : ""}
            mode={removeBasedOn === "PrisonerID" ? "contained" : "elevated"}
            onPress={() => setremoveBasedOn("PrisonerID")}
          >
            PrisonerID
          </Button>
          <Button
          buttonColor={removeBasedOn === "Email" ? "red" : ""}
            mode={removeBasedOn === "Email" ? "contained" : "elevated"}
            onPress={() => setremoveBasedOn("Email")}
          >
            Email
          </Button>
          <Button
          buttonColor={removeBasedOn === "Name" ? "red" : ""}
            mode={removeBasedOn === "Name" ? "contained" : "elevated"}
            onPress={() => setremoveBasedOn("Name")}
          >
            Name
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default AddPrisoner;
