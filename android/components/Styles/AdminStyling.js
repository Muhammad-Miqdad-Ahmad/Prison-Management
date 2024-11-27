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

export const Splash = StyleSheet.create({
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

export const AdminHomeStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  mainText: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "monospace",
    // fontFamily: "Roboto",
  },
  genericText: {
    fontSize: 20,
    fontFamily: "monospace",
  },
});

export const AdminSearchStyle = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  input: {
    backgroundColor: "white",
  },
  buttonsContainer: {
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    paddingHorizontal: 5,
    paddingVertical: 3
  },  
  scroll: {
    width: "auto",
    paddingBottom: 5,
    paddingTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  }
});

export const AdminAddPrisonerStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 6,
    height: "100%",
  },
  inputDiv: {
    height: 1,
    width: "100%",
    margin: 12,
  },
  input: {
    width: "90%",
  },
  inputBorderStyle: {
    borderRadius: 15,
  },
  textDiv: {
    width: "85%",
    justifyContent: "flex-start",
  },
  text: {
    fontSize: 15,
    fontFamily: "monospace",
  },
  radioContainer: {
    flexDirection: "row",
    width: "85%",
    justifyContent: "space-around",
  },
  radio: {
    flexDirection: "row",
    width: "50%"
  },
  datePickerDiv: {
    width: "85%",
  },
  dateHeadingText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  dateText: {
    fontSize: 16,
    marginBottom: 16,
  },
  removebuttonContainer: {
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export const ButtonStyles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: 5,
    borderRadius: 20,
    overflow: "hidden", // Ensure the red background aligns with the button's shape
  },
  selectedButtonBackground: {
    backgroundColor: "red", // Highlight background for the selected button
  },
  buttonText: {
    color: "#000", // Default text color
  },
  selectedText: {
    color: "#FFF", // White text for the selected button
  },
});

export const SearchMenuStyle = StyleSheet.create({
  container: {
    zIndex: 1,
    position: "absolute"
  }
})

export const CustomMenuStyle = StyleSheet.create({
  menuContainer: {
    position: "absolute",
    top: 105, // Adjust as needed based on your UI
    left: 20,
    right: 20,
    backgroundColor: "#ededed",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    zIndex: 1000,
  },
  scrollContainer: {
    maxHeight: 300, // Limit the height for vertical scrolling
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 10,
  },
  cell: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
    borderRightWidth: 1,
    borderRightColor: "#ddd",
  },
  headerText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  dataText: {
    fontSize: 12,
    color: "#333",
  },
});
