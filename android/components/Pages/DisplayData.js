import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Divider } from "react-native-paper";

const DisplayData = ({ display, setDisplay }) => {
  const [data, setData] = useState({});

  // Update state when new valid display data is passed
  useEffect(() => {
    if (
      display &&
      typeof display === "object" &&
      !Array.isArray(display) &&
      Object.keys(display).length > 0
    ) {
      setData(display);
      setDisplay(undefined); // Reset the display prop after updating the state
    }
  }, [display, setDisplay]);

  // Return null if there is no data in the state
  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {Object.entries(data).map(([key, value], index) => (
        <View key={index}>
          <View style={styles.row}>
            <Text variant="bodyMedium" numberOfLines={1} style={styles.keyText}>
              {key}:
            </Text>
            <Text variant="bodyMedium" style={styles.valueText}>
              {value !== null && value !== undefined ? String(value) : "N/A"}
            </Text>
          </View>
          {index < Object.entries(data).length - 1 && (
            <Divider style={styles.divider} />
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  keyText: {
    width: "50%",
    fontWeight: "bold",
    color: "#333",
    flexShrink: 0, // Prevent wrapping of the heading text
    whiteSpace: "nowrap", // Ensures no wrapping, but may not be needed in React Native.
  },
  valueText: {
    width: "30%",
    color: "#555",
    flex: 2,
    textAlign: "right",
  },
  divider: {
    marginVertical: 4,
    backgroundColor: "#ddd",
  },
});

export default DisplayData;
