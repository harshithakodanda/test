import React, { memo, useCallback, useLayoutEffect, useMemo } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Text from "components/Text";
import { useNavigation } from "@react-navigation/native";
import { Colors, Routes } from "configs";
import { getBottomSpace } from "react-native-iphone-x-helper";
import ButtonIconHeader from "components/ButtonIconHeader";
import Theme from "style/Theme";
import Animated, {
  Value,
  Clock,
  useCode,
  cond,
  set,
  eq,
  add,
} from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Calendar from "components/Schedule/Calendar";
import { fakeData } from "container/Consults/TodayConsults";
import keyExtractor from "utils/keyExtractor";
import {
  usePanGestureHandler,
  clamp,
  minus,
  timing,
  snapPoint,
} from "react-native-redash/lib/module/v1";
import Container from "components/Layout/Container";
import { useTheme } from "configs/Theme";

interface ScheduleProps {}
const snapPoints = [110, 308];

const dataDate = [
  {
    day: 5,
    month: 1,
    year: 2020,
    dateString: "2020-01-05",
    //data: data,
    typeNotice: ["message", "vacation", "phoneCall", "appointment"],
  },
  {
    day: 8,
    month: 1,
    year: 2020,
    dateString: "2020-01-08",
    typeNotice: ["message"],
    //data: data1,
  },
  {
    day: 10,
    month: 1,
    year: 2020,
    dateString: "2020-01-10",
    typeNotice: ["message"],
    //data: data2,
  },
  {
    day: 11,
    month: 1,
    year: 2020,
    dateString: "2020-01-11",
    typeNotice: ["message", "vacation"],
    //data: data2,
  },
  {
    day: 16,
    month: 1,
    year: 2020,
    dateString: "2020-01-16",
    typeNotice: ["message", "vacation"],
    //data: data2,
  },
  {
    day: 17,
    month: 1,
    year: 2020,
    dateString: "2020-01-17",
    typeNotice: ["message"],
    //data: data2,
  },
];

const Schedule = memo((props: ScheduleProps) => {
  const { setOptions, goBack, navigate } = useNavigation();
  const { theme } = useTheme();
  const dateHasOrder = dataDate.map((item) => {
    return item.dateString;
  });

  const onSearch = useCallback(() => {
    navigate(Routes.Search);
  }, []);
  useLayoutEffect(() => {
    setOptions({
      title: null,
      headerStyle: {
        ...Theme.headerNavigationStyle,
        backgroundColor: theme.backgroundItem,
      },
      headerLeft: () => (
        <ButtonIconHeader
          marginLeft={24}
          icon={require("images/ic_close.png")}
        />
      ),
      headerRight: () => (
        <ButtonIconHeader
          icon={require("images/ic_search_normal.png")}
          tintColor={Colors.DodgerBlue}
          marginRight={24}
          borderColor={Colors.DodgerBlue}
          onPress={onSearch}
        />
      ),
    });
  }, [setOptions]);
  const {
    gestureHandler,
    translation,
    velocity,
    state,
  } = usePanGestureHandler();
  const transY = useMemo(() => new Value(110), []);
  const offsetY = new Value(0);
  const clock = useMemo(() => new Clock(), []);
  const to = snapPoint(transY, velocity.y, snapPoints);

  useCode(
    () => [
      cond(
        eq(state, State.ACTIVE),
        set(transY, add(offsetY, clamp(translation.y, -9999, offsetY)))
      ),
      cond(eq(state, State.END), [
        set(transY, timing({ clock, from: transY, to })),
        set(offsetY, transY),
      ]),
    ],
    []
  );
  return (
    <Container style={styles.container}>
      <Animated.View
        style={{
          height: transY,
          backgroundColor: Colors.White,
          ...Theme.shadow,
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
        }}
      >
        <Calendar />
        <PanGestureHandler {...gestureHandler}>
          <Animated.View
            style={{
              height: 24,
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            <View
              style={{
                width: 40,
                height: 4,
                borderRadius: 2,
                position: "absolute",
                backgroundColor: Colors.Platinum,
                bottom: 12,
                alignSelf: "center",
              }}
            />
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
      <View>
        <FlatList
          data={fakeData}
          contentContainerStyle={styles.flatList}
          ListHeaderComponent={() => {
            return (
              <Text
                marginBottom={16}
                color={Colors.GrayBlue}
                lineHeight={14}
                uppercase
                size={11}
              >
                SEPTEMBER 31 - JANUARY 6
              </Text>
            );
          }}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          renderItem={({ item }) => <ConsultsItem {...item} />}
          keyExtractor={keyExtractor}
        />
        <Text
          size={13}
          bold
          style={{ position: "absolute", top: 70, left: 24 }}
        >
          FRI{"\n"}
          <Text bold size={20} lineHeight={24}>
            5
          </Text>
        </Text>
      </View>
    </Container>
  );
});

export default Schedule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    paddingTop: 70,
    paddingLeft: 72,
    paddingBottom: getBottomSpace() + 120,
  },
});
