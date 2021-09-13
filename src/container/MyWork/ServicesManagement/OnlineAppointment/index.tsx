import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ButtonIconHeader from "components/ButtonIconHeader";
import { Colors, Routes } from "configs";
import { height } from "configs/Const";
import React, { memo, useCallback, useLayoutEffect, useState } from "react";
import { View, StyleSheet, TextInput, ScrollView, Switch } from "react-native";
import Theme from "style/Theme";
import Text from "components/Text";
import ButtonIcon from "components/Buttons/ButtonIcon";
import ButtonLinear from "components/Buttons/ButtonLinear";
import ButtonText from "components/Buttons/ButtonText";
import { useTheme } from "configs/Theme";
import Content from "components/Layout/Content";
import Layout from "components/Layout/Layout";

const WORKING_DAY = {
  from: "01/01/2020",
  to: "03/01/2020",
  includeHoliday: true,
};
const WORKING_TIME = [
  {
    id: 0,
    from: "08:00 AM",
    to: "12:00 PM",
  },
  {
    id: 1,
    from: "02:00 PM",
    to: "21:00 PM",
  },
];

const WORKING_DATE = [
  {
    id: 0,
    date: "M",
    isTrue: true,
  },
  {
    id: 1,
    date: "T",
    isTrue: true,
  },
  {
    id: 2,
    date: "W",
    isTrue: true,
  },
  {
    id: 3,
    date: "T",
    isTrue: true,
  },
  {
    id: 4,
    date: "S",
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
  const { setOptions, navigate } = useNavigation();
  const [toggle, setToggle] = useState<boolean>(true);
  const [editPrice, setEditPrice] = useState<boolean>(false);
  const [savedServicePrice, setSavedServicePrice] = useState<string>("45");
  const [servicePrice, setServicePrice] = useState<string>("");
  const [includeHoliday, setIncludeHoliday] = useState<boolean>(true);
  const [description, setDescription] = useState<string>(
    "Check available time and schedulean online appointment with doctorand consult via call. "
  );
  const [workingDay, setWorkingDay] = useState<any>([]);

  useFocusEffect(
    useCallback(() => {
      setWorkingDay(WORKING_DAY);
    }, [])
  );

  const onChangePrice = useCallback((text: string) => {
    return setServicePrice(text);
  }, []);

  const onSaveEdit = () => {
    setSavedServicePrice(servicePrice);
    setEditPrice(!editPrice);
  };

  const onChangeDescription = useCallback((text: string) => {
    return setDescription(text);
  }, []);

  const onSwitch = () => {
    setToggle(!toggle);
  };

  const toggleEditPrice = () => {
    setServicePrice(savedServicePrice);
    setEditPrice(!editPrice);
  };

  const onEditWorking = () => {
    navigate(Routes.SetWorkingDay);
  };
  const { theme } = useTheme();

  useLayoutEffect(() => {
    setOptions({
      title: null,
      headerStyle: {
        shadowColor: "transparent",
        backgroundColor: theme.background,
        elevation: 0,
      },
      headerLeft: () => <ButtonIconHeader marginLeft={24} />,
    });
  });
  return (
    <Content
      style={styles.container}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
    >
      <View style={Theme.flexRowSpace}>
        <Text bold size={24} marginTop={24} marginLeft={24}>
          Online Appointment
        </Text>
        <Switch style={styles.switch} value={toggle} onValueChange={onSwitch} />
      </View>
      {toggle ? (
        <View>
          <Text right marginRight={36}>
            Open
          </Text>
          <Layout style={styles.content}>
            {editPrice ? (
              <View>
                <Text marginBottom={8}>Service Price ($)</Text>
                <View style={Theme.flexRowSpace}>
                  <TextInput
                    editable
                    onChangeText={onChangePrice}
                    value={servicePrice}
                    style={styles.editPrice}
                    keyboardType="number-pad"
                  />
                  <ButtonLinear
                    white
                    style={styles.buttonSave}
                    title={"Save"}
                    onPress={onSaveEdit}
                  />
                  <ButtonText
                    style={styles.buttonCancel}
                    title={"Cancel"}
                    titleColor={Colors.GrayBlue}
                    onPress={toggleEditPrice}
                  />
                </View>
              </View>
            ) : (
              <View style={{ ...Theme.flexRowSpace, height: 50 }}>
                <View style={{ height: 50 }}>
                  <Text marginBottom={8}>Service Price</Text>
                  <View style={Theme.flexRow}>
                    <Text>$ </Text>
                    <Text bold size={15}>
                      {savedServicePrice}
                    </Text>
                    <Text> / 30 mins</Text>
                  </View>
                </View>
                <ButtonIcon icon={"edit"} onPress={toggleEditPrice} />
              </View>
            )}
            <Text marginTop={24} marginVertical={8}>
              Consulted
            </Text>
            <View style={Theme.flexRow}>
              <Text size={17} bold marginRight={2}>
                234
              </Text>
              <Text>times</Text>
            </View>

            <View style={styles.contentView}>
              <View style={Theme.flexRowSpace}>
                <Text bold size={15} marginTop={8}>
                  Working Day & Time
                </Text>
                <ButtonIcon icon={"edit"} onPress={onEditWorking} />
              </View>

              <View>
                <Text size={15} marginTop={10} marginBottom={12}>
                  Day
                </Text>
                <View style={{ ...Theme.flexRow }}>
                  {WORKING_DATE.map((item, index) => {
                    const { date, isTrue } = item;
                    return (
                      <View style={Theme.flexRow} key={index}>
                        {isTrue ? (
                          <View
                            style={{
                              height: 24,
                              width: 24,
                              borderRadius: 6,
                              backgroundColor: Colors.TealBlue,
                              ...Theme.center,
                              marginRight: 8,
                              marginBottom: 12,
                            }}
                          >
                            <Text color={Colors.White} center lineHeight={16}>
                              {date}
                            </Text>
                          </View>
                        ) : (
                          <View></View>
                        )}
                      </View>
                    );
                  })}
                </View>
                <View style={Theme.flexRow}>
                  <Text>Apply from </Text>
                  <Text bold>{workingDay.from}</Text>
                  <Text> to </Text>
                  <Text bold>{workingDay.to}</Text>
                </View>
                {includeHoliday ? (
                  <Text>Included holidays</Text>
                ) : (
                  <View></View>
                )}
              </View>
              <View>
                <Text size={15} marginTop={24}>
                  Time
                </Text>
                {WORKING_TIME.map((item, index) => {
                  const { from, to } = item;
                  return (
                    <View
                      key={index}
                      style={{ ...Theme.flexRow, marginTop: 16 }}
                    >
                      <Text>
                        {from} - {to}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>

            <View style={styles.contentView}>
              <Text marginBottom={4}>Description</Text>
              <TextInput
                multiline
                editable
                value={description}
                textAlignVertical="top"
                onChangeText={onChangeDescription}
                style={{
                  padding: 16,
                  height: 170,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: Colors.WhiteSmoke,
                  lineHeight: 24,
                  fontWeight: "600",
                }}
              />
              <Text right color={Colors.GrayBlue} marginTop={8} size={11}>
                {description.length}/200
              </Text>
            </View>
          </Layout>
        </View>
      ) : (
        <Text right marginRight={36}>
          Close
        </Text>
      )}
    </Content>
  );
});

const styles = StyleSheet.create({
  container: {
    height: height,
  },
  switch: {
    marginTop: 24,
    marginRight: 24,
    justifyContent: "center",
  },
  content: {
    marginTop: 20,
    marginHorizontal: 24,
    padding: 24,
    borderRadius: 12,
    shadowOffset: { width: 5, height: 5 },
  },
  buttonSave: {
    width: 100,
    height: 50,
    marginTop: 0,
  },
  buttonCancel: {
    width: 100,
    height: 50,
    borderColor: Colors.Snow,
  },
  editPrice: {
    width: 100,
    height: 48,
    marginRight: 20,
    borderColor: Colors.DodgerBlue,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  contentView: {
    borderTopColor: Colors.WhiteSmoke,
    borderTopWidth: 1,
    marginTop: 24,
    paddingTop: 24,
  },
});
