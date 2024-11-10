import React from "react";

import AdminHome from "./AdminHome";
import AdminSearch from "./AdminSearch";
import AlterTabs from "../Tabs/AlterTabs";

import GenericTab from "../Tabs/GenericTab";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { useSelector } from "react-redux";
import AddPersonData from "../AddData";
import RemovePerson from "../RemoveData";
import UpdateData from "../UpdateData";

import { LogBox } from "react-native";
import AddPrisonerData from "../AddPrisonerData";
import AddGuardData from "../AddGuardData";

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const AdminDrawer = () => {
  const Drawer = createDrawerNavigator();
  const adminData = useSelector((state) => state.admin.adminData);
  const alterPrisonerData = [
    {
      text: "Add",
      route: GenericTab,
      iconName: "plus",
      component: [<AddPersonData />, <AddPrisonerData />],
      componentText: ["Add Personal detail of the prisoner", "Add Prisoner detail"],
      barColor: "blue",
      activeIconColor: "#FFFFFF"
    },
    {
      text: "Remove",
      route: GenericTab,
      iconName: "trash",
      component: [<RemovePerson />],
      componentText: [""],
      barColor: "red",
      activeIconColor: "#FFFFFF"
    },
    {
      text: "Update",
      route: GenericTab,
      iconName: "edit",
      component: [<UpdateData />],
      componentText: [""],
      barColor: "yellow",
      activeIconColor: "#000000"
    },
  ];
  const alterGuardData = [
    {
      text: "Add",
      route: GenericTab,
      iconName: "plus",
      component: [<AddPersonData />, <AddGuardData />],
      componentText: ["Add Personal detail of the Guard", "Add Guard detail"],
      barColor: "blue",
      activeIconColor: "#FFFFFF"
    },
    {
      text: "Remove",
      route: GenericTab,
      iconName: "trash",
      component: [<RemovePerson />],
      componentText: [""],
      barColor: "red",
      activeIconColor: "#FFFFFF"
    },
    {
      text: "Update",
      route: GenericTab,
      iconName: "edit",
      component: [<UpdateData />],
      componentText: [""],
      barColor: "yellow",
      activeIconColor: "#000000"
    },
  ];
  const alterAdminData = [
    { text: "Add", route: GenericTab },
    { text: "Remove", route: GenericTab },
    { text: "Update", route: GenericTab },
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
      <Drawer.Screen
        name="Alter Guard data"
        component={AlterTabs}
        initialParams={{
          tabs: alterGuardData,
        }}
        options={{
          title: "Alter guard Data", //? the title that will be shown on the tab
          headerBackVisible: false,
          headerBackTitleVisible: false,
          headerTitleAlign: "center",
        }}
      />
      {/* {adminData?.accesslevel === undefined ? (
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
