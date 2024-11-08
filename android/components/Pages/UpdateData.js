import { View, Text } from 'react-native'
import React from 'react'
import CustomBR from '../Custom/customBR'
import { RadioButton, TextInput } from 'react-native-paper'
import { AdminAddPrisonerStyle, centre } from '../Styles/AdminStyling'
import { ScrollView } from 'react-native-gesture-handler'
import { textInputForMenu } from "../Functions/Functions";

const UpdateData = ({data,setData}) => {
  const [checked, setChecked] = React.useState("");
  return (
    <ScrollView>
        <View style={[centre.centre, AdminAddPrisonerStyle.container]}>
          <TextInput
            outlineStyle={AdminAddPrisonerStyle.inputBorderStyle}
            style={[AdminAddPrisonerStyle.input]}
            mode="outlined"
            placeholder="Enter the name of the prisoner"
            outlineColor="#d6c50b"
            activeOutlineColor="red"
            label={"Name"}
          />
          <CustomBR />
          <TextInput
            keyboardType="numeric"
            outlineStyle={AdminAddPrisonerStyle.inputBorderStyle}
            style={[AdminAddPrisonerStyle.input]}
            mode="outlined"
            placeholder="Enter the age of the prisoner"
            outlineColor="#d6c50b"
            activeOutlineColor="red"
            label={"Age"}
          />
          <CustomBR />
          {textInputForMenu("Gender of the prisoner")}
          <View style={AdminAddPrisonerStyle.radioContainer}>
            <View style={[AdminAddPrisonerStyle.radioContainer, centre.centre]}>
              <Text style={AdminAddPrisonerStyle.text}>Male</Text>
              <RadioButton
                color="blue"
                uncheckedColor="grey"
                value="male"
                status={checked === "male" ? "checked" : "unchecked"}
                onPress={() => setChecked("male")}
              />
            </View>
            <View style={[AdminAddPrisonerStyle.radioContainer, centre.centre]}>
              <Text style={AdminAddPrisonerStyle.text}>Female</Text>
              <RadioButton
                color="red"
                uncheckedColor="grey"
                value="female"
                status={checked === "female" ? "checked" : "unchecked"}
                onPress={() => setChecked("female")}
              />
            </View>
          </View>
          <CustomBR />
          
          <TextInput
            multiline={true}
            keyboardType="text"
            outlineStyle={AdminAddPrisonerStyle.inputBorderStyle}
            style={[AdminAddPrisonerStyle.input]}
            mode="outlined"
            placeholder="Enter the crime of the prisoner"
            outlineColor="#d6c50b"
            activeOutlineColor="red"
            label={"Crime"}
          />
          <CustomBR />
          <TextInput
            multiline={true}
            keyboardType="text"
            outlineStyle={AdminAddPrisonerStyle.inputBorderStyle}
            style={[AdminAddPrisonerStyle.input]}
            mode="outlined"
            placeholder="Enter the sentence of the prisoner"
            outlineColor="#d6c50b"
            activeOutlineColor="red"
            label={"Sentence"}
          />
        </View>
      </ScrollView>
  )
}

export default UpdateData