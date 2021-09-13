import React, { useCallback, useLayoutEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Text from "components/Text";
import { useNavigation } from "@react-navigation/native";
import ButtonIconHeader from "components/ButtonIconHeader";
import { Colors, Routes } from "configs";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import Theme from "style/Theme";
import InputApp from "components/InputApp";
import FilterOptions from "./components/FilterOptions";
import ButtonLinear from "components/Buttons/ButtonLinear";
import GenderFilter from "components/GenderFilter";
import { useTheme } from "configs/Theme";
import Layout from "components/Layout/Layout";

interface PastConsultsFilterProps {}
const filterModel = {
  status: [
    {
      id: 1,
      title: "Completed",
    },
    {
      id: 2,
      title: "I declined",
    },
    {
      id: 3,
      title: "I canceled",
    },
    {
      id: 4,
      title: "Patient canceled",
    },
  ],
  type: [
    {
      id: 1,
      title: "Message",
      type: "Message",
      img: require("images/ic_type_message.png"),
    },
    {
      id: 2,
      title: "Live Chat",
      img: require("images/ic_type_live_chat.png"),
      type: "Live Chat",
    },
    {
      id: 3,
      title: "Voice Chat",
      img: require("images/ic_type_call.png"),
      type: "Voice Chat",
    },
    {
      id: 4,
      title: "Video Call",
      img: require("images/ic_type_video.png"),
      type: "Video Call",
    },
  ],
};

const PastConsultsFilter = (props: PastConsultsFilterProps) => {
  const { setOptions, navigate } = useNavigation();
  const { theme } = useTheme();
  const onResetAll = () => {};
  useLayoutEffect(() => {
    setOptions({
      title: "Filter",
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
        <TouchableOpacity
          style={{ marginRight: 16, padding: 8 }}
          onPress={onResetAll}
        >
          <Text color={Colors.DodgerBlue} size={15} bold>
            Reset All
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [setOptions]);

  const [selectedStatus, setSelectedStatus] = useState<
    {
      title: string;
      type?: string;
      id: number;
    }[]
  >(filterModel.status);
  const onPressStatus = useCallback(
    (item: { title: string; type?: string; id: number }) => {
      setSelectedStatus((prev) => {
        const findIndex = prev.findIndex((i) => i.id === item.id);
        if (findIndex >= 0) {
          return prev.filter((i) => i.id !== item.id);
        }
        return [...prev, item];
      });
    },
    []
  );
  const [selectedType, setSelectedType] = useState<
    {
      title: string;
      type?: string;
      id: number;
    }[]
  >(filterModel.type);
  const onPressType = useCallback(
    (item: { title: string; type?: string; id: number }) => {
      setSelectedType((prev) => {
        const findIndex = prev.findIndex((i) => i.id === item.id);
        if (findIndex >= 0) {
          return prev.filter((i) => i.id !== item.id);
        }
        return [...prev, item];
      });
    },
    []
  );

  const [genderFilter, setGenderFilter] = useState([1, 2]);

  const onPressFilter = useCallback((gender: number) => {
    setGenderFilter((prev) => {
      const findGender = prev.findIndex((i) => i === gender);
      if (findGender >= 0) {
        return prev.filter((o) => o !== gender);
      } else {
        return [...prev, gender];
      }
    });
  }, []);

  const onPressAllGender = useCallback(() => {
    setGenderFilter((prev) => {
      return [1, 2];
    });
  }, []);

  const onPressAllStatus = useCallback(() => {
    setSelectedStatus((prev) => filterModel.status);
  }, []);
  const onPressAllType = useCallback(() => {
    setSelectedType((prev) => filterModel.type);
  }, []);
  const onShowConsults = useCallback(() => {
    navigate(Routes.Consult);
  }, []);

  return (
    <Layout style={styles.container}>
      <ScrollView contentContainerStyle={Theme.paddingBottom}>
        <FilterOptions
          options={filterModel.status}
          chooseId={selectedStatus}
          onPressItem={onPressStatus}
          allTitle={"All Status"}
          title={"Consults Status"}
          onPressAll={onPressAllStatus}
        />
        <FilterOptions
          options={filterModel.type}
          chooseId={selectedType}
          onPressItem={onPressType}
          allTitle={"All Type"}
          title={"Consults Type"}
          type={true}
          onPressAll={onPressAllType}
        />
        <View
          style={{ paddingHorizontal: 24, paddingBottom: 24, marginTop: 32 }}
        >
          <Text size={15} lineHeight={24} semiBold>
            Date Range
          </Text>
          <View style={{ ...Theme.flexRow, marginTop: 16 }}>
            <InputApp
              title={"Form"}
              value={"12/01/2019"}
              iconLeft={
                <Image
                  source={require("images/ic_calendar.png")}
                  style={Theme.icons}
                />
              }
              editable={false}
              onPress={() => {}}
              styleView={{ ...Theme.flexOne, marginRight: 8 }}
              isShowIconLeft
            />
            <InputApp
              title={"To"}
              value={"01/05/2020"}
              iconLeft={
                <Image
                  source={require("images/ic_calendar.png")}
                  style={Theme.icons}
                />
              }
              editable={false}
              onPress={() => {}}
              styleView={{ ...Theme.flexOne, marginLeft: 8 }}
              isShowIconLeft
            />
          </View>
        </View>
        <GenderFilter
          genderFilter={genderFilter}
          onPressFilter={onPressFilter}
          onPressAll={onPressAllGender}
        />
        <ButtonLinear
          white
          title={"Show 45+ consults"}
          style={{ marginHorizontal: 24 }}
          onPress={onShowConsults}
        />
      </ScrollView>
    </Layout>
  );
};

export default PastConsultsFilter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
