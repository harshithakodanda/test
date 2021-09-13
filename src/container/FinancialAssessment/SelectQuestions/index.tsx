import React , {useState, memo} from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import { normalize } from "configs/services/size"; // add 
import { Colors } from "configs";
import Layout from "components/Layout/Layout";
import Text from "components/Text";
const { width } = Dimensions.get("window");

export interface Props {
  question?: any;
  index?: any;
  submit?:boolean;
  answers:Object;
  updateAnswers:(id:any,value:any)=>void;
  submitFalse?: () => void;
}
const SelectQuestion = memo(({question, index , submit , submitFalse,answers,updateAnswers}:Props) => {
  const [option1, setOption1] = useState(false);
  const [option2, setOption2] = useState(false);
  const [option3, setOption3] = useState(false);
  return (
    <Layout style={styles.box}>
<View>
        <Text
          style={{
            fontSize: normalize(14),
            textAlign: "left",
            // color: "black",
            marginLeft: 10,
            margin: 5
          }}
        >
            {"Q"}
          {index + 1}
          {") "}
          {question.question}
        </Text>
        <TouchableOpacity>
          <TouchableOpacity
            style={{
              borderColor:(!option1 && !option2 && !option3 && submit) ?"red":Colors.Isabelline,
              width: width * 0.7,
              height: 50,
              borderWidth: 1,
              backgroundColor: option1 ? "#006ee6" : null,
              borderRadius: 5,
              alignItems: "flex-start",
              margin:5
            }}
            onPress={() =>{
              if(!(option1 && option2 && option3)){submitFalse}
            //   this.setState({ option1: true, option2: false, option3: false })
            setOption1(true)
            setOption2(false)
            setOption3(false)
            updateAnswers(index+1,question.options[0].id)

            }}
          >
            <Text
              style={{
                fontSize: normalize(15),
                textAlign: "left",
                marginLeft: 10,
                // color: !option1 ? "#006ee6" : "white",
                paddingVertical:14,
              }}
            >
              {question.options[0].value}
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity>
          <TouchableOpacity
            style={{
              borderColor:(!option1 && !option2 && !option3 && submit) ?"red":Colors.Isabelline,
              width: width * 0.7,
              height: 50,
              borderWidth: 1,
              backgroundColor: option2 ? "#006ee6" : null,
              borderRadius: 5,
              alignItems: "flex-start",
              margin:5
            }}
            onPress={() =>{
              if(!(option1 && option2 && option3))submitFalse;
            //   this.setState({ option1: false, option2: true, option3: false })
              setOption1(false)
              setOption2(true)
              setOption3(false)
              updateAnswers(index+1,question.options[1].id)
            }}
          >
            <Text
              style={{
                fontSize: normalize(15),
                textAlign: "left",
                marginLeft: 10,
                // color: !option2 ? "#006ee6" : "white",
                paddingVertical:14,
              }}
            >
              {question.options[1].value}
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity>
          <TouchableOpacity
            style={{
              borderColor:(!option1 && !option2 && !option3 && submit) ?"red":Colors.Isabelline,
              width: width * 0.7,
              height: 50,
              borderWidth: 1,
              backgroundColor: option3 ? "#006ee6" : null,
              borderRadius: 5,
              alignItems: "flex-start",
              margin:5
            }}
            onPress={() =>{
              if(!(option1 && option2 && option3))submitFalse;
            //   this.setState({ option1: false, option2: false, option3: true })
            setOption1(false)
            setOption2(false)
            setOption3(true)
            updateAnswers(index+1,question.options[2].id)
            }}
          >
            <Text
              style={{
                fontSize: normalize(15),
                textAlign: "left",
                marginLeft: 10,
                // color: !option3 ? "#006ee6" : "white",
                paddingVertical:14,
              }}
            >
              {question.options[2].value}
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
    </View>
    </Layout>
    
  );
});

export default SelectQuestion;

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
