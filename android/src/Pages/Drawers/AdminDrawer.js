import React, { useEffect } from "react";

import AdminHome from "./AdminHome";
import AdminSearch from "./AdminSearch";
import AlterTabs from "../Tabs/AlterTabs";

import GenericTab from "../Tabs/GenericTab";

import AddPersonData from "../AddData";
import UpdateData from "../UpdateData";
import RemovePerson from "../RemoveData";
import { useSelector } from "react-redux";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { LogBox } from "react-native";
import AddGuardData from "../AddGuardData";
import AddAdminData from "../AddAdminData";
import AddPrisonerData from "../AddPrisonerData";

import RemovePrisoner from "../Tabs/RemovePrisoner";
import UpdatePrisoner from "../Tabs/UpdatePrisoner";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

const AdminDrawer = ({ navigation }) => {

  const Drawer = createDrawerNavigator();
  const adminData = useSelector((state) => state.admin.adminData);

  useEffect(()=>{
  },[])

  const alterPrisonerData = [
    {
      text: "Add",
      route: GenericTab,
      iconName: "plus",
      component: [<AddPersonData />, <AddPrisonerData />],
      componentText: [
        "Add Personal detail of the prisoner",
        "Add Prisoner detail",
      ],
      barColor: "blue",
      activeIconColor: "#FFFFFF",
      callBack: "submitAddPrisoner",        // the call back to add the pisoner
    },
    {
      text: "Remove",
      route: GenericTab,
      iconName: "trash",
      component: [<RemovePrisoner />],
      componentText: [""],
      barColor: "red",
      activeIconColor: "#FFFFFF",
      callBack: "submitDeletePrisoner",
    },
    {
      text: "Update",
      route: GenericTab,
      iconName: "edit",
      component: [<UpdatePrisoner />],
      componentText: [""],
      barColor: "yellow",
      activeIconColor: "#000000",
      callBack: console.log,
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
      activeIconColor: "#FFFFFF",
      callBack: console.log,
    },
    {
      text: "Remove",
      route: GenericTab,
      iconName: "trash",
      component: [<RemovePerson />],
      componentText: [""],
      barColor: "red",
      activeIconColor: "#FFFFFF",
      callBack: console.log,
    },
    {
      text: "Update",
      route: GenericTab,
      iconName: "edit",
      component: [<UpdateData />],
      componentText: [""],
      barColor: "yellow",
      activeIconColor: "#000000",
      callBack: console.log,
    },
  ];
  const alterAdminData = [
    {
      text: "Add",
      route: GenericTab,
      iconName: "plus",
      component: [<AddAdminData />],
      componentText: [""],
      barColor: "blue",
      activeIconColor: "#FFFFFF",
      callBack: "submitAddAdmin",
    },
    {
      text: "Remove",
      route: GenericTab,
      iconName: "trash",
      component: [<RemovePerson />],
      componentText: [""],
      barColor: "red",
      activeIconColor: "#FFFFFF",
      callBack: console.log,
    },
    {
      text: "Update",
      route: GenericTab,
      iconName: "edit",
      component: [<UpdateData />],
      componentText: [""],
      barColor: "yellow",
      activeIconColor: "#000000",
      callBack: console.log,
    },
  ];
  const alterPrisonData = [
    {
      text: "Add",
      route: GenericTab,
      iconName: "plus",
      component: [<AddPersonData />, <AddAdminData />],
      componentText: ["Add Personal detail of the Admin", "Add Admin detail"],
      barColor: "blue",
      activeIconColor: "#FFFFFF",
      callBack: console.log,
    },
    {
      text: "Remove",
      route: GenericTab,
      iconName: "trash",
      component: [<RemovePerson />],
      componentText: [""],
      barColor: "red",
      activeIconColor: "#FFFFFF",
      callBack: console.log,
    },
    {
      text: "Update",
      route: GenericTab,
      iconName: "edit",
      component: [<UpdateData />],
      componentText: [""],
      barColor: "yellow",
      activeIconColor: "#000000",
      callBack: console.log,
    },
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
      {adminData?.accesslevel === undefined ? (
        <Drawer.Screen
          name="Alter Admin Data"
          component={AlterTabs}
          initialParams={{
            tabs: alterAdminData,
          }}
          options={{
            title: "Alter Admin Data",
            headerBackVisible: false,
            headerBackTitleVisible: false,
            headerTitleAlign: "center",
          }}
        />
      ) : null}
    </Drawer.Navigator>
  );
};

export default AdminDrawer;
