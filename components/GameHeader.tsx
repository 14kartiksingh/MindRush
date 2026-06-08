import { Text, View } from "react-native";

type Props = {
  subject: string;
  mode: string;
  score: number;
  lives: number;
  timeLeft?: number;
  showTimer?: boolean;
};

export default function GameHeader({
  subject,
  mode,
  score,
  lives,
  timeLeft,
  showTimer,
}: Props) {
  return (
    <View>
      <Text
        style={{
          color: "#C7C7C7",
          textAlign: "center",
        }}
      >
        {subject} • {mode}
      </Text>

      <Text
        style={{
          color: "white",
          fontSize: 28,
          fontWeight: "bold",
          textAlign: "center",
          marginTop: 20,
        }}
      >
        Score: {score}
      </Text>

      <Text
        style={{
          color: "white",
          fontSize: 28,
          textAlign: "center",
          marginTop: 10,
        }}
      >
        {"❤️".repeat(lives)}
      </Text>

      {showTimer && (
        <Text
          style={{
            color: "#FFD54F",
            fontSize: 28,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 10,
          }}
        >
          ⏱ {timeLeft}s
        </Text>
      )}
    </View>
  );
}