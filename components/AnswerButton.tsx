

import { Text, TouchableWithoutFeedback } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming
} from "react-native-reanimated";
type Props = {
  value: number;
  onPress: () => void;
  state?: "default" | "correct" | "wrong";
};

export default function AnswerButton({
  value,
  onPress,
  state = "default",
}: Props) {
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scale.value,
        },
        {
          translateX: translateX.value,
        },
      ],
    };
  });

  let backgroundColor = "rgba(255,255,255,0.08)";
  let borderColor = "rgba(255,255,255,0.15)";

  if (state === "correct") {
    backgroundColor = "#16a34a";
    borderColor = "#22c55e";
  }

  if (state === "wrong") {
    backgroundColor = "#dc2626";
    borderColor = "#ef4444";
  }
  if (state === "wrong") {
    translateX.value = withSequence(
  withTiming(-8, { duration: 30 }),
  withTiming(8, { duration: 30 }),
  withTiming(-5, { duration: 20 }),
  withTiming(5, { duration: 20 }),
  withTiming(0, { duration: 20 })
);
  }
  return (
    <TouchableWithoutFeedback
      onPressIn={() => {
  scale.value = withTiming(0.98, {
    duration: 50,
  });
}}

onPressOut={() => {
  scale.value = withTiming(1, {
    duration: 50,
  });
}}
      onPress={onPress}
    >
      <Animated.View
        style={[
          {
            backgroundColor,
            borderWidth: 1,
            borderColor,
            borderRadius: 20,
            padding: 20,
            marginBottom: 15,
          },
          animatedStyle,
        ]}
      >
        <Text
          style={{
            color: "white",
            fontSize: 24,
            textAlign: "center",
          }}
        >
          {value}
        </Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}