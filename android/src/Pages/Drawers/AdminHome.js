import { Text, View } from "react-native";
import React from "react";
import { centre, AdminHomeStyle } from "../../Styles/AdminStyling";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const adminData = useSelector((state) => state.admin.adminData);
  console.log(adminData);
  return (
    <View style={[centre.centre, AdminHomeStyle.container]}>
      <Text style={[AdminHomeStyle.genericText]}>Welcome to the prison admin app</Text>
      <Text style={[AdminHomeStyle.mainText]}>{adminData.admin_email}</Text>
      <Text style={[AdminHomeStyle.mainText]}>head of Branch '{adminData.prision_id}'</Text>
    </View>
  );
};

export default AdminHome;
