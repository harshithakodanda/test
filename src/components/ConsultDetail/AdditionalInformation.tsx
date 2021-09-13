import React, { memo } from "react";
import {
  View,
  StyleSheet,
  Image,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import Text from "components/Text";
import Theme from "style/Theme";
import { Colors } from "configs";
import AdditionalItem from "./AdditionalItem";
import { consult } from "type/consult";
import Layout from "components/Layout/Layout";
import Line from "components/Layout/Line";

interface AdditionalInformationProps {
  style?: ViewStyle;
  additionalInformation: consult["additionalInformation"];
}

const AdditionalInformation = memo((props: AdditionalInformationProps) => {
  return (
    <Layout style={[styles.container, props.style]}>
      <View
        style={{
          ...Theme.flexRow,
          paddingBottom: 16,

          paddingHorizontal: 24,
        }}
      >
        <View
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            backgroundColor: Colors.TealBlue20,
            ...Theme.center,
            marginRight: 16,
          }}
        >
          <Image source={require("images/ic_additional_information.png")} />
        </View>
        <Text size={15} lineHeight={18} bold>
          Additional Information
        </Text>
      </View>
      <Line />
      <View style={{ paddingHorizontal: 24, paddingTop: 24 }}>
        <AdditionalItem
          title={"Diagnosed Conditions"}
          value={props.additionalInformation.diagnosedConditions?.value}
          time={props.additionalInformation.diagnosedConditions?.time}
        />
        <AdditionalItem
          title={"Medications"}
          value={props.additionalInformation.medications}
        />
        <AdditionalItem
          title={"Allergies"}
          value={props.additionalInformation.allergies}
          isLast
        />
      </View>
    </Layout>
  );
});

export default AdditionalInformation;

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    paddingTop: 16,
    paddingBottom: 24,
    ...Theme.shadow,
  },
});
