import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import Text from "components/Text";
import Theme from "style/Theme";
import { Colors } from "configs";
import ButtonIcon from "components/ButtonIcon";
import Animated, {
  Transitioning,
  Transition,
  useCode,
  block,
  cond,
  Value,
  eq,
  set,
  Clock,
  interpolateNode,
  concat,
} from "react-native-reanimated";
import { runTiming } from "utils/runTiming";

interface DropListProps {
  data: any[];
  numberShow: number;
  renderItem: (item: any) => void;
  title: string;
  icon: ImageSourcePropType;
  refWrap: any;
}

const DropList = memo(
  ({ data, numberShow, renderItem, title, icon, refWrap }: DropListProps) => {
    const firstData = data.slice(0, numberShow);

    const [dataShow, setDataShow] = useState<any[]>(firstData);
    const [isShowMore, setIsShowMore] = useState(false);
    const transition = (
      <Transition.Sequence>
        <Transition.Out type="fade" />
        <Transition.Change interpolation="linear" />
        <Transition.In type="fade" />
      </Transition.Sequence>
    );
    const transRef: any = useRef<any>();
    // const animationIsShowMore = new Value<number>(0);
    // const rotate = new Value(0);
    // const animation = new Value(0);
    // const clock = new Clock();
    // useCode(
    //   () =>
    //     block([
    //       cond(eq(animationIsShowMore, 1), [
    //         set(animation, runTiming(clock, 400)),
    //         set(
    //           rotate,
    //           interpolateNode(animation, {
    //             inputRange: [0, 1],
    //             outputRange: [0, 90],
    //           })
    //         ),
    //       ]),
    //     ]),
    //   [animationIsShowMore]
    // );

    const onMore = useCallback(() => {
      setIsShowMore((prev) => {
        if (!prev) {
          transRef.current.animateNextTransition();
          refWrap.current.animateNextTransition();
          setDataShow(data);
          //   animationIsShowMore.setValue(1);
        }
        if (prev) {
          setDataShow(firstData);
          transRef.current.animateNextTransition();
          refWrap.current.animateNextTransition();
          //   animationIsShowMore.setValue(0);
        }
        return !prev;
      });
    }, [data, firstData]);
    return (
      <Transitioning.View
        transition={transition}
        ref={transRef}
        style={{
          paddingTop: 16,
          borderRadius: 16,
          backgroundColor: Colors.White,
          marginTop: 40,
        }}
      >
        <View
          style={{
            ...Theme.flexRow,
            paddingHorizontal: 24,
            borderBottomWidth: 1,
            borderBottomColor: Colors.WhiteSmoke,
            paddingBottom: 16,
          }}
        >
          <ButtonIcon
            icon={icon}
            size={32}
            borderRadius={8}
            color={Colors.TealBlue20}
            disabled
          />
          <Text size={15} lineHeight={18} bold marginLeft={16}>
            {title}
          </Text>
        </View>
        <Transitioning.View
          transition={transition}
          ref={transRef}
          style={{ overflow: "hidden" }}
        >
          {dataShow.map((item) => renderItem(item))}
        </Transitioning.View>

        <TouchableOpacity
          style={{ paddingTop: 12, ...Theme.center, paddingBottom: 16 }}
          onPress={onMore}
        >
          <Animated.View
          // style={{ transform: [{ rotate: concat(rotate, "deg") }] }}
          >
            <Image
              source={require("images/ic_arr_down.png")}
              style={{ tintColor: Colors.Platinum }}
            />
          </Animated.View>
        </TouchableOpacity>
      </Transitioning.View>
    );
  }
);

export default DropList;

const styles = StyleSheet.create({
  container: {},
});
