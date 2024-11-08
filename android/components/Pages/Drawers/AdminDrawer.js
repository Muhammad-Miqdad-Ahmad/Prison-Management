import React from "react";

import AdminHome from "./AdminHome";
import AdminSearch from "./AdminSearch";
import AlterTabs from "../Tabs/AlterTabs";

import AddPrisoner from "../Tabs/AddPrisoner";
import RemovePrisoner from "../Tabs/RemovePrisoner";
import UpdatePrisoner from "../Tabs/UpdatePrisoner";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { useSelector } from "react-redux";
import AddPersonData from "../AddData";
import RemovePerson from "../RemoveData";
import UpdateData from "../UpdateData";

import { LogBox } from "react-native";
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const AdminDrawer = () => {
  const Drawer = createDrawerNavigator();
  const adminData = useSelector((state) => state.admin.adminData);
  const alterPrisonerData = [
    {
      text: "Add",
      route: AddPrisoner,
      iconName: "plus",
      component: [<AddPersonData />],
      barColor: "blue",
      activeIconColor: "#FFFFFF"
    },
    {
      text: "Remove",
      route: RemovePrisoner,
      iconName: "trash",
      component: [<RemovePerson />],
      barColor: "red",
      activeIconColor: "#FFFFFF"
    },
    {
      text: "Update",
      route: UpdatePrisoner,
      iconName: "edit",
      component: [<UpdateData />],
      barColor: "yellow",
      activeIconColor: "#000000"
    },
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
        initialParams={{
          tabs: alterPrisonerData,
        }}
        options={{
          title: "Alter Prisoner Data", //? the title that will be shown on the tab
          headerBackVisible: false,
          headerBackTitleVisible: false,
          headerTitleAlign: "center",
        }}
      />
      {/* <Drawer.Screen
        name="Alter Guard data"
        component={AlterTabs}
        initialParams={{
          first: alterGuardData[0],
          second: alterGuardData[1],
          third: alterGuardData[2],
        }}
        options={{
          title: "Alter guard Data", //? the title that will be shown on the tab
          headerBackVisible: false,
          headerBackTitleVisible: false,
          headerTitleAlign: "center",
        }}
      />
      {adminData?.accesslevel === undefined ? (
        <Drawer.Screen
          name="Alter Admin Data"
          component={AlterTabs}
          initialParams={{
            first: alterAdminData[0],
            second: alterAdminData[1],
            third: alterAdminData[2],
          }}
          options={{
            title: "Alter Admin Data", //? the title that will be shown on the tab
            headerBackVisible: false,
            headerBackTitleVisible: false,
            headerTitleAlign: "center",
          }}
        />
      ) : null} */}
    </Drawer.Navigator>
  );
};

export default AdminDrawer;
