import React, {memo, useState,  } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Block } from "galio-framework";//should install library 
import { Picker } from "@react-native-picker/picker";//should install library 
import { normalize } from "configs/services/size";
import { Colors } from "configs";
import Text from "components/Text";
import Layout from "components/Layout/Layout";
const { width } = Dimensions.get("window");

export interface Props {
    question?: any;
    index?: any;
    submit?:boolean;
    answers:Object;
    updateAnswers:(id:any,value:any)=>void
    submitFalse?: () => void;
  }
  const DoubleSelect = memo(({question, index , submit , submitFalse,answers,updateAnswers}:Props) => {
    const [option1, setOption1] = useState("-1");
    const [option2, setOption2] = useState("-1");
    return (
      <Layout style={styles.box}>
      <View>
          <Text
            style={{
              fontSize: normalize(14),
              textAlign: "justify",
              // color: "black",
              marginLeft: 10,
            }}
          >
            {"Q"}
            {index + 1}
            {") "}
            {question.question}
          </Text>
          <View
            style={{
              marginLeft: 10,
              marginBottom: 10,
              flexDirection: "row",
              width: width * 0.7,
              height: 50,
              justifyContent: "space-between",
              padding: 5,
            }}
          >
            <Text
              style={{
                // color: "grey",
                fontSize: normalize(15),
                paddingVertical: 10,
                paddingLeft: 10,
              }}
            >
              Years:
            </Text>
            <View style={{ borderWidth: 1, margin: 0.5, borderColor: Colors.Isabelline, }}>
              <Picker
                style={{ width: width * 0.4, color:"#006ee6"}}
                mode="dropdown"
                selectedValue={option1}
                onValueChange={(value) => {setOption1(value);updateAnswers("Years",parseInt(value))}}
              >
                {question.options[0].value.split(",").map((val:any, k:any) => {
                  return <Picker.Item label={val} value={val} key={k} />;
                })}
              </Picker>
            </View>
          </View>
          <View
            style={{
              marginLeft: 10,
              marginBottom: 10,
              flexDirection: "row",
              width: width * 0.7,
              height: 50,
              justifyContent: "space-between",
              padding: 5,
            }}
          >
            <Text
              style={{
                // color: "grey",
                fontSize: normalize(15),
                paddingVertical: 10,
                paddingLeft: 10,
              }}
            >
              Months:
            </Text>
            <View style={{ borderWidth: 1, margin: 0.5,borderColor: Colors.Isabelline, }}>
              <Picker
                style={{width: width * 0.4 , color: "#006ee6"}}
                mode="dropdown"
                selectedValue={option2}
                onValueChange={(value) => {setOption2(value);updateAnswers("Months",parseInt(value))}}
              >
                {question.options[1].value.split(",").map((val:any, k:any) => {
                  return <Picker.Item label={val} value={val} key={k} />;
                })}
              </Picker>
            </View>
          </View>
        </View>
      </Layout>
      
    );
  });
  
  export default DoubleSelect;
  
  const styles = StyleSheet.create({
    options: {
      borderColor: "white",
      borderRadius: 20,
    },box: {
      paddingHorizontal: 24,
      paddingVertical: 20,
      marginHorizontal: 24,
      borderRadius: 16,
      shadowRadius: 15,
      shadowOffset: { width: 0, height: 15 },
      shadowColor: Colors.boxShadow,
      shadowOpacity: 1,
      marginTop: 10,
    },
  });
  
