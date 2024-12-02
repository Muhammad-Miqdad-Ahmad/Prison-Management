import {
    Text,
    View,
    BackHandler,
    Alert,
  } from "react-native";
  import React from "react";
  import { centre, Splash } from "../Styles/AdminStyling";
  
  const StartScreen = ({ navigation }) => {
    React.useEffect(() => {
      const backButtonPress = () => {
        Alert.alert("You can not go back at this stage", null, [], {
          cancelable: true,
        });
        return true;
      };
  
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backButtonPress
      );
  
      return () => {
        backHandler.remove();
      };
    }, [navigation]);
  
    return (
      <View style={Splash.center}>
        <View style={[centre.centre, Splash.card]}>
          <Text style={Splash.text}>Thana management System</Text>
        </View>
      </View>
    );
  };
  
export default StartScreen;
  
  