import React, { memo, useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Text from "components/Text";
import { Colors, Constants, Routes } from "configs";
import Theme from "style/Theme";
import { ConsultsStatus, ConsultsType, width } from "configs/Const";
import { useNavigation } from "@react-navigation/native";
import { consult } from "type/consult";
import { useTheme } from "configs/Theme";
import AddAnswer from "components/AddAnswer/index";
import ButtonIconHeader from "components/ButtonIconHeader";
import { getData } from "storage/store";
import { set } from "react-native-reanimated";
import { ScrollView } from "react-native-gesture-handler";
import { SOURCE_ICON } from "images";
import Layout from "components/Layout/Layout";
import ButtonLinear from "components/Buttons/ButtonLinear";
import TextInput from "components/TextInput";

interface ConsultsItemProps {
  onPress?: () => void;
}

const Item = ({ object, index }) => {
  const { navigate, goBack } = useNavigation();
  const update = () => {
    navigate(Routes.UpdateConsultItem, { object });
  };
  const [archieve, setArchieve] = useState(false);

  return (
    <View style={styles.container}>
      <Layout style={styles.box}>
        <TouchableOpacity onPress={update} activeOpacity={0.54}>
          <View style={{ ...Theme.flexRow, marginTop: 10, marginLeft: 10 }}>
            <TextInput
              editable={false}
              value={object.type}
              style={{ width: 150, paddingLeft: 10, marginRight: 5 }}
            >
              {object.type}
            </TextInput>
            <TextInput
              editable={false}
              value={object.dueDate}
              style={{ width: 150, paddingLeft: 10 }}
            >
              Due Date: {object.dueDate}
            </TextInput>
          </View>
          <View style={{ ...Theme.flexRow, marginTop: 12, marginLeft: 10 }}>
            {object.business == "" ? null : (
              <TextInput
                style={{ width: 150, paddingLeft: 10, marginRight: 5 }}
                editable={false}
                value={object.business}
              >
                {object.business}
              </TextInput>
            )}
            {object.family == "" ? null : (
              <TextInput
                style={{ width: 150, paddingLeft: 10, marginRight: 5 }}
                editable={false}
                value={object.family}
              >
                {object.family}
              </TextInput>
            )}
            {object.financial == "" ? null : (
              <TextInput
                style={{ width: 150, paddingLeft: 10, marginRight: 5 }}
                editable={false}
                value={object.financial}
              >
                {object.financial}
              </TextInput>
            )}
            <TextInput
              editable={false}
              value={""}
              style={{ width: 150, paddingLeft: 10, marginRight: 5 }}
            >
              Progress Upto
            </TextInput>
          </View>
          <View style={{ ...Theme.flexRow, marginTop: 12, marginLeft: 10 }}>
            <TextInput
              editable={false}
              value={object.remarks}
              style={{ width: 150, paddingLeft: 10, marginRight: 5 }}
            >
              Remarks: {object.remarks}
            </TextInput>
          </View>
        </TouchableOpacity>
        {/* </View> */}
      </Layout>
    </View>
  );
};

const ConsultsItem = memo((props: ConsultsItemProps) => {
  const { navigate } = useNavigation();
  const [data, setData] = useState<any>([]);

  const add = () => {
    navigate(Routes.ConsultDetail);
  };
  useEffect(() => {
    getData("goals").then((res) => {
      if (res) setData(res);
    });
  }, []);

  return (
    <View>
      <View style={{ ...Theme.flexRow, marginTop: 12, marginHorizontal: 24 }}>
        <Text
          marginTop={34}
          bold
          size={24}
          lineHeight={28}
          marginLeft={24}
          marginBottom={12}
        >
          Goals
        </Text>
        <ButtonLinear
          style={{
            alignSelf: "flex-end",
            paddingLeft: 10,
            paddingRight: 10,
            marginLeft: 160,
          }}
          onPress={add}
          title={"+ Add"}
        ></ButtonLinear>
      </View>
      <ScrollView>
        {data.map((object, index) => {
          return <Item key={index} object={object} index={index} />;
        })}
      </ScrollView>
    </View>
  );
});

export default ConsultsItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  box: {
    marginHorizontal: 14,
    marginBottom: 5,
    borderRadius: 16,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 15 },
    shadowColor: Colors.boxShadow,
    shadowOpacity: 1,
    paddingBottom: 8,
  },
  floatingMenuButtonStyle: {
    bottom: 35,
    width: 100,
    alignSelf: "flex-end",
    position: "absolute",
  },
});
