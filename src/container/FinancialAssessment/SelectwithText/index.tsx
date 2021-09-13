import React , {useState, memo} from "react";
import { ScrollView, StyleSheet, View, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Button, theme, Icon, Block } from "galio-framework";//should install library 
import { Picker } from "@react-native-picker/picker"; //should install library 
import { normalize } from "configs/services/size";
import Text from "components/Text";
import { TextInput } from "react-native-gesture-handler";
const { width } = Dimensions.get("window");
import { Colors } from "configs";
import Layout from "components/Layout/Layout";
export interface Props {
    question?: any;
    index?: any;
    submit?:boolean;
    answers:Object;
    updateAnswers:(id:any,value:any)=>void;
    submitFalse?: () => void;
}

const SelectwithText = memo(({question, index , submit , submitFalse,answers,updateAnswers}:Props) => {
    const [option, setOption] = useState("");
    const [input, setInputChange] = useState("");

    const inputChange = (value:any) => {
        if(input==''){
            submitFalse
        }
        else{
        setInputChange(value);
    }
      };
    return (
      <Layout style={styles.box}>
        <View>
        <Text
          style={{
            fontSize: normalize(14),
            textAlign: "left",
            // color: "black",
            marginLeft: 10,
          }}
        >
          {"Q"}
          {index + 1}
          {") "}
          {question.question}
        </Text>
        <TextInput
          placeholder="Eg 100000"
          keyboardType="number-pad"
          onChangeText={(value) => {
            inputChange(value);
            updateAnswers("Revenue",value)
          }}
          style={{
            width: width * 0.7,
            height: 50,
            fontSize: normalize(17),
            paddingLeft: 10,
            borderWidth: 1,
            borderColor: input ==='' && submit ? "red" :Colors.Isabelline,
            borderRadius: 5,
            marginLeft: 10,
            marginTop: 10,
            marginBottom: 10,
          }}
        />
        <View
          style={{
            borderWidth: 1,
            borderColor: Colors.Isabelline,
            borderRadius: 5,
            marginLeft: 10,
          }}
        >
          <Picker
            style={{ width: width * 0.7, color: "#006ee6", height:50 }}
            mode="dropdown"
            selectedValue={option}
            onValueChange={(value) => {setOption(value);            
              updateAnswers("RevenueMode",value.toString())
          }}
          >
            {question.options.map((value:any, id:any) => {
              return (
                <Picker.Item
                  label={value.value}
                  value={value.id}
                  key={id}
                />
              );
            })}
          </Picker>
        </View>
      </View>
      </Layout>
    );

});
export default SelectwithText;

const styles = StyleSheet.create({
  options: {
    borderColor: "white",
    borderRadius: 20,
  }, box: {
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
