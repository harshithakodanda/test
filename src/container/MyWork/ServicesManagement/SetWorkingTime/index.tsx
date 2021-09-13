import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ButtonIconHeader from "components/ButtonIconHeader";
import { Colors, Routes } from "configs";
import { SOURCE_ICON } from "images";
import React, { memo, useCallback, useLayoutEffect, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Text from "components/Text";
import { height, width } from "configs/Const";
import ButtonLinear from "components/Buttons/ButtonLinear";
import SetWorkingTimeItem from "components/SetWorkingTimeItem";
import Theme from "style/Theme";
import { FlatList } from "react-native-gesture-handler";
import keyExtractor from "utils/keyExtractor";
import { useTheme } from "configs/Theme";
import Container from "components/Layout/Container";

const ListWorkingTime = [
  {
    id: 0,
    isDefault: true,
  },
];

export default memo(() => {
  const { setOptions, navigate } = useNavigation();
  const [listTime, setListTime] = useState<any>([]);
  const { theme } = useTheme();

  useFocusEffect(
    useCallback(() => {
      setListTime(ListWorkingTime);
    }, [])
  );

  const onSaveSettings = () => {
    navigate(Routes.OnlineAppointment);
  };

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

  const handleAddTime = React.useCallback(() => {
    let time = { id: listTime.length };
    setListTime([...listTime, time]);
  }, [listTime]);

  const renderWorkItem = useCallback(({ item }) => {
    return <SetWorkingTimeItem {...item} />;
  }, []);

  return (
    <Container style={styles.container}>
      <View>
        <Text marginVertical={16}>Step 2 of 2</Text>
        <Text bold size={24} marginBottom={16}>
          Setting Working Time
        </Text>

        <FlatList
          keyExtractor={keyExtractor}
          data={listTime}
          renderItem={renderWorkItem}
          contentContainerStyle={{}}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        />

        <TouchableOpacity
          style={styles.addTime}
          activeOpacity={0.54}
          onPress={handleAddTime}
        >
          <Image source={SOURCE_ICON.plus} width={18} height={18} />
          <Text marginLeft={11} bold size={15} color={Colors.GrayBlue}>
            Add Available Time
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.button}>
        <ButtonLinear title="Save Settings" onPress={onSaveSettings} white />
      </View>
    </Container>
  );
});
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    height: "100%",
  },
  button: {
    position: "absolute",
    bottom: 0,
    width: width,
    padding: 24,
  },
  addTime: {
    height: 50,
    borderColor: Colors.Platinum,
    borderWidth: 1,
    borderRadius: 12,
    ...Theme.flexRow,
    justifyContent: "center",
    marginTop: 32,
  },
});
