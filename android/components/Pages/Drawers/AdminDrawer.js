import React from "react";

import AdminHome from "./AdminHome";
import AdminSearch from "./AdminSearch";
import AlterTabs from "../Tabs/AlterTabs";

import AddPrisoner from "../Tabs/AddPrisoner";
import RemovePrisoner from "../Tabs/RemovePrisoner";
import UpdatePrisoner from "../Tabs/UpdatePrisoner";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { useSelector } from "react-redux";

const AdminDrawer = () => {
  const Drawer = createDrawerNavigator();
  const adminData = useSelector((state) => state.admin.adminData);
  const alterPrisonerData = [
    { text: "Add", route: AddPrisoner },
    { text: "Remove", route: RemovePrisoner },
    { text: "Update", route: UpdatePrisoner },
  ];
  const alterGuardData = [
    { text: "Add", route: AddPrisoner },
    { text: "Remove", route: RemovePrisoner },
    { text: "Update", route: UpdatePrisoner },
  ];
  const alterAdminData = [
    { text: "Add", route: AddPrisoner },
    { text: "Remove", route: RemovePrisoner },
    { text: "Update", route: UpdatePrisoner },
  ];

  return (
    <Drawer.Navigator backBehavior="firstRoute">
      <Drawer.Screen name="Home" component={AdminHome} />
      <Drawer.Screen name="Search" component={AdminSearch} />
      <Drawer.Screen
        name="Alter Prisoners data"
        component={AlterTabs}
        initialParams={{ first: alterPrisonerData[0], second: alterPrisonerData[1], third: alterPrisonerData[2] }}
        options={{
          title: "Alter Prisoner Data", //? the title that will be shown on the tab
          headerBackVisible: false,
          headerBackTitleVisible: false,
          headerTitleAlign: "center",
        }}
      />
      <Drawer.Screen
        name="Alter Guard data"
        component={AlterTabs}
        initialParams={{ first: alterPrisonerData[0], second: alterPrisonerData[1], third: alterPrisonerData[2] }}
        options={{
          title: "Alter guard Data", //? the title that will be shown on the tab
          headerBackVisible: false,
          headerBackTitleVisible: false,
          headerTitleAlign: "center",
        }}
      />
      {adminData?.accesslevel === undefined ? <Drawer.Screen
        name="Alter Admin Data"
        component={AlterTabs}
        initialParams={{ first: alterPrisonerData[0], second: alterPrisonerData[1], third: alterPrisonerData[2] }}
        options={{
          title: "Alter Admin Data", //? the title that will be shown on the tab
          headerBackVisible: false,
          headerBackTitleVisible: false,
          headerTitleAlign: "center",
        }}
      /> : null}
    </Drawer.Navigator>
  );
};

export default AdminDrawer;
