import { Colors } from "configs";
import React, { memo, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import Theme from "style/Theme";
import Text from "components/Text";
import { useTheme } from "configs/Theme";

interface TransactionTypeItemProps {
  id?: number;
  date?: String;
}

export default memo(({ date }: TransactionTypeItemProps) => {
  const { theme } = useTheme();
  const [picked, setPicked] = useState<boolean>(false);
  const onTogglePick = () => {
    setPicked(!picked);
  };
  return (
    <View>
      {picked ? (
        <TouchableOpacity
          activeOpacity={0.54}
          onPress={onTogglePick}
          style={{
            backgroundColor: Colors.ForestGreen,
            height: 40,
            width: 100,
            marginHorizontal: 4,
            marginBottom: 10,
            ...Theme.center,
            borderRadius: 8,
            
          }}
        >
          <Text center color={Colors.White} size={20}>
            {date}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={0.54}
          onPress={onTogglePick}
          style={{
            backgroundColor: Colors.GrayBlue,
            height: 40,
            width: 100,
            marginHorizontal: 4,
            marginBottom: 10,
            ...Theme.center,
            borderRadius: 8,
          }}
        >
          <Text center color={Colors.White} size={20}>
            {date}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
});
