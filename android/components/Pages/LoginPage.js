import {
  Pressable,
  Text,
  View,
  Animated,
  TextInput,
  BackHandler,
  Keyboard,
  Alert,
  ScrollView,
} from "react-native";
import React from "react";
import { LoginStyles, centre } from "../Styles/Styling";
import { onBackPress, postData } from "../Functions/Functions";
import Icon from "react-native-vector-icons/FontAwesome";
import Loader from "../Loader";

const LoginPage = ({ navigation }) => {

  const [loginData, setLoginData] = React.useState({email:"", password:""});
  const [IsLoading, setIsLoading] = React.useState(false);

  const [showPassword, setShowPass] = React.useState(true);

  const refPasswordInput = React.useRef(null);

  function setData(key, value, data, setData) {
    const temp = {};
    temp[key] = value;
    setData(data ? { ...data, ...temp } : temp);
  }

  const loginSubmit = () => {
    if (
      loginData?.email &&
      loginData?.email != "" &&
      loginData?.password &&
      loginData?.password != ""
    )
      postData(loginData, "Login", navigation, setIsLoading);
    else Alert.alert("Please enter some data", null, [], { cancelable: true });

    Keyboard.dismiss();
    setLoginData({email:"", password:""});
  };

  const focusOnPassword = () => {
    if (refPasswordInput && refPasswordInput.current) {
      refPasswordInput.current.focus();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPass(!showPassword);
  };

  // Styles I applied throughout the sheet
  const loginElements = [
    LoginStyles.input,
    LoginStyles.loginBorder,
    centre.centre,
  ];
  const loginPressable = [
    LoginStyles.button,
    LoginStyles.loginBorder,
    centre.centre,
  ];

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );
    return () => backHandler.remove();
  }, []);

  return (
    <>
      {IsLoading?<Loader />:null}
      <ScrollView
        onPress={() => {
          Keyboard.dismiss();
          setLoginData({});
        }}
        contentContainerStyle={[centre.centre, { height: "100%" }]}
      >
        <Animated.View
          style={[
            LoginStyles.card,
            LoginStyles.firstCard,
            LoginStyles.loginBorder,
            centre.centre,
          ]}
        >
          <View style={[LoginStyles.innerCard, centre.centre]}>
            <Text style={LoginStyles.loginText}>Login</Text>
            <View style={loginElements}>
              <TextInput
                style={LoginStyles.textInput}
                value={loginData?.email}
                placeholder={"Enter your Email"}
                inputmode="email"
                autoCapitalize="none"
                autoCorrect={false}
                blurOnSubmit={false}
                returnKeyType="next"
                onSubmitEditing={(event) => {
                  setData(
                    "email",
                    event?.nativeEvent?.text,
                    loginData,
                    setLoginData
                  );
                  focusOnPassword();
                }}
                onChangeText={(text) => {
                  setData("email", text, loginData, setLoginData);
                }}
              />
            </View>
            {/* Password input with show/hide toggle */}
            <View
              style={[
                LoginStyles.input,
                LoginStyles.loginBorder,
                {
                  flexDirection: "row", // Keep the icon and input in a row
                  alignItems: "center",
                  paddingHorizontal: 15, // Padding on both sides to prevent touching the walls
                },
                centre.centre,
              ]}
            >
              <TextInput
                style={[
                  LoginStyles.textInput,
                  { flex: 1 }, // Padding for the text to avoid touching the left and right
                ]}
                value={loginData?.password}
                placeholder={"Enter your password"}
                secureTextEntry={showPassword}
                ref={refPasswordInput}
                returnKeyType="done"
                onChangeText={(text) => {
                  setData("password", text, loginData, setLoginData);
                }}
                onSubmitEditing={(event) => {
                  setData(
                    "password",
                    event?.nativeEvent?.text,
                    loginData,
                    setLoginData
                  );
                  loginSubmit();
                }}
              />
              {/* Eye icon aligned to the right */}
              <Pressable
                onPress={togglePasswordVisibility}
                style={{
                  position: "absolute",
                  right: 7, // Position eye icon away from the right wall
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Icon
                  name={showPassword ? "eye-slash" : "eye"}
                  size={20}
                  color="gray"
                />
              </Pressable>
            </View>
            <View style={[LoginStyles.buttonContainer, centre.centre]}>
              <Pressable
                style={loginPressable}
                onPress={() => {
                  loginSubmit();
                }}
              >
                <Text>Login</Text>
              </Pressable>
              <Pressable
                style={[loginPressable, { backgroundColor: "#0099d3" }]}
                onPress={() => {}}
              >
                <Text style={{ color: "white" }}>Signup</Text>
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </>
  );
};

export default LoginPage;
