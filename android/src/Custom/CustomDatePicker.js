import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import {
  Button,
  Text,
  Provider as PaperProvider,
} from "react-native-paper";
import {
  DatePickerModal,
  enGB,
  registerTranslation,
} from "react-native-paper-dates";
import { AdminAddPrisonerStyle, centre } from "../Styles/AdminStyling";

// Adding children prop to allow passing content above the date picker
const CustomDatePicker = ({
  children,
  date,
  data,
  setDate,
  setData,
  theme,
  lable,
}) => {
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
    setData((prevData) => ({
      ...prevData,
      [lable]: params.date,
    }));
  }, []);

  const onDismissSingle = useCallback(() => {
    setSingleOpen(false);
  }, []);

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
            {date
              ? dateFormatter.format(date)
              : data?.[lable]
              ? dateFormatter.format(data?.[lable])
              : "Select a date"}
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
