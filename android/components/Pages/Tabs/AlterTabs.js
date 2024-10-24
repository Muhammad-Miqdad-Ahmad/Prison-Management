import React, { useState } from "react";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationContainer } from "@react-navigation/native";

const AlterTabs = ({ route }) => {
  const Tab = createMaterialBottomTabNavigator();
  const first = route.params.first;
  const second = route.params.second;
  const third = route.params.third;

  const [barColor, setBarColor] = useState("#694fad"); // Default bar color
  const [activeIconColor, setActiveIconColor] = useState("#f0edf6"); // Default active icon color

  return (
    <>
      <Tab.Navigator
        shifting={true}
        activeColor={activeIconColor}
        inactiveColor="#3e2465"
        barStyle={{ backgroundColor: barColor }}
      >
        <Tab.Screen
          name={first?.text}
          component={first?.route}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="plus" size={20} color={color} />
            ),
            tabBarLabel: first?.text,
          }}
          listeners={{
            focus: () => {
              setBarColor("blue");
              setActiveIconColor("#FFFFFF");
            },
          }}
        />
        <Tab.Screen
          name={second?.text}
          component={second?.route}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="trash" size={20} color={color} />
            ),
            tabBarLabel: second?.text,
          }}
          listeners={{
            focus: () => {
              setBarColor("red");
              setActiveIconColor("#FFFFFF");
            },
          }}
        />
        <Tab.Screen
          name={third?.text}
          component={third?.route}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="edit" size={20} color={color} />
            ),
            tabBarLabel: third?.text,
          }}
          listeners={{
            focus: () => {
              setBarColor("yellow");
              setActiveIconColor("#000000");
            },
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default AlterTabs;
