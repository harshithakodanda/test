import React, { memo, useCallback } from "react";
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  BackHandler,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Container from "components/Layout/Container";

export const HEALTH_GUIDE_SAVED_DETAIL_EXAMPLE_DATA = {
  
};

export default memo(() => {
  const { navigate, goBack } = useNavigation();
  const [healthGuideDetail, setHealthGuideDetail] = React.useState<any>({});
  const { content } = healthGuideDetail;

  const onBackButton = useCallback(() => {
    goBack();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setHealthGuideDetail(HEALTH_GUIDE_SAVED_DETAIL_EXAMPLE_DATA);
    }, [])
  );

  return (
    <Container style={styles.container}>
 
    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
