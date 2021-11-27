export const giveCorrectClasses = (btnList, correct_answer, correctClasses) => {
    for (let i = 0; i < btnList.length; i++) {
        const childClasses = btnList[i].classList;

        if (btnList[i].value === correct_answer) {
            childClasses.add(...correctClasses);
        }

        childClasses.remove("xl:hover:bg-gray-800");
        childClasses.remove("xl:hover:text-gray-200");
    }
};

export const handleChopping = (correct_answer, incorrect_choices) => {
    incorrect_choices.sort(() => { return 0.5 - Math.random() });
    incorrect_choices.pop();
    incorrect_choices.pop();
    incorrect_choices.push(correct_answer);
    const choices = incorrect_choices.sort(() => { return 0.5 - Math.random() });
    return choices;
};

export const determineDifficulty = (currQuestion) => {

    let difficulty;

    if (currQuestion >= 0 && currQuestion <= 4) {
        difficulty = "easy";
    }

    else if (currQuestion > 4 && currQuestion <= 8) {
        difficulty = "medium";
    }

    else {
        difficulty = "hard";
    }

    return difficulty;
};