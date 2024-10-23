import React, {Suspense} from "react";
import StartScreen from "./components/Pages/StartScreen.js";

export default function App() {

  const Main = React.lazy(()=>import("./components/Main.js"));
  
  return (
    // <StartScreen/>
      <Suspense fallback={<StartScreen />} >
        <Main />
      </Suspense>
  );
}
