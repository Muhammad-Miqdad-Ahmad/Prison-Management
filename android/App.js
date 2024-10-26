import React, { Suspense } from "react";
import StartScreen from "./components/Pages/StartScreen.js";
import { Provider } from "react-redux";
import store from "./components/Redux/Store/Store.js";

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
