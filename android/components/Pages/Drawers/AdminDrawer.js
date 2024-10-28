import React from "react";

import AdminHome from "./AdminHome";
import AdminSearch from "./AdminSearch";
import AlterTabs from "../Tabs/AlterTabs";

import AddPrisoner from "../Tabs/AddPrisoner";
import RemovePrisoner from "../Tabs/RemovePrisoner";
import UpdatePrisoner from "../Tabs/UpdatePrisoner";

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
