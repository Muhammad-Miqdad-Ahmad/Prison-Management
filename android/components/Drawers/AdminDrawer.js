// import "./gesture-handler";
import React from "react";

import AdminHome from "../Pages/AdminHome";
import AdminSearch from "../Pages/AdminSearch";
import AlterTabs from "../Pages/Tabs/AlterTabs";

import AddPrisoner from "../Pages/AddPrisoner";
import RemovePrisoner from "../Pages/RemovePrisoner";
import UpdatePrisoner from "../Pages/UpdatePrisoner";

import { createDrawerNavigator } from "@react-navigation/drawer";

const AdminDrawer = () => {
  const Drawer = createDrawerNavigator();
  
  const first = { text: "Add", route: AddPrisoner };
  const second = { text: "Remove", route: RemovePrisoner };
  const third = { text: "Update", route: UpdatePrisoner };

  return (
    <Drawer.Navigator backBehavior="firstRoute">
      <Drawer.Screen name="Home" component={AdminHome} />
      <Drawer.Screen name="Search" component={AdminSearch} />
      <Drawer.Screen
        name="Alter Section data"
        component={AlterTabs}
        initialParams={{ first: first, second: second, third: third }}
        options={{
          title: "Alter Section Data", //? the title that will be shown on the tab
          headerBackVisible: false,
          headerBackTitleVisible: false,
          headerTitleAlign: "center",
        }}
      />
      <Drawer.Screen
        name="Alter Prisoners data"
        component={AlterTabs}
        initialParams={{ first: first, second: second, third: third }}
        options={{
          title: "Alter Prisoner Data", //? the title that will be shown on the tab
          headerBackVisible: false,
          headerBackTitleVisible: false,
          headerTitleAlign: "center",
        }}
      />
    </Drawer.Navigator>
  );
};

export default AdminDrawer;
