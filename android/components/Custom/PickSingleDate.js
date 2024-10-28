// import React, { useState, useCallback, useMemo } from "react";
// import { View, StyleSheet } from "react-native";
// import {
//   Button,
//   Text,
//   Provider as PaperProvider,
//   MD3DarkTheme,
//   MD3LightTheme,
// } from "react-native-paper";
// import { DatePickerModal, enGB, registerTranslation } from "react-native-paper-dates";
// import { useColorScheme } from "react-native";

// export default function SingleDatePicker() {
//   const colorScheme = useColorScheme();
//   const theme = colorScheme === "dark" ? MD3DarkTheme : MD3LightTheme;

//   /** State variables. */
//   const [singleOpen, setSingleOpen] = useState(false);
//   const [date, setDate] = useState(undefined);
//   registerTranslation("en-GB", enGB);
//   const locale = "en-GB";

//   const dateFormatter = useMemo(
//     () =>
//       new Intl.DateTimeFormat(locale, {
//         day: "numeric",
//         month: "long",
//         year: "numeric",
//       }),
//     [locale]
//   );

//   const pastDate = new Date(new Date().setDate(new Date().getDate() - 5));
//   const futureDate = new Date(new Date().setDate(new Date().getDate() + 5));

//   /** Callbacks */
//   const onChangeSingle = useCallback(
//     (params) => {
//       setSingleOpen(false);
//       setDate(params.date);
//     },
//     [setSingleOpen, setDate]
//   );

//   const onDismissSingle = useCallback(() => {
//     setSingleOpen(false);
//   }, [setSingleOpen]);

//   return (
//     <PaperProvider theme={theme}>
//       <View style={styles.container}>
//         <Text style={styles.title}>Single Date Picker</Text>
//         <Text style={styles.dateText}>
//           {date ? dateFormatter.format(date) : "No date selected."}
//         </Text>
//         <Button
//           onPress={() => setSingleOpen(true)}
//           uppercase={false}
//           mode="contained-tonal"
//         >
//           Pick single date
//         </Button>
//       </View>

//       <DatePickerModal
//         locale={locale}
//         mode="single"
//         visible={singleOpen}
//         onDismiss={onDismissSingle}
//         date={date}
//         onConfirm={onChangeSingle}
//         validRange={{
//           startDate: pastDate,
//           disabledDates: [futureDate],
//         }}
//         presentationStyle="overFullScreen"
//       />
//     </PaperProvider>
//   );
// }


