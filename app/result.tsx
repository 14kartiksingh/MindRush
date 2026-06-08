import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function ResultScreen() {
  const { score } = useLocalSearchParams();

  return (
    <LinearGradient
      colors={["#0F1020", "#1B1464", "#312E81"]}
      style={{
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 25,
      }}
    >
      <Text
        style={{
          fontSize: 90,
          textAlign: "center",
        }}
      >
        🏆
      </Text>

      <Text
        style={{
          color: "white",
          fontSize: 38,
          fontWeight: "900",
          textAlign: "center",
          marginTop: 10,
        }}
      >
        GREAT RUN!
      </Text>

      <Text
        style={{
          color: "#BDBDBD",
          textAlign: "center",
          marginTop: 8,
          marginBottom: 40,
          fontSize: 16,
        }}
      >
        Your brain just got stronger
      </Text>

      <View
        style={{
          backgroundColor: "rgba(255,255,255,0.08)",
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.12)",
          borderRadius: 25,
          padding: 30,
          marginBottom: 40,
        }}
      >
        <Text
          style={{
            color: "#FFD700",
            textAlign: "center",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          FINAL SCORE
        </Text>

        <Text
          style={{
            color: "white",
            fontSize: 70,
            fontWeight: "900",
            textAlign: "center",
            marginTop: 10,
          }}
        >
          {score}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          backgroundColor: "white",
          height: 65,
          borderRadius: 35,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "800",
            letterSpacing: 1,
          }}
        >
          PLAY AGAIN
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.replace("/")}
        style={{
          backgroundColor: "rgba(255,255,255,0.08)",
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.12)",
          height: 65,
          borderRadius: 35,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontWeight: "700",
          }}
        >
          BACK TO HOME
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          color: "rgba(255,255,255,0.35)",
          textAlign: "center",
          marginTop: 25,
          fontSize: 12,
        }}
      >
        Keep training. Keep improving.
      </Text>
    </LinearGradient>
  );
}