import { Text, View } from "react-native";
import React, { useState } from "react";
import { centre, AdminHomeStyle } from "../../Styles/AdminStyling";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const adminData = useSelector((state) => state.admin.adminData);
  return (
    <View style={[centre.centre, AdminHomeStyle.container]}>
      <Text style={[AdminHomeStyle.genericText]}>Welcome to the prison admin app</Text>
      <Text style={[AdminHomeStyle.mainText]}>{adminData.adminName}</Text>
      <Text style={[AdminHomeStyle.mainText]}>head of Branch '{adminData.headNumber}'</Text>
    </View>
  );
};

export default AdminHome;
