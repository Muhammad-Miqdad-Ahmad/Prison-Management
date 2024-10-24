import "./gesture-handler"
import React from "react";
import AdminHome from "../Pages/AdminHome";
import AdminSearch from "../Pages/AdminSearch";
import { createDrawerNavigator } from "@react-navigation/drawer";

const AdminDrawer = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator backBehavior="firstRoute">
      <Drawer.Screen name="Home" component={AdminHome} />
      <Drawer.Screen name="Search" component={AdminSearch} />
    </Drawer.Navigator>
  );
};

export default AdminDrawer;
