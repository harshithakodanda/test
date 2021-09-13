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
import { FREQUENCY_LIST_EXAMPLE } from "configs/Data";
import Theme from "style/Theme";
import { Colors } from "configs";
import { FrequencyProps } from "type/category";

interface ModalChangeCategoryProps {
  onChangeCategory: (item: FrequencyProps) => void;
}

export default memo(({ onChangeCategory }: ModalChangeCategoryProps) => {
  const [keyword, setKeyword] = useState("");
  const renderItem = useCallback(
    ({ item }) => {
      const onPress = () => {
        onChangeCategory && onChangeCategory(item);
      };
      return (
        <TouchableOpacity style={styles.item} onPress={onPress}>
          <Text size={15} lineHeight={24} color={Colors.DarkJungleGreen}>
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    },
    [onChangeCategory]
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
        isShowIconLeft={true}
        value={keyword}
        onChangeText={setKeyword}
        backgroundColor={Colors.Isabelline}
        borderColor={Colors.Isabelline}
        placeholder={"Enter category name"}
      />
      <FlatList
        data={FREQUENCY_LIST_EXAMPLE}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
});

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
    paddingHorizontal: 16,
  },
});
