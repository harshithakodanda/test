import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import Text from "components/Text";
import Theme from "style/Theme";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { Colors } from "configs";
import ButtonIconHeader from "components/ButtonIconHeader";
import Layout from "components/Layout/Layout";

interface ShareDoctorProps {}

const ShareDoctor = memo(() => {
  return (
    <Container style={styles.container}>
      <Layout style={styles.header}>
        <ButtonIconHeader />
      </Layout>
    </Container>
  );
});

export default ShareDoctor;

const styles = StyleSheet.create({
  container: {
    ...Theme.container,
  },
  header: {
    ...Theme.flexRowSpace,
    paddingTop: getStatusBarHeight(),
    height: 108 - getStatusBarHeight(),
  },
});
