import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const modes = [
  {
    icon: "🎯",
    title: "Normal",
    desc: "Play with 3 lives and no timer",
    color: "#22C55E",
  },
  {
    icon: "⚡",
    title: "Speed",
    desc: "Score as much as possible in 60 seconds",
    color: "#F59E0B",
  },
  {
    icon: "👻",
    title: "Flash",
    desc: "Question disappears after 1 second",
    color: "#8B5CF6",
  },
  {
    icon: "💥",
    title: "Blink",
    desc: "Question keeps blinking on screen",
    color: "#EF4444",
  },
];

export default function ModesScreen() {
  const { subject } = useLocalSearchParams();

  return (
    <LinearGradient
      colors={["#0F1020", "#1B1464", "#312E81"]}
      style={{
        flex: 1,
        paddingTop: 70,
        paddingHorizontal: 20,
      }}
    >
      <Text
        style={{
          fontSize: 60,
          textAlign: "center",
        }}
      >
        🎮
      </Text>

      <Text
        style={{
          color: "white",
          fontSize: 36,
          fontWeight: "900",
          textAlign: "center",
          marginTop: 10,
        }}
      >
        GAME MODE
      </Text>

      <Text
        style={{
          color: "#FFD700",
          textAlign: "center",
          fontSize: 18,
          fontWeight: "bold",
          marginTop: 10,
        }}
      >
        {subject}
      </Text>

      <Text
        style={{
          color: "#BDBDBD",
          textAlign: "center",
          marginTop: 8,
          marginBottom: 35,
        }}
      >
        Choose how you want to play
      </Text>

      {modes.map((mode) => (
        <TouchableOpacity
          key={mode.title}
          activeOpacity={0.8}
          onPress={() =>
            router.push({
              pathname: "/game",
              params: {
                subject,
                mode: mode.title,
              },
            })
          }
          style={{
            backgroundColor: "rgba(255,255,255,0.08)",
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.12)",
            borderRadius: 24,
            padding: 20,
            marginBottom: 16,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 55,
              height: 55,
              borderRadius: 16,
              backgroundColor: mode.color,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 16,
            }}
          >
            <Text
              style={{
                fontSize: 26,
              }}
            >
              {mode.icon}
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "700",
              }}
            >
              {mode.title}
            </Text>

            <Text
              style={{
                color: "#BDBDBD",
                marginTop: 3,
              }}
            >
              {mode.desc}
            </Text>
          </View>

          <Text
            style={{
              color: "#BDBDBD",
              fontSize: 24,
            }}
          >
            ›
          </Text>
        </TouchableOpacity>
      ))}

      <Text
        style={{
          color: "rgba(255,255,255,0.35)",
          textAlign: "center",
          marginTop: 20,
          fontSize: 12,
        }}
      >
        Pick a mode and challenge your brain
      </Text>
    </LinearGradient>
  );
}