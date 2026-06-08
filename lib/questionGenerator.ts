export function generateQuestion(subject: string) {
    let a = Math.floor(Math.random() * 20) + 1;
    let b = Math.floor(Math.random() * 20) + 1;

    let answer = 0;
    let question = "";

    if (subject === "Subtraction" && a < b) {
        [a, b] = [b, a];
    }

    if (subject === "Addition") {
        answer = a + b;
        question = `${a} + ${b}`;
    } else if (subject === "Subtraction") {
        answer = a - b;
        question = `${a} - ${b}`;
    } else if (subject === "Multiplication") {
        answer = a * b;
        question = `${a} × ${b}`;
    } else if (subject === "Division") {
        answer = a;
        question = `${a * b} ÷ ${b}`;
    } else {
        const randomType = Math.floor(Math.random() * 4);

        switch (randomType) {
            case 0:
                answer = a + b;
                question = `${a} + ${b}`;
                break;

            case 1:
                if (a < b) {
                    [a, b] = [b, a];
                }
                answer = a - b;
                question = `${a} - ${b}`;
                break;

            case 2:
                answer = a * b;
                question = `${a} × ${b}`;
                break;

            case 3:
                answer = a;
                question = `${a * b} ÷ ${b}`;
                break;
        }
    }

    const uniqueOptions = new Set<number>();

    uniqueOptions.add(answer);

    while (uniqueOptions.size < 4) {
        const randomOffset =
            Math.floor(Math.random() * 20) - 10;

        uniqueOptions.add(answer + randomOffset);
    }

    const options = [...uniqueOptions].sort(
        () => Math.random() - 0.5
    );

    return {
        question,
        answer,
        options,
    };
}