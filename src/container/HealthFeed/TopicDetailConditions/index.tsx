import React, { memo } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Text from "components/Text";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ButtonIconHeader from "components/ButtonIconHeader";
import Theme from "style/Theme";
import { Colors } from "configs";
import { DATA_CONDITIONS } from "configs/Data";
import Container from "components/Layout/Container";
import Layout from "components/Layout/Layout";

export default memo(() => {
  const { setOptions } = useNavigation();
  const [conditions, setConditions] = React.useState<any>([]);

  useFocusEffect(
    React.useCallback(() => {
      setConditions(DATA_CONDITIONS);
    }, [])
  );

  React.useLayoutEffect(() => {
    setOptions({
      title: "Conditions & Symptoms",
      headerLeft: () => <ButtonIconHeader marginLeft={24} />,
      headerStyle: Theme.headerStyle,
      headerBackground: () => <Container style={styles.headerBackground} />,
    });
  }, [setOptions]);

  const renderItem = React.useCallback((item, index) => {
    return (
      <TouchableOpacity key={index.toString()} style={styles.item}>
        <Text size={15} lineHeight={24} color={Colors.DodgerBlue} semiBold>
          {item}
        </Text>
      </TouchableOpacity>
    );
  }, []);

  return (
    <Container style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16}>
        <Layout style={styles.box}>{conditions.map(renderItem)}</Layout>
      </ScrollView>
    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 16,
  },
  item: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.WhiteSmoke,
  },
  headerBackground: {
    flex: 1,
    // backgroundColor: Colors.White,
    shadowColor: "transparent",
  },
});
