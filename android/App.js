import React, { Suspense } from "react";
import StartScreen from "./src/Pages/StartScreen.js";
import { Provider } from "react-redux";
import store from "./src/Redux/Store/Store.js";
import { LogBox } from "react-native";
const Main = React.lazy(() => import("./src/Main.js"));

LogBox.ignoreLogs([
  "Support for defaultProps will be removed", // Add more warnings as needed
]);

export default function App() {

  return (
    // <StartScreen/>
    <Provider store={store}>
      <Suspense fallback={<StartScreen />}>
        <Main />
      </Suspense>
    </Provider>
  );
}
