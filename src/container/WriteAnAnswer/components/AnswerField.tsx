import React, { memo } from "react";
import {
  View,
  StyleSheet,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import Text from "components/Text";
import Theme from "style/Theme";
import { Colors } from "configs";
import Prescription from "./Prescription";
import scale from "utils/scale";
import AttachedFiles from "./AttachedFiles";
import ShareInfo from "./ShareInfo";
import { AnswerFieldType } from "type/answerFieldType";
import Container from "components/Layout/Container";
import Layout from "components/Layout/Layout";

interface AnswerFieldProps {
  icon: ImageSourcePropType;
  type: AnswerFieldType;
  title: string;
  information: any;
  onClear: () => void;
}

const AnswerField = memo(
  ({ icon, type, title, information, onClear }: AnswerFieldProps) => {
    return (
      <Container style={styles.container}>
        <View style={Theme.flexRow}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              ...Theme.center,
              backgroundColor: Colors.TealBlue20,
              marginRight: 16,
            }}
          >
            <Image source={icon} style={{ tintColor: Colors.TealBlue }} />
          </View>
          <Text size={17} lineHeight={20} bold>
            {title}
          </Text>
        </View>
        <Layout
          style={{
            marginTop: 24,
            ...Theme.shadow,
            borderRadius: 16,
            padding: 24,
          }}
        >
          <TouchableOpacity
            onPress={onClear}
            style={{ padding: 4, position: "absolute", right: 13, top: 13 }}
          >
            <Image source={require("images/ic_reset_search.png")} />
          </TouchableOpacity>
          {type === AnswerFieldType.prescription && (
            <Prescription {...{ information }} />
          )}
          {type === AnswerFieldType.attachedFiles && (
            <AttachedFiles {...{ information }} />
          )}
          {type === AnswerFieldType.shareInfo && (
            <ShareInfo {...{ information }} />
          )}
        </Layout>
      </Container>
    );
  }
);

export default AnswerField;

const styles = StyleSheet.create({
  container: {
    marginTop: 48,
  },
});
