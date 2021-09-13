import React, { memo, useMemo } from "react";
import { View } from "react-native";
import Theme from "style/Theme";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { Colors } from "configs";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
  add,
  and,
  Clock,
  cond,
  eq,
  Extrapolate,
  greaterOrEq,
  interpolateNode,
  lessThan,
  set,
  stopClock,
  sub,
  useCode,
  Value,
} from "react-native-reanimated";
import { clamp, usePanGestureHandler } from "react-native-redash/lib/module/v1";
import { runTiming } from "utils/runTiming";
import { width } from "configs/Const";

interface BottomSheetProps {
  maxHeight: number;
  children: any;
}

const BottomSheet = memo(({ maxHeight, children }: BottomSheetProps) => {
  const {
    gestureHandler,
    translation,
    velocity,
    state,
  } = usePanGestureHandler();
  const transY = useMemo(() => new Value(maxHeight + getBottomSpace() + 28), [
    maxHeight,
  ]);
  const offsetY = useMemo(() => new Value(0), [maxHeight]);

  const clock = useMemo(() => new Clock(), [maxHeight]);

  const animation = new Value(0);

  useCode(
    () => [
      cond(eq(state, State.ACTIVE), [
        stopClock(clock),
        set(transY, add(offsetY, translation.y)),
      ]),
      cond(and(eq(state, State.END), greaterOrEq(velocity.y, 0)), [
        set(animation, runTiming(clock, 400)),
        set(
          transY,
          interpolateNode(animation, {
            inputRange: [0, 1],
            outputRange: [transY, -28],
            extrapolate: Extrapolate.CLAMP,
          })
        ),
        set(offsetY, -28),
      ]),
      cond(and(eq(state, State.END), lessThan(velocity.y, 0)), [
        set(animation, runTiming(clock, 400)),
        set(
          transY,
          interpolateNode(animation, {
            inputRange: [0, 1],
            outputRange: [transY, -maxHeight - getBottomSpace() - 28],
            extrapolate: Extrapolate.CLAMP,
          })
        ),
        set(offsetY, -28 - maxHeight - getBottomSpace()),
      ]),
    ],
    [maxHeight]
  );

  return (
    <View style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
      <Animated.View
        style={{
          position: "absolute",
          bottom: getBottomSpace(),
          left: 0,
          right: 0,
          height: clamp(sub(0, transY), -28, maxHeight + getBottomSpace() + 28),
          backgroundColor: Colors.BottomSheetColor,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        }}
      >
        <PanGestureHandler {...gestureHandler}>
          <Animated.View
            style={{
              height: 28,
              width: width,
              borderRadius: 2,
              alignSelf: "center",
              ...Theme.center,
            }}
          >
            <View
              style={{
                width: 40,
                height: 4,
                borderRadius: 2,
                backgroundColor: Colors.White,
                position: "absolute",
                top: 12,
              }}
            />
          </Animated.View>
        </PanGestureHandler>
        <View
          style={{
            width: "100%",
          }}
        >
          {children}
        </View>
      </Animated.View>
      <View
        style={{
          backgroundColor: Colors.BottomSheetColor,
          bottom: 0,
          left: 0,
          right: 0,
          height: getBottomSpace(),
        }}
      />
    </View>
  );
});

export default BottomSheet;
