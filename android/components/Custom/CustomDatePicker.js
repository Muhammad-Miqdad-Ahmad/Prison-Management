import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import {
  Button,
  Text,
  Provider as PaperProvider,
  MD3DarkTheme,
  MD3LightTheme,
} from "react-native-paper";
import {
  DatePickerModal,
  enGB,
  registerTranslation,
} from "react-native-paper-dates";
import { useColorScheme } from "react-native";
import { AdminAddPrisonerStyle, centre } from "../Styles/AdminStyling";

// Adding children prop to allow passing content above the date picker
const CustomDatePicker = ({ children, date, setDate, dateText }) => {
  const [singleOpen, setSingleOpen] = useState(false);

  useEffect(() => registerTranslation("en-GB", enGB), []);
  const [locale] = useState("en-GB");

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    [locale]
  );

  const onChangeSingle = useCallback((params) => {
    setSingleOpen(false);
    setDate(params.date);
  }, []);

  const onDismissSingle = useCallback(() => {
    setSingleOpen(false);
  }, []);

  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? MD3DarkTheme : MD3LightTheme;

  return (
    <PaperProvider theme={theme}>
      {/* Render any children passed to this component above the date picker */}
      {children[0]}

      <View style={[AdminAddPrisonerStyle.container, centre.centre]}>
        <View style={AdminAddPrisonerStyle.datePickerDiv}>
          <Text
            style={[
              AdminAddPrisonerStyle.text,
              AdminAddPrisonerStyle.dateHeadingText,
            ]}
          >
            {children[1]}
          </Text>
          <Text
            style={[AdminAddPrisonerStyle.text, AdminAddPrisonerStyle.dateText]}
          >
            {date ? dateFormatter.format(date) : "No date selected."}
          </Text>
          <Button
            onPress={() => setSingleOpen(true)}
            mode="contained-tonal"
            uppercase={false}
          >
            {`Pick ${children[1]}`}
          </Button>
          <DatePickerModal
            locale="en-GB"
            mode="single"
            visible={singleOpen}
            onDismiss={onDismissSingle}
            date={date}
            onConfirm={onChangeSingle}
            validRange={{
              startDate: null,
              disabledDates: null,
            }}
            presentationStyle="overFullScreen"
          />
        </View>
      </View>
    </PaperProvider>
  );
};

export default CustomDatePicker;
