import React, { memo, useLayoutEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Text from "components/Text";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "configs";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import SearchBox from "components/Home/SearchBox";
import Theme from "style/Theme";
import Container from "components/Layout/Container";

interface SearchMedicationProps {
  close: () => void;
  onPressItem: (item: { id: number; name: string }) => void;
  openAdd: () => void;
}

const searchRecord = [
  {
    id: 0,
    name: "Acyclovir",
  },
];

const SearchMedication = memo((props: SearchMedicationProps) => {
  const [searchKeyMedication, setSearchKeyMedication] = useState("");

  return (
    <Container style={styles.container}>
      <View
        style={{
          backgroundColor: Colors.White,
          paddingBottom: 12,
          paddingHorizontal: 24,
          ...Theme.flexRow,
          paddingTop: getStatusBarHeight() + 16,
        }}
      >
        <SearchBox
          placeholder={"Search medication"}
          borderColor={Colors.TealBlue}
          value={searchKeyMedication}
          onChangeText={setSearchKeyMedication}
          style={{ ...Theme.flexOne, marginTop: 0 }}
        />
        <TouchableOpacity
          style={{
            marginRight: -8,
            padding: 8,
            marginLeft: 16,
          }}
          onPress={props.close}
        >
          <Text color={Colors.DodgerBlue} size={15} bold>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ paddingVertical: 24 }}>
        {searchRecord.map((item) => {
          const onPress = () => {
            props.onPressItem(item);
            props.close();
            props.openAdd();
          };
          return (
            <TouchableOpacity
              key={item.id.toString()}
              activeOpacity={0.54}
              style={{
                paddingHorizontal: 24,
                paddingVertical: 12,
                borderBottomColor: Colors.Isabelline,
                borderBottomWidth: 1,
              }}
              {...{ onPress }}
            >
              <Text size={15} lineHeight={24}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Container>
  );
});

export default SearchMedication;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
