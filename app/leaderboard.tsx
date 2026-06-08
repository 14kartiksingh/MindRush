import { Text, View } from "react-native";

export default function LeaderboardScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0F1020",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 32,
          fontWeight: "bold",
        }}
      >
        Leaderboard
      </Text>
    </View>
  );
}