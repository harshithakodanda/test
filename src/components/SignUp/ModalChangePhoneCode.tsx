import React, { memo, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Text from "components/Text";
import TextInput from "components/TextInput";
import scale from "utils/scale";
import { phonesAreaCodes } from "configs/Data";
import Theme from "style/Theme";
import { Colors } from "configs";
import { TcodeArea } from "type/codeArea";
import { useTheme } from "configs/Theme";

interface ModalChangePhoneCodeProps {
  onChangeCode: (item: TcodeArea) => void;
}

const ModalChangePhoneCode = memo((props: ModalChangePhoneCodeProps) => {
  const { theme } = useTheme();
  const [keyword, setKeyword] = useState("");
  const renderItem = useCallback(
    ({ item }) => {
      const onPress = () => {
        props.onChangeCode && props.onChangeCode(item);
      };
      return (
        <TouchableOpacity style={styles.item} onPress={onPress}>
          <Image source={item.img} style={styles.flag} />
          <Text
            size={15}
            lineHeight={24}
            color={Colors.DarkJungleGreen}
            style={styles.textCode}
          >
            {item.code}
          </Text>
          <Text size={15} lineHeight={24} color={Colors.DarkJungleGreen}>
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    },
    [props.onChangeCode]
  );
  return (
    <View style={styles.container}>
      <TextInput
        iconLeft={
          <Image
            source={require("images/ic_search_normal.png")}
            style={styles.iconSearch}
          />
        }
        backgroundColor={theme.backgroundItem}
        isShowIconLeft={true}
        value={keyword}
        onChangeText={setKeyword}
        borderColor={Colors.Isabelline}
        placeholder={"Enter country name, code..."}
      />
      <FlatList
        data={phonesAreaCodes}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
});

export default ModalChangePhoneCode;

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingHorizontal: 24,
    height: scale(493, true),
  },
  iconSearch: {
    width: 20,
    height: 20,
  },
  item: {
    ...Theme.flexRow,
    paddingVertical: 16,
  },
  flag: {
    width: 32,
    height: 20,
    marginRight: 16,
  },
  textCode: {
    width: 76,
  },
  contentContainerStyle: {
    paddingVertical: 18,
  },
});
