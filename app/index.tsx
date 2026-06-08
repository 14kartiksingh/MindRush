import { LinearGradient } from "expo-linear-gradient";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { getBestScore } from "../lib/storage";
export default function HomeScreen() {
  const [bestScore, setBestScore] = useState(0);

  useFocusEffect(
    useCallback(() => {
      loadBestScore();
    }, [])
  );

  async function loadBestScore() {
    const score = await getBestScore();
    setBestScore(score);
  }

  return (
    <LinearGradient
      colors={["#0F1020", "#1B1464", "#312E81"]}
      style={{
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 30,
      }}
    >
      <Image
        source={require("../assets/images/image.png")}
        style={{
          width: 120,
          height: 120,
          alignSelf: "center",
          marginBottom: 20,
        }}
        resizeMode="contain"
      />
      <Text
        style={{
          color: "white",
          fontSize: 48,
          fontWeight: "900",
          textAlign: "center",
          letterSpacing: 2,
          marginTop: 10,
        }}
      >
        MINDRUSH
      </Text>

      <Text
        style={{
          color: "#BDBDBD",
          fontSize: 18,
          textAlign: "center",
          marginTop: 10,
          marginBottom: 50,
        }}
      >
        Train Faster. Think Smarter.
      </Text>

      <View
        style={{
          backgroundColor: "rgba(255,255,255,0.08)",
          borderRadius: 25,
          padding: 25,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.12)",
          marginBottom: 40,
        }}
      >
        <Text
          style={{
            color: "#FFD700",
            fontSize: 20,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          🏆 BEST SCORE
        </Text>

        <Text
          style={{
            color: "white",
            fontSize: 52,
            textAlign: "center",
            fontWeight: "bold",
            marginTop: 10,
          }}
        >
          {bestScore}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => router.push("/subjects")}
        style={{
          backgroundColor: "white",
          height: 65,
          borderRadius: 35,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "800",
            letterSpacing: 1,
          }}
        >
          START TRAINING
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          color: "rgba(255,255,255,0.4)",
          textAlign: "center",
          marginTop: 30,
          fontSize: 12,
        }}
      >
        Made with ❤️ by MISTER CODERZ
      </Text>
    </LinearGradient>
  );
}