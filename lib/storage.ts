import AsyncStorage from "@react-native-async-storage/async-storage";

const BEST_SCORE_KEY = "best_score";

export async function saveBestScore(score: number) {
  try {
    const currentBest = await getBestScore();

    if (score > currentBest) {
      await AsyncStorage.setItem(
        BEST_SCORE_KEY,
        score.toString()
      );

      return true;
    }

    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getBestScore() {
  try {
    const value = await AsyncStorage.getItem(
      BEST_SCORE_KEY
    );

    return value ? Number(value) : 0;
  } catch (error) {
    console.log(error);
    return 0;
  }
}