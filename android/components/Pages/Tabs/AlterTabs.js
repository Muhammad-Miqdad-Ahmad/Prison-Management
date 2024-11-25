import React, { useState } from "react";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";

import { LogBox } from "react-native";

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const AlterTabs = ({ route }) => {
  const Tab = createMaterialBottomTabNavigator();

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
        {route?.params?.tabs?.map((tab, index) => (
          <Tab.Screen
            key={index}
            name={tab?.text}
            component={tab?.route}
            initialParams={{ components: tab?.component, text: tab?.componentText, submitCallBack: tab?.callBack }}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon name={tab?.iconName} size={20} color={color} />
              ),
              tabBarLabel: tab?.text,
            }}
            listeners={{
              focus: () => {
                setBarColor(tab?.barColor);
                setActiveIconColor(tab?.activeIconColor);
              },
            }}
          />
        ))}
      </Tab.Navigator>
    </>
  );
};

export default AlterTabs;
