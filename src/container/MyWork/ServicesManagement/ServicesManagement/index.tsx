import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ButtonIconHeader from "components/ButtonIconHeader";
import { Colors, Routes } from "configs";
import React, { memo, useCallback, useLayoutEffect, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Text from "components/Text";
import { SOURCE_ICON } from "images";
import ServicesManagementItem from "components/ServiceManagementItem";
import { FlatList } from "react-native-gesture-handler";
import keyExtractor from "utils/keyExtractor";
import { height } from "configs/Const";
import { useTheme } from "configs/Theme";
import Container from "components/Layout/Container";

const ServicesManagementData = [
  {
    id: 0,
    icon: SOURCE_ICON.typeMessage,
    name: "Send Message",
    description:
      "",
    price: "",
    route: Routes.SendMessage,
  },

];

export default memo(() => {
  const { setOptions, navigate } = useNavigation();
  const [service, setService] = useState<any>([]);

  useFocusEffect(
    useCallback(() => {
      setService(ServicesManagementData);
    }, [])
  );
  const { theme } = useTheme();

  React.useLayoutEffect(() => {
    setOptions({
      title: null,
      headerStyle: {
        shadowColor: "transparent",
        backgroundColor: theme.background,
      },
      headerLeft: () => <ButtonIconHeader marginLeft={24} />,
      headerRight:() =><TouchableOpacity
      style={[
        styles.container,
      ]}
      activeOpacity={0.54}
    >
      <Image
        source={require("images/smallLogo.png")}
       style={{height:40,width:40, margin:10}}
      />
    </TouchableOpacity>,
    });
  }, [setOptions]);

  const renderServiceManagementItem = useCallback(({ item }) => {
    return <ServicesManagementItem {...item} />;
  }, []);

  return (
    <Container style={styles.container}>
      <Text
        marginTop={24}
        marginHorizontal={24}
        marginBottom={0}
        bold
        size={24}
      >
        EMI Calculator
      </Text>
      <Text size={15} lineHeight={22}  style={styles.boxInput1}>
      No need to browse multiple websites for calculating interest rates and monthly repayments.  All required EMI calculators are in one place
        </Text>
      <FlatList
        data={service}
        renderItem={renderServiceManagementItem}
        keyExtractor={keyExtractor}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingBottom: 24,
        }}
      />
    </Container>
  );
});
const styles = StyleSheet.create({
  container: {
    height: height,
  },
  imageLeft: {
    position: "absolute",
    top: 24,
    left: 24,
  },
  imageRight: {
    position: "absolute",
    top: 24,
    right: 24,
  },
  contentView: {
    backgroundColor: Colors.White,
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 16,
    paddingVertical: 24,
    paddingLeft: 64,
  }, 
  boxInput1:{
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginHorizontal: 0,
    borderRadius: 10,
    shadowRadius: 10,
    textAlign:"justify"
  },
});
