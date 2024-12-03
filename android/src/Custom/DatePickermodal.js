import {
  StyleSheet,
  ScrollView,
  View,
  Linking,
  Image,
  useWindowDimensions,
  useColorScheme,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Button,
  Text,
  useTheme,
  Paragraph,
  List,
  Divider,
  Chip,
  Provider as PaperProvider,
  MD3DarkTheme,
  MD3LightTheme,
  MD2DarkTheme,
  MD2LightTheme,
} from "react-native-paper";
import {
  DatePickerModal,
  TimePickerModal,
  DatePickerInput,
  registerTranslation,
  TranslationsType,
  ar,
  ca,
  de,
  en,
  enGB,
  es,
  fr,
  he,
  hi,
  it,
  ko,
  nl,
  pl,
  pt,
  tr,
  zh,
  zhTW,
  cs,
  el,
  ru,
  ro,
  id,
  ja,
  th,
  ukUA,
  noNO,
} from "react-native-paper-dates";
import { useCallback, useMemo, useState } from "react";
import React from "react";
import { StatusBar } from "expo-status-bar";

const presentationStyles = ["overFullScreen", "pageSheet"];
const locales = [
  ["ar", ar],
  ["ca", ca],
  ["de", de],
  ["en", en],
  ["en-GB", enGB],
  ["es", es],
  ["fr", fr],
  ["he", he],
  ["hi", hi],
  ["it", it],
  ["ko", ko],
  ["nl", nl],
  ["pl", pl],
  ["pt", pt],
  ["tr", tr],
  ["zh", zh],
  ["zh-TW", zhTW],
  ["cs", cs],
  ["el", el],
  ["ru", ru],
  ["ro", ro],
  ["id", id],
  ["ja", ja],
  ["th", th],
  ["uk-UA", ukUA],
  ["no-NO", noNO],
];

locales.forEach((locale) => {
  registerTranslation(locale[0], locale[1]);
});

