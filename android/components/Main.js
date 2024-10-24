import "./gesture-handler"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LoginPage from "./Pages/LoginPage";
import AdminDrawer from "./Drawers/AdminDrawer";

export default function App() {
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login" //? name for the component that will be used in the url I think
          component={LoginPage} //? The component
          options={{
            title: "Login", //? the title that will be shown on the tab
            headerBackVisible: false,
            headerBackTitleVisible: false,
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="AdminDrawer" //? name for the component that will be used in the url I think
          component={AdminDrawer} //? The component
          options={{
            headerShown: false,
            headerBackVisible: false,
            headerBackTitleVisible: false,
            headerTitleAlign: "center",
            // headerLeft: () => (
            //   <Pressable>
            //     <Icon
            //       name={"bars"}
            //       size={20}
            //       color="gray"
            //     />
            //   </Pressable>
            // ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}