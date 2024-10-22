import React, {Suspense} from "react";
import StartScreen from "./components/StartScreen";

export default function App() {

  const Main = React.lazy(()=>import("./components/Main.js"));
  
  return (
    // <StartScreen/>
      <Suspense fallback={<StartScreen />} >
        <Main />
      </Suspense>
  );
}
