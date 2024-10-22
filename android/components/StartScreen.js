import {
    StyleSheet,
    Text,
    View,
    BackHandler,
    Alert,
  } from "react-native";
  import React from "react";
  import { centre } from "./Styling";
  
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
      <View style={styles.center}>
        <View style={[centre.centre, styles.card]}>
          <Text style={styles.text}>Thana management System</Text>
        </View>
      </View>
    );
  };
  
  export default StartScreen;
  
  const styles = StyleSheet.create({
    center: {
      height: "100%",
      width: "100%",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    card: {
      backgroundColor: "white",
      borderRadius: 30,
      shadowColor: "black",
      position: "absolute",
      height: "50%",
      width: "75%",
      elevation: 20,
    },
    text: {
      fontSize: 50,
      fontFamily: "serif",
    },
  });
  