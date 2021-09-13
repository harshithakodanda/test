import React, { memo, useState } from "react";
import { StyleSheet } from "react-native";
import { CalendarList, LocaleConfig } from "react-native-calendars";
import { Colors, Constants } from "configs";
import { useTheme } from "configs/Theme";

LocaleConfig.locales.fr = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthNamesShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  dayNames: ["S", "M", "T", "W", "T", "F", "S"],
  dayNamesShort: ["S", "M", "T", "W", "T", "F", "S"],
};
LocaleConfig.defaultLocale = "fr";

const Calendar = memo(() => {
  const [dateSelected, setDateSelected] = useState<any>("");
  const [active, setActive] = useState<boolean>(false);
  const [markedDates, setMarkedDates] = useState("");
  const { theme } = useTheme();
  const message = {
    key: "message",
    color: Colors.Jade,
    selectedDotColor: active ? Colors.White : Colors.Jade,
  };
  const gmail = {
    key: "vacation",
    color: Colors.Jade,
    selectedDotColor: active ? Colors.White : Colors.Jade,
  };
  const phoneCall = {
    key: "phoneCall",
    color: Colors.Jade,
    selectedDotColor: active ? Colors.White : Colors.Jade,
  };
  const appointment = {
    key: "appointment",
    color: Colors.Jade,
    selectedDotColor: active ? Colors.White : Colors.Jade,
  };
  
  return (
    <CalendarList
      style={styles.container}
      current={"2020-01-05"}
      //minDate={"2020-01-01"}
      onDayPress={(day) => {
        setMarkedDates(day.dateString);
        setDateSelected(day.dateString);
        setActive(true);
      }}
      markingType={"multi-dot"}
      hideExtraDays={true}
      horizontal={true}
      pagingEnabled={true}
      //markingType={"custom"}
      //markingType={"period"}
      markedDates={{
        [markedDates]: {
          selected: true,
          customStyles: {
            container: {
              width: 40,
              height: 40,
              borderRadius: 12,
              alignItem: "center",
              justifyContent: "center",
            },
          },
        },
        "2020-01-05": {
          dots: [message, gmail, phoneCall, appointment],
          selected: dateSelected === "2020-01-05",
          selectedColor: Colors.DodgerBlue,
        },
        "2020-01-08": {
          marked: true,
          selected: dateSelected === "2020-01-08",
          dots: [message],
        },
        "2020-01-09": {
          marked: true,
          selected: dateSelected === "2020-01-09",
          dots: [message],
        },
        "2020-01-10": {
          marked: true,
          selected: dateSelected === "2020-01-10",
          dots: [message],
        },
        "2020-01-11": {
          marked: true,
          selected: dateSelected === "2020-01-11",
          dots: [message, gmail],
        },
        "2020-01-16": {
          marked: true,
          selected: dateSelected === "2020-01-16",
          dots: [message, gmail],
        },
        "2020-01-17": {
          marked: true,
          selected: dateSelected === "2020-01-17",
          dots: [message],
        },
      }}
      theme={{
        calendarBackground: theme.backgroundItem,
        selectedDayBackgroundColor: Colors.DodgerBlue,
        textDayFontFamily: "Mulish-Regular",
        textDayHeaderFontWeight: "400",
        textDayFontWeight: "400",
        textDayHeaderFontSize: 11,
        textDayFontSize: 15,
        textDayHeaderFontFamily: "Mulish-Regular",
        textMonthFontSize: 11,
        textMonthFontWeight: "500",
        "stylesheet.calendar.header": {
          header: {
            flexDirection: "row",
            justifyContent: "flex-start",
          },
        },
      }}
    />
  );
});

export default Calendar;

const styles = StyleSheet.create({
  container: {
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    shadowColor: "rgba(141, 151, 158, 0.2)",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16,
    paddingBottom: 32,
  },
});
