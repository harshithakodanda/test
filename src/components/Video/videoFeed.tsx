import React, { memo, useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet, Modal } from "react-native";
import Text from "components/Text";
import { Colors, Routes } from "configs";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Theme from "style/Theme";
import ButtonIconHeader from "components/ButtonIconHeader";
import { SOURCE_ICON } from "images";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import TrendingTopicItem from "container/Search/components/TrendingTopicItem";
import { HEALTH_FEED_DATA, TRENDING_TOPICS_DATA } from "configs/Data";
import keyExtractor from "utils/keyExtractor";
import HealthFeedItem from "components/HealthFeed/HealthFeedItem";
import { getBottomSpace } from "react-native-iphone-x-helper";
import useModalWithKeyboard from "hooks/useModalWithKeyboard";
import ModalSelect from "components/ModalSelect";
import { HEALTH_FEED_CREATE_OPTION } from "configs/Const";
import Container from "components/Layout/Container";
import Layout from "components/Layout/Layout";
import Content from "components/Layout/Content";
import { useTheme } from "configs/Theme";
import axios from 'axios'

interface props{
  url:string
  horizontal:boolean
}

export default memo(({url,horizontal}:props) => {
  const { setOptions, navigate } = useNavigation();
  const [trendingList, setTrendingList] = useState<any>([]);
  const [healthFeed, setHealthFeed] = React.useState<any>([]);
  const { theme } = useTheme();

  const {
    visible: visibleMenuOption,
    open: openMenuOption,
    close: closeMenuOption,
  } = useModalWithKeyboard(false);

  const getVideos = async()=>{
    const response = await axios.get(url)
    setTrendingList(response.data)
  }

  useEffect(()=>{
    getVideos()
  },[])

  useFocusEffect(
    React.useCallback(() => {
      setHealthFeed(HEALTH_FEED_DATA);
    }, [])
  );

  const handlePressSearch = React.useCallback(() => {}, []);


  useLayoutEffect(() => {
    setOptions({
      title: false,
      headerStyle: Theme.headerStyle,
      headerBackground: () => (
        <Container style={{ ...Theme.headerBackGround }} />
      ),
      headerLeft: () => <ButtonIconHeader marginLeft={24} />,
      headerRight: () => (
        <View style={{ marginRight: 24, ...Theme.flexRow }}>
          <ButtonIconHeader
            icon={SOURCE_ICON.search}
            tintColor={Colors.DodgerBlue}
            borderColor={Colors.DodgerBlue}
            onPress={handlePressSearch}
          />
          <ButtonIconHeader
            marginLeft={24}
            icon={SOURCE_ICON.plus}
            tintColor={Colors.DodgerBlue}
            borderColor={Colors.DodgerBlue}
            onPress={openMenuOption}
          />
        </View>
      ),
    });
  }, [setOptions, openMenuOption]);

  const handlePressTopicItem = (item: any) => {
     
    navigate(Routes.VideoPlayer, item);
  };

  const listHeaderComponent = React.useCallback(() => {
    return (
      <>
        <ScrollView
          horizontal = {horizontal}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={styles.contentStyle}
        >
          {trendingList.map((item: any, index: number) => (
            <TrendingTopicItem
              onPress={() => handlePressTopicItem(item)}
              key={index}
              {...item}
            />
          ))}
        </ScrollView>
      </>
    );
  }, [trendingList, handlePressTopicItem]);

  const handlePressItem = (item: any) => {
    navigate(Routes.TipDetail, item);
  };

  const renderItem = React.useCallback(({ item }) => {
    return (
      <HealthFeedItem
        onPress={() => handlePressItem(item)}
        style={styles.healthFeedItem}
        {...item}
      />
    );
  }, []);

  return (
    <Container style={styles.container}>
      <FlatList
        data={healthFeed}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        scrollEventThrottle={16}
        ListHeaderComponent={listHeaderComponent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
      />

    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentStyle: {
    paddingLeft: 24,
    marginTop: 24,
  },
  healthFeedItem: {
    marginTop: 24,
    marginHorizontal: 16,
    borderRadius:16
  },
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + 16,
  },
});
