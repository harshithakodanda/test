import React, { memo, useCallback, useLayoutEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "configs";
import ButtonIconHeader from "components/ButtonIconHeader";
import Theme from "style/Theme";
import WriteAnswer from "./components/WriteAnswer";
import OtherAnswer from "./components/OtherAnswer";
import Footer from "./components/Footer";
import keyExtractor from "utils/keyExtractor";
import MyAnswer from "./components/MyAnswer";
import { useTheme } from "configs/Theme";
import scale from "utils/scale";

interface FreeConsultDetailProps {}

const FreeConsultDetail = memo(({}: FreeConsultDetailProps) => {
  const { setOptions } = useNavigation();
  const [dataAnswer, setDataAnswer] = useState<any[]>(dataDetail);
  const onPressFollow = useCallback(() => {}, []);
  const onPressShare = useCallback(() => {}, []);
  const { theme } = useTheme();
  useLayoutEffect(() => {
    setOptions({
      title: null,
      headerStyle: {
        shadowColor: "transparent",
        height: scale(108),
        backgroundColor: theme.backgroundItem,
      },
      headerLeft: () => <ButtonIconHeader marginLeft={24} />,
      headerRight: () => (
        <View style={{ marginRight: 24, ...Theme.flexRow }}>
          <ButtonIconHeader
            icon={require("images/ic_followed.png")}
            borderColor={Colors.DodgerBlue}
            backgroundColor={Colors.DodgerBlue}
            onPress={onPressFollow}
          />
          <ButtonIconHeader
            marginLeft={24}
            icon={require("images/ic_share.png")}
            tintColor={Colors.DodgerBlue}
            borderColor={Colors.DodgerBlue}
            onPress={onPressShare}
          />
        </View>
      ),
    });
  }, []);

  const renderItem = useCallback(({ item }) => {
    if (item.myAnswer) {
      return <MyAnswer {...item} />;
    }
    return <OtherAnswer {...item} />;
  }, []);

  const [myAnswer, setMyAnswer] = useState("");
  const onAnswer = useCallback(() => {
    setDataAnswer((prev) => [
      {
        id: prev.length,
        doctor: {
          name: "Martin Wallace",
          faculty: "Allergy & Immunology",
          rate: 4.8,
          numberOfReviews: 753,
          avatar: require("images/avatar/sarah.png"),
        },
        image: require("images/down.png"),
        answer: myAnswer,
        numberAgreed: 125,
        numberThanks: 125,
        myAnswer: true,
      },
      ...prev,
    ]);
    setMyAnswer("");
  }, [myAnswer]);

  return (
    <FlatList
      ListHeaderComponent={
        <WriteAnswer {...{ myAnswer, setMyAnswer, onAnswer }} />
      }
      data={dataAnswer}
      renderItem={renderItem}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      ListFooterComponent={<Footer />}
      keyExtractor={keyExtractor}
    />
  );
});

export default FreeConsultDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WhiteSmoke,
  },
  contentContainer: {
    padding: 16,
  },
});

const dataDetail = [
  {
    id: 0,
    doctor: {
      name: "Sandra Klevins",
      faculty: "Medical Genetics",
      rate: 4.8,
      numberOfReviews: 753,
      avatar: require("images/avatar/sarah.png"),
    },
    image: require("images/down.png"),
    answer: `Always use your own pen at the doctor's office and not the pen 100's of infected patients touched.`,
    numberAgreed: 125,
    numberThanks: 125,
    agreed: true,
  },
  {
    id: 1,
    doctor: {
      name: "Sandra Klevins",
      faculty: "Internal Medicine",
      rate: 4.8,
      numberOfReviews: 753,
    },
    answer: `If you're sick, limit touching of other people's work environments (phones, keyboards, mouses).`,
    numberAgreed: 2,
    numberThanks: 24,
    agreed: false,
  },
];
