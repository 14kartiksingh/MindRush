import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const subjects = [
  { icon: "➕", name: "Addition", color: "#22C55E" },
  { icon: "➖", name: "Subtraction", color: "#EF4444" },
  { icon: "✖️", name: "Multiplication", color: "#F59E0B" },
  { icon: "➗", name: "Division", color: "#3B82F6" },
  { icon: "🧠", name: "Mixed Mode", color: "#A855F7" },
];

export default function SubjectsScreen() {
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
        📚
      </Text>

      <Text
        style={{
          color: "white",
          fontSize: 36,
          fontWeight: "900",
          textAlign: "center",
          letterSpacing: 1,
          marginTop: 10,
        }}
      >
        CHOOSE SUBJECT
      </Text>

      <Text
        style={{
          color: "#BDBDBD",
          textAlign: "center",
          fontSize: 16,
          marginTop: 10,
          marginBottom: 35,
        }}
      >
        Select what you want to train today
      </Text>

      {subjects.map((item) => (
        <TouchableOpacity
          key={item.name}
          activeOpacity={0.8}
          onPress={() =>
            router.push({
              pathname: "/modes",
              params: {
                subject: item.name,
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
              backgroundColor: item.color,
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
              {item.icon}
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
              {item.name}
            </Text>

            <Text
              style={{
                color: "#BDBDBD",
                marginTop: 3,
              }}
            >
              Practice and improve
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
        Choose your challenge and start training
      </Text>
    </LinearGradient>
  );
}