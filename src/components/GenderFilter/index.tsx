import { Colors } from "configs";
import React, { memo, useCallback } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Text from "components/Text";
import Container from "components/Layout/Container";

interface GenderFilterProps {
  genderFilter: number[];
  onPressFilter: (gender: number) => void;
  onPressAll: () => void;
}

const GenderFilter = memo((props: GenderFilterProps) => {
  const onMale = useCallback(() => {
    props.onPressFilter && props.onPressFilter(1);
  }, [props.onPressFilter]);
  const onFemale = useCallback(() => {
    props.onPressFilter && props.onPressFilter(2);
  }, [props.onPressFilter]);
  const isCheckMale = props.genderFilter.findIndex((o) => o === 1) >= 0;
  const isCheckFemale = props.genderFilter.findIndex((o) => o === 2) >= 0;
  return (
    <View style={{ paddingBottom: 24, marginTop: 32 }}>
      <Text size={15} lineHeight={24} bold marginHorizontal={24}>
        Gender
      </Text>
      <Container style={styles.container}>
        <TouchableOpacity
          style={[
            styles.genderButton,
            props.genderFilter.length === 2 && styles.buttonActive,
          ]}
          onPress={props.onPressAll}
        >
          <Text
            size={13}
            lineHeight={16}
            color={
              props.genderFilter.length === 2 ? Colors.White : Colors.GrayBlue
            }
            semiBold
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.genderButton, isCheckMale && styles.buttonActive]}
          onPress={onMale}
        >
          <Text
            size={13}
            lineHeight={16}
            semiBold
            color={isCheckMale ? Colors.White : Colors.GrayBlue}
          >
            Male
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.genderButton, isCheckFemale && styles.buttonActive]}
          onPress={onFemale}
        >
          <Text
            size={13}
            lineHeight={16}
            semiBold
            color={isCheckFemale ? Colors.White : Colors.GrayBlue}
          >
            Female
          </Text>
        </TouchableOpacity>
      </Container>
    </View>
  );
});

export default GenderFilter;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 24,
    borderRadius: 8,
    marginHorizontal: 24,
  },
  genderButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonActive: {
    backgroundColor: "#12B2B3",
  },
});
