import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { CustomMenuStyle } from "../Styles/AdminStyling";

const CustomSearchMenu = ({ data, setData, shown }) => {
  if (!data || data.length < 1) {
    return null; // Don't render if no data
  }

  // Extract headers from keys of the first object
  const headers = Object.keys(data[0]);

  // Calculate max width for each column
  const columnWidths = headers.map((header) => {
    const maxContentLength = Math.max(
      ...data.map((item) => (item[header] ? String(item[header]).length : 0)),
      header.length // Include the header length
    );
    return maxContentLength * 8; // Approximate character width in pixels
  });

  return (
    <View style={CustomMenuStyle.menuContainer}>
      <ScrollView
        style={CustomMenuStyle.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View>
            {/* Render all rows */}
            {data.map((item, rowIndex) => (
              <View key={rowIndex}>
                <TouchableOpacity
                  key={rowIndex}
                  style={CustomMenuStyle.row}
                  onPressIn={() => {
                    setData(data[rowIndex]), shown(false);
                  }}
                >
                  {headers.map((header, colIndex) => (
                    <View
                      key={colIndex}
                      style={[
                        CustomMenuStyle.cell,
                        {
                          width:
                            columnWidths[
                              colIndex < header?.length
                                ? header?.length + 1
                                : colIndex
                            ],
                        },
                      ]}
                    >
                      {/* Header */}
                      <Text
                        style={CustomMenuStyle.headerText}
                        numberOfLines={1}
                        ellipsizeMode="clip"
                      >
                        {header}
                      </Text>

                      {/* Data */}
                      <Text
                        style={CustomMenuStyle.dataText}
                        numberOfLines={1}
                        ellipsizeMode="clip"
                      >
                        {item[header] || "N/A"}
                      </Text>
                    </View>
                  ))}
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default CustomSearchMenu;