export default function Example() {
  /** Hooks. */
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  /** State variables. */
  const [materialYouEnabled, setMaterialYouEnabled] = useState(true);
  const [inputDate, setInputDate] = useState(undefined);
  const [date, setDate] = useState(undefined);
  const [dates, setDates] = useState();
  const [range, setRange] = useState();
  const [time, setTime] = useState();
  const [locale, setLocale] = useState("en-GB");
  const [presentationStyle, setPresentationStyle] = useState("overFullScreen");
  const [timeOpen, setTimeOpen] = useState(false);
  const [rangeOpen, setRangeOpen] = useState(false);
  const [singleOpen, setSingleOpen] = useState(false);
  const [multiOpen, setMultiOpen] = useState(false);

  /** Constants. */
  const m3Theme = colorScheme === "dark" ? MD3DarkTheme : MD3LightTheme;
  const m2Theme = colorScheme === "dark" ? MD2DarkTheme : MD2LightTheme;
  const maxFontSizeMultiplier = 1.5;
  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    [locale]
  );
  const timeFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: locale === "en",
      }),
    [locale]
  );

  const pastDate = new Date(new Date().setDate(new Date().getDate() - 5));
  const futureDate = new Date(new Date().setDate(new Date().getDate() + 5));

  let timeDate = new Date();
  time?.hours !== undefined && timeDate.setHours(time?.hours);
  time?.minutes !== undefined && timeDate.setMinutes(time?.minutes);

  /** Callbacks. */
  const onConfirmTime = useCallback(
    ({ hours, minutes }) => {
      setTimeOpen(false);
      setTime({ hours, minutes });
    },
    [setTimeOpen, setTime]
  );
  const onDismissTime = useCallback(() => {
    setTimeOpen(false);
  }, [setTimeOpen]);

  const onChangeSingle = useCallback(
    (params) => {
      setSingleOpen(false);
      setDate(params.date);
    },
    [setSingleOpen, setDate]
  );
  const onDismissSingle = useCallback(() => {
    setSingleOpen(false);
  }, [setSingleOpen]);

  const onChangeMulti = useCallback((params) => {
    setMultiOpen(false);
    setDates(params.dates);
  }, []);
  const onDismissMulti = useCallback(() => {
    setMultiOpen(false);
  }, []);

  const onChangeRange = useCallback(
    ({ startDate, endDate }) => {
      setRangeOpen(false);
      setRange({ startDate, endDate });
    },
    [setRangeOpen, setRange]
  );
  const onDismissRange = useCallback(() => {
    setRangeOpen(false);
  }, [setRangeOpen]);

  const dimensions = useWindowDimensions();
  const isLarge = dimensions.width > 600;

  return (
    <PaperProvider theme={materialYouEnabled ? m3Theme : m2Theme}>
      <StatusBar />
      <ScrollView
        style={{ backgroundColor: theme.colors.background }}
        contentContainerStyle={[
          styles.paddingSixteen,
          { paddingTop: insets.top + 24, paddingBottom: insets.bottom },
        ]}
      >
        <View style={styles.contentContainer}>
          <View style={isLarge && styles.surface}>
            <Divider style={styles.marginTopSixteen} />
            <List.Section>
              <View style={[styles.row, styles.marginVerticalEight]}>
                <View style={styles.section}>
                  <Text
                    maxFontSizeMultiplier={maxFontSizeMultiplier}
                    style={styles.bold}
                  >
                    Time Picker
                  </Text>
                  <Text
                    maxFontSizeMultiplier={maxFontSizeMultiplier}
                    variant="bodySmall"
                  >
                    {time &&
                    time?.hours !== undefined &&
                    time?.minutes !== undefined
                      ? timeFormatter.format(timeDate)
                      : "No time selected."}
                  </Text>
                </View>
                <Button
                  onPress={() => setTimeOpen(true)}
                  uppercase={false}
                  mode="contained-tonal"
                >
                  Pick time
                </Button>
              </View>
              <Divider style={styles.marginVerticalEight} />
              <Text
                maxFontSizeMultiplier={maxFontSizeMultiplier}
                style={[styles.marginTopEight, styles.bold]}
              >
                Date Picker
              </Text>
              <Text
                maxFontSizeMultiplier={maxFontSizeMultiplier}
                style={[styles.marginTopSixteen, styles.marginBottomEight]}
              >
                Input
              </Text>
              <View style={styles.row}>
                <DatePickerInput
                  locale={locale}
                  value={inputDate}
                  onChange={setInputDate}
                  inputMode="start"
                  autoComplete={"birthdate-full"}
                  style={styles.marginBottomEight}
                />
              </View>
              <View style={styles.sectionContainer}>
                <View style={styles.section}>
                  <Text maxFontSizeMultiplier={maxFontSizeMultiplier}>
                    Single Date
                  </Text>
                  <Text
                    maxFontSizeMultiplier={maxFontSizeMultiplier}
                    variant="bodySmall"
                  >
                    {date ? dateFormatter.format(date) : "No date selected."}
                  </Text>
                </View>
                <Button
                  onPress={() => setSingleOpen(true)}
                  uppercase={false}
                  mode="contained-tonal"
                >
                  Pick single date
                </Button>
              </View>
              <View style={styles.sectionContainer}>
                <View style={styles.section}>
                  <Text maxFontSizeMultiplier={maxFontSizeMultiplier}>
                    Multiple Dates
                  </Text>
                  <Text
                    maxFontSizeMultiplier={maxFontSizeMultiplier}
                    variant="bodySmall"
                  >
                    {dates
                      ?.map((d) => dateFormatter.format(d))
                      .filter(Boolean)
                      .join(", ") || "No dates selected."}
                  </Text>
                </View>
                <Button
                  onPress={() => setMultiOpen(true)}
                  uppercase={false}
                  mode="contained-tonal"
                >
                  Pick multiple dates
                </Button>
              </View>
              <View style={styles.sectionContainer}>
                <View style={styles.section}>
                  <Text maxFontSizeMultiplier={maxFontSizeMultiplier}>
                    Date Range
                  </Text>
                  <Text
                    maxFontSizeMultiplier={maxFontSizeMultiplier}
                    variant="bodySmall"
                  >
                    {!range?.startDate && !range?.endDate
                      ? "No dates selected."
                      : [
                          range?.startDate
                            ? dateFormatter.format(range?.startDate)
                            : "",
                          range?.endDate
                            ? dateFormatter.format(range?.endDate)
                            : "",
                        ].join(" - ")}
                  </Text>
                </View>
                <Button
                  onPress={() => setRangeOpen(true)}
                  uppercase={false}
                  mode="contained-tonal"
                >
                  Pick range
                </Button>
              </View>
            </List.Section>
            <Divider />
            <List.Section>
              <View style={styles.marginTopSixteen}>
                <Text
                  maxFontSizeMultiplier={maxFontSizeMultiplier}
                  style={styles.bold}
                >
                  Other great libraries
                </Text>
                <Text
                  maxFontSizeMultiplier={maxFontSizeMultiplier}
                  variant="bodySmall"
                >
                  We have made performant, type-safe libraries to help you build
                  great apps, they also always work great on the web too!
                </Text>
              </View>
              <View style={[styles.gap, styles.marginVerticalSixteen]}>
                <Button
                  icon="github"
                  mode="contained-tonal"
                  onPress={() =>
                    Linking.openURL(
                      "https://github.com/web-ridge/react-native-use-form"
                    )
                  }
                >
                  React Native Use Form
                </Button>
                <Button
                  icon="github"
                  mode="contained-tonal"
                  onPress={() =>
                    Linking.openURL(
                      "https://github.com/web-ridge/react-native-ridge-navigation"
                    )
                  }
                >
                  React Native Ridge Navigation
                </Button>
              </View>
            </List.Section>
          </View>
        </View>
      </ScrollView>
      <DatePickerModal
        locale={locale}
        mode="range"
        visible={rangeOpen}
        onDismiss={onDismissRange}
        startDate={range?.startDate}
        endDate={range?.endDate}
        onConfirm={onChangeRange}
        presentationStyle={presentationStyle}
      />
      <DatePickerModal
        locale={locale}
        mode="single"
        visible={singleOpen}
        onDismiss={onDismissSingle}
        date={date}
        onConfirm={onChangeSingle}
        validRange={{
          startDate: pastDate,
          disabledDates: [futureDate],
        }}
        presentationStyle={presentationStyle}
      />
      <DatePickerModal
        locale={locale}
        mode="multiple"
        visible={multiOpen}
        onDismiss={onDismissMulti}
        dates={dates}
        validRange={{ startDate: new Date() }}
        onConfirm={onChangeMulti}
        presentationStyle={presentationStyle}
      />
      <TimePickerModal
        locale={locale}
        visible={timeOpen}
        onDismiss={onDismissTime}
        onConfirm={onConfirmTime}
        hours={time?.hours}
        minutes={time?.minutes}
      />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  bold: {
    fontWeight: "bold",
  },
  column: {
    flexDirection: "column",
  },
  chip: {
    marginHorizontal: 4,
    marginVertical: 4,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  logo: {
    height: 56,
    marginRight: 12,
    width: 56,
  },
  paddingSixteen: {
    padding: 16,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  marginBottomEight: {
    marginBottom: 8,
  },
  marginTopEight: {
    marginTop: 8,
  },
  marginTopSixteen: {
    marginTop: 16,
  },
  marginVerticalEight: {
    marginVertical: 8,
  },
  marginVerticalSixteen: {
    marginVertical: 16,
  },
  row: {
    flexDirection: "row",
  },
  section: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  sectionContainer: {
    flexDirection: "row",
    marginVertical: 16,
  },
  underline: {
    textDecorationLine: "underline",
  },
  gap: {
    gap: 12,
  },
  surface: {
    padding: 24,
    maxWidth: 550,
    borderRadius: 10,
  },
});
