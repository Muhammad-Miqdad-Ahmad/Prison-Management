import React, { Suspense } from "react";
import StartScreen from "./components/Pages/StartScreen.js";
import { Provider } from "react-redux";
import store from "./components/Redux/Store/Store.js";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Support for defaultProps will be removed", // Add more warnings as needed
  "Each child in a list should have a unique 'key' prop",
]);

export default function App() {
  const Main = React.lazy(() => import("./components/Main.js"));

  return (
    // <StartScreen/>
    <Provider store={store}>
      <Suspense fallback={<StartScreen />}>
        <Main />
      </Suspense>
    </Provider>
  );
}
