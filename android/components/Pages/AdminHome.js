import { Text, View } from "react-native";
import React, { useState } from "react";
import { centre } from "../Styles/AdminStyling";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const adminData = useSelector((state) => state.admin.adminData);
  return (
    <View style={centre.centre}>
      <Text>{adminData.adminName}</Text>
    </View>
  );
};

export default AdminHome;
