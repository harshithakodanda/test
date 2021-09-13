import React, { memo, useLayoutEffect, useState, useCallback } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import Text from "components/Text";
import { Colors, Routes } from "configs";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import ButtonIconHeader from "components/ButtonIconHeader";
import { useNavigation } from "@react-navigation/native";
import Theme from "style/Theme";
import ButtonLinear from "components/Buttons/ButtonLinear";
import { themes, useTheme } from "configs/Theme";
import scale from "utils/scale";
import Container from "components/Layout/Container";
import Layout from "components/Layout/Layout";

interface CallReportProblemProps {}

const reasons = [
  {
    id: 1,
    reason: `The patient's phone busy`,
  },
  {
    id: 2,
    reason: `The patient don't pick up`,
  },
  {
    id: 3,
    reason: `Can't connect with patient`,
  },
];

const CallReportProblem = memo((props: CallReportProblemProps) => {
  const { theme } = useTheme();
  const [selectedReason, selectReason] = useState(-1);
  const { setOptions, navigate } = useNavigation();
  useLayoutEffect(() => {
    setOptions({
      title: "Report Problem",
      headerStyle: {
        shadowColor: "transparent",
        height: scale(108),
        backgroundColor: theme.backgroundItem,
      },
      headerLeft: () => (
        <ButtonIconHeader
          marginLeft={24}
          icon={require("images/ic_close.png")}
          onPress={() => {
            navigate(Routes.MainTab);
          }}
        />
      ),
    });
  }, [setOptions, navigate]);

  const onCancelRequest = useCallback(() => {}, []);
  const onConsultLater = useCallback(() => {
    navigate(Routes.Consult);
  }, [navigate]);

  return (
    <Layout style={styles.container}>
      <Text size={15} lineHeight={18} marginTop={40} bold marginBottom={40}>
        Tell us the problem
      </Text>
      {reasons.map((item, index) => {
        const onPress = () => {
          selectReason(item.id);
        };
        return (
          <TouchableOpacity
            style={[
              Theme.flexRowSpace,
              index !== reasons.length - 1 && styles.bottomSpace,
            ]}
            key={item.id.toString()}
            onPress={onPress}
            activeOpacity={0.54}
          >
            <Text size={15} lineHeight={24} semiBold>
              {item.reason}
            </Text>
            <View style={{ ...Theme.icons, ...Theme.center }}>
              {item.id === selectedReason ? (
                <Image source={require("images/ic_checkbox_active.png")} />
              ) : (
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderColor: "#979797",
                    borderRadius: 3,
                    borderWidth: 1,
                  }}
                />
              )}
            </View>
          </TouchableOpacity>
        );
      })}
      <Text center size={15} lineHeight={24} marginTop={40}>
        If you don't want to keep this consult. {"\n"}You can{" "}
        <Text
          size={15}
          lineHeight={24}
          color={Colors.DodgerBlue}
          onPress={onCancelRequest}
        >
          cancel request.
        </Text>
      </Text>
      {selectedReason !== -1 && (
        <ButtonLinear
          white
          title={"Consult Later"}
          style={{ marginTop: 40 }}
          onPress={onConsultLater}
        />
      )}
    </Layout>
  );
});

export default CallReportProblem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  headerTitle: {
    justifyContent: "flex-end",
    flex: 1,
  },
  bottomSpace: {
    marginBottom: 32,
  },
});
