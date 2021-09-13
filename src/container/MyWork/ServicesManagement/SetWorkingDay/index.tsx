import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ButtonIconHeader from "components/ButtonIconHeader";
import { Colors, Routes } from "configs";
import { SOURCE_ICON } from "images";
import React, { memo, useCallback, useLayoutEffect, useState } from "react";
import { TouchableOpacity, View, StyleSheet, FlatList } from "react-native";
import Text from "components/Text";
import Theme from "style/Theme";
import CheckBox from "components/CheckBox";
import ServiceDateItem from "components/ServiceDateItem";
import { width } from "configs/Const";
import ButtonLinear from "components/Buttons/ButtonLinear";
import DatePicker from "react-native-datepicker";
import { useTheme } from "configs/Theme";
import Container from "components/Layout/Container";

const WORKING_DATE = [
  {
    id: 0,
    date: "S",
    isTrue: true,
  },
  {
    id: 1,
    date: "M",
    isTrue: true,
  },
  {
    id: 2,
    date: "T",
    isTrue: true,
  },
  {
    id: 3,
    date: "W",
    isTrue: true,
  },
  {
    id: 4,
    date: "T",
    isTrue: true,
  },
  {
    id: 5,
    date: "F",
    isTrue: true,
  },
  {
    id: 6,
    date: "S",
    isTrue: true,
  },
];

export default memo(() => {
  const { theme } = useTheme();

  const { setOptions, navigate } = useNavigation();
  const [workingDate, setWorkingDate] = useState<any>([]);
  const [isCheck, setIsCheck] = useState<boolean>(true);
  const [fromDate, setFromDate] = useState<any>();
  const [toDate, setToDate] = useState<any>();

  useFocusEffect(
    useCallback(() => {
      setWorkingDate(WORKING_DATE);
    }, [])
  );

  useLayoutEffect(() => {
    setOptions({
      title: null,
      headerStyle: {
        shadowColor: "transparent",
        backgroundColor: theme.background,
        elevation: 0,
      },
      headerLeft: () => (
        <ButtonIconHeader icon={SOURCE_ICON.close} marginLeft={24} />
      ),
    });
  });

  const onSetWorkingTimePress = () => {
    navigate(Routes.SetWorkingTime);
  };

  const onToggleCheck = () => {
    setIsCheck(!isCheck);
  };

  const renderWorkingDate = useCallback(({ item }: any) => {
    return <ServiceDateItem {...item} />;
  }, []);

  return (
    <Container style={styles.container}>
      <Text marginVertical={16}>Step 1 of 2</Text>
      <Text bold size={24}>
        Setting Working Day
      </Text>
      <Text marginTop={40} marginBottom={32} bold size={15}>
        Working Day
      </Text>
      <View style={Theme.flexRow}>
        {WORKING_DATE.map((item, index) => {
          return <ServiceDateItem {...item} />;
        })}
      </View>
      <TouchableOpacity
        activeOpacity={0.54}
        style={Theme.flexRow}
        onPress={onToggleCheck}
      >
        <CheckBox isCheck={isCheck} />
        <Text marginLeft={10}>Included holidays</Text>
      </TouchableOpacity>
      <Text marginTop={40} marginBottom={16} bold size={15}>
        Apply Plan
      </Text>
      <View style={Theme.flexRowSpace}>
        <View>
          <Text>From</Text>
          <DatePicker
            style={styles.datePicker}
            date={fromDate}
            minDate={new Date()}
            mode="date"
            format="DD/MM/YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            iconSource={SOURCE_ICON.calendar}
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 12,
                width: 24,
                height: 24,
              },
              dateInput: {
                borderWidth: 0,
                marginLeft: 48,
                marginRight: 12,
              },
            }}
            onDateChange={(date) => {
              setToDate(date);
              setFromDate(date);
            }}
          />
        </View>
        <View>
          <Text>To</Text>
          <DatePicker
            style={[
              styles.datePicker,
              { backgroundColor: theme.backgroundItem },
            ]}
            date={toDate}
            mode="date"
            format="DD/MM/YYYY"
            minDate={fromDate}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            iconSource={SOURCE_ICON.calendar}
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 12,
                width: 24,
                height: 24,
              },
              dateInput: {
                borderWidth: 0,
                marginLeft: 48,
                marginRight: 12,
              },
            }}
            onDateChange={(date) => {
              setToDate(date);
            }}
          />
        </View>
      </View>
      <View style={styles.button}>
        <ButtonLinear
          onPress={onSetWorkingTimePress}
          title="Set Working Time"
          white
        />
      </View>
    </Container>
  );
});
const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingHorizontal: 24,
  },
  button: {
    position: "absolute",
    bottom: 0,
    width: width,
    padding: 24,
  },
  datePicker: {
    width: 156,
    height: 48,
    borderRadius: 8,
    borderColor: Colors.GrayBlue,
    borderWidth: 1,
    justifyContent: "center",
    marginTop: 4,
  },
});
