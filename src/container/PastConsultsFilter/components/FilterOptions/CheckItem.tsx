import React, { useCallback } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import Text from "components/Text";
import { Colors } from "configs";
import Theme from "style/Theme";
import { ItemOption } from ".";
import Layout from "components/Layout/Layout";

interface CheckItemProps {
  title: string;
  isCheck: boolean;
  type?: string;
  onCheck: (item: ItemOption) => void;
  id: number;
  img?: ImageSourcePropType;
}

const CheckItem = (props: CheckItemProps) => {
  const onPress = useCallback(() => {
    props.onCheck && props.onCheck({ id: props.id, title: props.title });
  }, [props.id, props.onCheck]);
  return (
    <Layout style={styles.container}>
      <TouchableOpacity
        style={{ ...Theme.flexRowSpace, marginTop: 32 }}
        activeOpacity={0.54}
        onPress={onPress}
      >
        <View style={Theme.flexRow}>
          {!!props.type && (
            <View style={{ ...Theme.icons, marginRight: 16 }}>
              {props.img && <Image source={props.img} />}
            </View>
          )}
          <Text size={15} lineHeight={24}>
            {props.title}
          </Text>
        </View>

        {props.isCheck ? (
          <Image source={require("images/ic_radio_active.png")} />
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
      </TouchableOpacity>
    </Layout>
  );
};

export default CheckItem;

const styles = StyleSheet.create({
  container: {},
});
