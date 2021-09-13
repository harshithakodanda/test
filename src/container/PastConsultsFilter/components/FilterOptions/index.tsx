import React, { memo, useCallback } from "react";
import { View, StyleSheet, ImageSourcePropType } from "react-native";
import Text from "components/Text";
import CheckItem from "./CheckItem";

export interface ItemOption {
  title: string;
  type?: string;
  img?: ImageSourcePropType;
  id: number;
}

interface FilterOptionsProps {
  title: string;
  options: ItemOption[];
  allTitle: string;
  type?: boolean;
  chooseId: ItemOption[];
  onPressItem: (item: ItemOption) => void;
  onPressAll: () => void;
}

const FilterOptions = memo((props: FilterOptionsProps) => {
  return (
    <View style={styles.container}>
      <Text size={15} lineHeight={24} bold>
        {props.title}
      </Text>
      <CheckItem
        id={0}
        title={props.allTitle}
        type={props.type ? "type" : undefined}
        isCheck={props.options.length === props.chooseId.length}
        onCheck={props.onPressAll}
      />
      {props.options.map((item) => {
        let isCheck = false;

        const findIndex = props.chooseId.findIndex((i) => i.id === item.id);
        if (findIndex >= 0) {
          isCheck = true;
        } else {
          isCheck = false;
        }
        return (
          <CheckItem
            {...item}
            onCheck={props.onPressItem}
            isCheck={isCheck}
            key={item.id}
          />
        );
      })}
    </View>
  );
});

export default FilterOptions;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    marginTop: 32,
  },
});
