import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    Text
} from "react-native";
import Animated, {
    FadeIn,
    FadeOut,
} from "react-native-reanimated";
import AnswerButton from "../components/AnswerButton";
import { saveBestScore } from "../lib/storage";
export default function GameScreen() {
    const [showQuestion, setShowQuestion] = useState(true);
    const { subject, mode } = useLocalSearchParams();
    const [timeLeft, setTimeLeft] = useState(
        mode === "Speed" ? 60 : 0
    );
    const [blinkVisible, setBlinkVisible] = useState(true);
    const [question, setQuestion] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const [options, setOptions] = useState<number[]>([]);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [selectedIndex, setSelectedIndex] =
        useState<number | null>(null);;

    const [answerState, setAnswerState] = useState<
        "default" | "correct" | "wrong"
    >("default");
    function generateQuestion() {
        let a = Math.floor(Math.random() * 20) + 1;
        let b = Math.floor(Math.random() * 20) + 1;

        let answer = 0;
        let text = "";

        if (subject === "Subtraction" && a < b) {
            [a, b] = [b, a];
        }

        if (subject === "Addition") {
            answer = a + b;
            text = `${a} + ${b}`;
        } else if (subject === "Subtraction") {
            answer = a - b;
            text = `${a} - ${b}`;
        } else if (subject === "Multiplication") {
            answer = a * b;
            text = `${a} × ${b}`;
        } else if (subject === "Division") {
            answer = a;
            text = `${a * b} ÷ ${b}`;
        } else {
            const randomType = Math.floor(Math.random() * 4);

            switch (randomType) {
                case 0:
                    answer = a + b;
                    text = `${a} + ${b}`;
                    break;

                case 1:
                    if (a < b) {
                        [a, b] = [b, a];
                    }
                    answer = a - b;
                    text = `${a} - ${b}`;
                    break;

                case 2:
                    answer = a * b;
                    text = `${a} × ${b}`;
                    break;

                case 3:
                    answer = a;
                    text = `${a * b} ÷ ${b}`;
                    break;
            }
        }

        const generatedOptions = [
            answer,
            answer + Math.floor(Math.random() * 5) + 1,
            answer - Math.floor(Math.random() * 5) - 1,
            answer + Math.floor(Math.random() * 10) + 2,
        ].sort(() => Math.random() - 0.5);

        setQuestion(text);
        setCorrectAnswer(answer);
        setOptions(generatedOptions);
    }
    useEffect(() => {
        if (mode !== "Blink") {
            setBlinkVisible(true);
            return;
        }

        const interval = setInterval(() => {
            setBlinkVisible((prev) => !prev);
        }, 500);

        return () => clearInterval(interval);
    }, [mode, score]);
    useEffect(() => {
        generateQuestion();
    }, []);
    async function endGame() {
        const isNewBest = await saveBestScore(score);

        if (isNewBest) {
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
            );
        }

        router.replace({
            pathname: "/result",
            params: {
                score,
            },
        });
    }
    useEffect(() => {
        if (mode !== "Speed") return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);

                    endGame();

                    return 0;
                }

                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [mode, score]);
    useEffect(() => {
        if (mode !== "Flash") {
            setShowQuestion(true);
            return;
        }

        setShowQuestion(true);

        const timer = setTimeout(() => {
            setShowQuestion(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [question, mode]);
    function checkAnswer(selected: number, index: number) {
        if (selectedIndex !== null) return;

        setSelectedIndex(index);

        const isCorrect = selected === correctAnswer;
        if (isCorrect) {
            Haptics.impactAsync(
                Haptics.ImpactFeedbackStyle.Light
            );
        } else {
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            );
        }
        setAnswerState(isCorrect ? "correct" : "wrong");

        setTimeout(() => {
            // SPEED MODE
            if (mode === "Speed") {
                if (isCorrect) {
                    setScore((prev) => prev + 1);
                }

                setSelectedIndex(null);
                setAnswerState("default");

                generateQuestion();
                return;
            }

            // NORMAL / FLASH / BLINK
            if (isCorrect) {
                setScore((prev) => prev + 1);
            } else {
                const remainingLives = lives - 1;

                if (remainingLives <= 0) {
                    endGame();
                    return;
                }

                setLives(remainingLives);
            }

            setSelectedIndex(null);
            setAnswerState("default");

            generateQuestion();
        }, 500);
    }

    return (
        <LinearGradient
            colors={["#0F1020", "#1B1464", "#312E81"]}
            style={{
                flex: 1,
                paddingTop: 80,
                paddingHorizontal: 20,
            }}
        >
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
                    textAlign: "center",
                    marginTop: 20,
                    fontWeight: "bold",
                }}
            >
                Score: {score}
            </Text>
            {mode === "Speed" && (
                <Text
                    style={{
                        color: "#FFD54F",
                        fontSize: 28,
                        textAlign: "center",
                        marginTop: 10,
                        fontWeight: "bold",
                    }}
                >
                    ⏱ {timeLeft}s
                </Text>
            )}
            <Text
                style={{
                    color: "white",
                    fontSize: 30,
                    textAlign: "center",
                    marginTop: 10,
                }}
            >
                {mode !== "Speed" && (
                    <Text
                        style={{
                            color: "white",
                            fontSize: 30,
                            textAlign: "center",
                            marginTop: 10,
                        }}
                    >
                        {"❤️".repeat(lives)}
                    </Text>
                )}
            </Text>

            <Animated.Text
                key={question}
                entering={FadeIn.duration(30)}
                exiting={FadeOut.duration(30)}
                style={{
                    color: "white",
                    fontSize: 50,
                    fontWeight: "bold",
                    textAlign: "center",
                    marginVertical: 60,
                }}
            >
                {mode === "Blink"
                    ? blinkVisible
                        ? question
                        : "???"
                    : showQuestion
                        ? question
                        : "???"}
            </Animated.Text>

            {options.map((option, index) => (
                <AnswerButton
                    key={index}
                    value={option}
                    onPress={() =>
                        checkAnswer(option, index)
                    }
                    state={
                        selectedIndex === index
                            ? answerState
                            : "default"
                    }
                />
            ))}
        </LinearGradient>
    );
}