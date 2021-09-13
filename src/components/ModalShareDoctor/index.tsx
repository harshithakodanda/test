import React, { memo, useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageSourcePropType,
} from "react-native";
import Text from "components/Text";
import { Colors } from "configs";
import ButtonIconHeader from "components/ButtonIconHeader";
import Theme from "style/Theme";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import SearchBox from "components/Home/SearchBox";
import DoctorItem from "./DoctorItem";
import Container from "components/Layout/Container";
import Layout from "components/Layout/Layout";

interface ModalShareDoctorProps {
  onClose: () => void;
}

const fakeData = [
  {
    id: 0,
    name: "Margaret Wells",
    faculty: "Allergy & Immunology",
    isInNetwork: true
  },
  
];

const ModalShareDoctor = memo((props: ModalShareDoctorProps) => {
  const [searchDoctor, setSearchDoctor] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<{
    id?: number;
    name?: string;
    faculty?: string;
    isInNetwork?: boolean;
    img?: ImageSourcePropType;
  }>({});

  const onShare = useCallback(() => {}, []);
  const onClose = useCallback(() => {
    props.onClose();
  }, []);

  return (
    <Container style={styles.container}>
      <Layout style={styles.header}>
        <ButtonIconHeader
          icon={require("images/ic_close.png")}
          onPress={onClose}
        />
        <Text size={17} lineHeight={20} bold>
          Share Doctor
        </Text>
        <TouchableOpacity onPress={onShare}>
          <Text size={15} color={Colors.DodgerBlue} bold>
            Share
          </Text>
        </TouchableOpacity>
      </Layout>
      <SearchBox
        placeholder="Enter name, speciality..."
        value={searchDoctor}
        onChangeText={setSearchDoctor}
        onSubmitEditing={() => {}}
        borderColor={Colors.Isabelline}
        shadow={false}
        style={{
          backgroundColor: Colors.Isabelline,
          margin: 24,
          marginTop: 24,
          marginBottom: 4,
        }}
      />
      <ScrollView contentContainerStyle={{ paddingVertical: 24 }}>
        <Text
          size={17}
          lineHeight={20}
          bold
          marginLeft={24}
          marginTop={36}
          marginBottom={12}
        >
          My Network
        </Text>
        {fakeData.map((item) => {
          const onPress = () => {
            setSelectedDoctor((prev) => {
              return item;
            });
          };
          const isCheck = item.id === selectedDoctor.id;
          return (
            item.isInNetwork && (
              <DoctorItem
                key={item.id}
                {...item}
                onPress={onPress}
                isCheck={isCheck}
              />
            )
          );
        })}
        <Text
          size={17}
          lineHeight={20}
          bold
          marginLeft={24}
          marginTop={36}
          marginBottom={12}
        >
          Maybe you know
        </Text>
        {fakeData.map((item) => {
          const onPress = () => {
            setSelectedDoctor((prev) => {
              return item;
            });
          };
          const isCheck = item.id === selectedDoctor.id;
          return (
            !item.isInNetwork && (
              <DoctorItem
                key={item.id}
                {...item}
                onPress={onPress}
                isCheck={isCheck}
              />
            )
          );
        })}
      </ScrollView>
    </Container>
  );
});

export default ModalShareDoctor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    ...Theme.flexRowSpace,
    paddingTop: getStatusBarHeight(),
    height: 108,
    paddingHorizontal: 24,
  },
});
