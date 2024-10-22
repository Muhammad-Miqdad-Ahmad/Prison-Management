import { StyleSheet } from "react-native";

const lightBlue = "#0099d3";

export const HomeStyles = StyleSheet.create({});

export const centre = StyleSheet.create({
  centre: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export const LoginStyles = StyleSheet.create({
  main: {
    backgroundColor: "#fbf8f7",
    height: "100%",
    width: "100%",
  },

  loginBorder: {
    borderWidth: 2,
    borderColor: lightBlue,
  },

  SignupBorder: {
    borderWidth: 2,
    borderColor: "white",
  },

  textInput: {
    width: "92%",
  },

  card: {
    width: 200,
    height: 300,
    backfaceVisibility: "hidden",
    position: "absolute",
    backfaceVisibility: "hidden",
    flex: 1,
  },

  innerCard: {
    flexDirection: "column",
    minWidth: 0,
    gap: 15,
    width: "100 %",
    height: "100%",
  },

  firstCard: {
    display: "block",
    width: "80 %",
    height: "50 %",
    borderRadius: 50,
    backgroundColor: "#ffffff",
    shadowColor: "black",
  },

  secondCard: {
    display: "block",
    width: "80 %",
    height: "50 %",
    borderRadius: 50,
    backgroundColor: lightBlue,
  },

  input: {
    width: "75%",
    borderRadius: 100,
    position: "static",
  },

  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    gap: 16,
    // borderWidth: 2
  },

  button: {
    width: "30%",
    height: "45%",
    borderRadius: 15,
  },

  loginText: {
    fontFamily: "serif",
    color: lightBlue,
    fontSize: 35,
  },

  signUptext: {
    color: "white",
  },

  signUpFont: {
    fontFamily: "serif",
    fontSize: 35,
  },

  icon: {
    fontSize: 17,
    opacity: 0.5,
  },

  showPass: {
    height: "auto",
    width: "auto",
    border: "black",
  },
});
