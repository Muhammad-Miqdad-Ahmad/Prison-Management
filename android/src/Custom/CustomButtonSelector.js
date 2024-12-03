import React, { useEffect, useRef } from "react";
import { View, Animated, Dimensions, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { AdminSearchStyle, ButtonStyles } from "../Styles/AdminStyling";

const screenWidth = Dimensions.get("window").width;

const CustomButtonSelector = ({
  buttonLabels,
  selectedState,
  setSelectedState,
  buttonStyle,
}) => {
  return (
    <Animated.ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={AdminSearchStyle.scroll}
    >

        {buttonLabels.map((label, index) => {
          // Initialize the animation
          const slideAnim = useRef(new Animated.Value(screenWidth)).current;

          // Trigger slide-in animation
          useEffect(() => {
            Animated.timing(slideAnim, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }).start();
          }, []);

          // Determine if the button is selected
          const isSelected = selectedState === label;

          return (
            <Animated.View
              key={index}
              style={[
                { transform: [{ translateX: slideAnim }] },
                ButtonStyles.buttonContainer,
                isSelected && ButtonStyles.selectedButtonBackground, // Highlight background
              ]}
            >
              <Button
                mode="text" // Change mode to elevated
                onPress={() => setSelectedState(label)}
                style={[AdminSearchStyle?.button || buttonStyle?.button]}
                labelStyle={[
                  ButtonStyles.buttonText,
                  isSelected && ButtonStyles.selectedText, // White text for selected button
                ]}
              >
                {label}
              </Button>
            </Animated.View>
          );
        })}
    </Animated.ScrollView>
  );
};

export default CustomButtonSelector;
