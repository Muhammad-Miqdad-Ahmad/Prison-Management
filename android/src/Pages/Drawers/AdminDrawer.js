import React, { useEffect } from "react";

import AdminHome from "./AdminHome";
import AdminSearch from "./AdminSearch";
import AlterTabs from "../Tabs/AlterTabs";

import GenericTab from "../Tabs/GenericTab";

import AddPersonData from "../AddData";
import { useSelector } from "react-redux";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { LogBox } from "react-native";
import AddGuardData from "../AddGuardData";
import AddAdminData from "../AddAdminData";
import AddPrisonerData from "../AddPrisonerData";

import RemovePrisoner from "../Tabs/RemovePrisoner";
import UpdatePrisoner from "../Tabs/UpdatePrisoner";
import RemoveGuard from "../Tabs/RemoveGuard";
import UpdateGuard from "../Tabs/UpdateGuard";
import AddPrison from "../Tabs/AddPrison";
import RemovePrison from "../Tabs/RemovePrison";
import RemoveAdmin from "../Tabs/RemoveAdmin";
import UpdateAdmin from "../Tabs/UpdateAdmin";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

const AdminDrawer = () => {

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
      component: [<RemoveGuard />],
      componentText: [""],
      barColor: "red",
      activeIconColor: "#FFFFFF",
      callBack: console.log,
    },
    {
      text: "Update",
      route: GenericTab,
      iconName: "edit",
      component: [<UpdateGuard />],
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
      component: [<RemoveAdmin />],
      componentText: [""],
      barColor: "red",
      activeIconColor: "#FFFFFF",
      callBack: console.log,
    },
    {
      text: "Update",
      route: GenericTab,
      iconName: "edit",
      component: [<UpdateAdmin />],
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
      component: [<AddPrison />],
      componentText: [""],
      barColor: "blue",
      activeIconColor: "#FFFFFF",
      callBack: console.log,
    },
    {
      text: "Remove",
      route: GenericTab,
      iconName: "trash",
      component: [<RemovePrison />],
      componentText: [""],
      barColor: "red",
      activeIconColor: "#FFFFFF",
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
      <Drawer.Screen
        name="Alter Prison data"
        component={AlterTabs}
        initialParams={{
          tabs: alterPrisonData,
        }}
        options={{
          title: "Alter Prison Data", //? the title that will be shown on the tab
          headerBackVisible: false,
          headerBackTitleVisible: false,
          headerTitleAlign: "center",
        }}
      />
    </Drawer.Navigator>
  );
};

export default AdminDrawer;
