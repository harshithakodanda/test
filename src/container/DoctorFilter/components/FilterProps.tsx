import React, { Dispatch, memo, SetStateAction, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ViewStyle,
} from "react-native";
import Text from "components/Text";
import { Colors } from "configs";
import { SOURCE_ICON } from "images";
import Theme from "style/Theme";

interface Props {
  style?: ViewStyle;
  title: string;
  placeholder: string;
  value: string;
  onChangeText: Dispatch<SetStateAction<string>>;
  icon?: string;
}

const FilterProps = memo(
  ({ style, title, placeholder, value, onChangeText, icon }: Props) => {
    const ref: any = useRef();
    return (
      <View style={[styles.container, style]}>
        <Text size={15} lineHeight={18} bold>
          {title}
        </Text>
        <View style={[styles.input]}>
          <Image
            source={SOURCE_ICON[icon || "search"]}
            style={{ tintColor: Colors.GrayBlue }}
          />
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={Colors.GrayBlue}
            style={{
              fontSize: 13,
              lineHeight: 16,
              flex: 1,
              marginLeft: 16,
            }}
            value={value}
            returnKeyType={"search"}
            onChangeText={onChangeText}
            ref={ref}
          />
          {!!value && value.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                ref.current.clear();
              }}
            >
              <Image source={SOURCE_ICON["reset-search"]} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
);

export default FilterProps;

const styles = StyleSheet.create({
  container: {},
  input: {
    ...Theme.flexRow,
    height: 48,
    backgroundColor: Colors.Isabelline,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginTop: 24,
  },
});
