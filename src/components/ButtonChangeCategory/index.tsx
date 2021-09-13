import React, { memo, useCallback } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Text from "components/Text";
import Theme from "style/Theme";
import { Colors } from "configs";
import { categoryList } from "type/category";

interface ButtonChangeCategoryProps {
  category: categoryList;
  onPress: () => void;
}

const ButtonChangeCategory = memo((props: ButtonChangeCategoryProps) => {
  const { category } = props;
  const onShowModal = useCallback(() => {
    props.onPress && props.onPress();
  }, [props.onPress]);
  return (
    <TouchableOpacity style={styles.categoryList} onPress={onShowModal}>
      <Text
        size={15}
        lineHeight={24}
        marginLeft={8}
        color={Colors.DarkJungleGreen}
      >
        {category.name}
      </Text>
      <View style={styles.changeCategory}>
        <Image source={require("images/down.png")} />
      </View>
    </TouchableOpacity>
  );
});

export default ButtonChangeCategory;

const styles = StyleSheet.create({
  container: {},
  categoryList: {
    width: "100%",
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.Isabelline,
    backgroundColor: Colors.White,
    ...Theme.flexRow,
    paddingHorizontal: 16,
  },
  phoneView: {
    ...Theme.flexRow,
    marginTop: 4,
  },
  changeCategory: {
    position: "absolute",
    right: 16,
    alignSelf: "center",
  },
});
