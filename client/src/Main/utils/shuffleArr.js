const appendAndShuffle = (easyArr, mediumArr, hardArr) => {

    for (let i = 0; i < easyArr.length; i++) {
        const correct_answer = easyArr[i].correct_answer;
        let incorrect_arr = easyArr[i].incorrect_answers;
        incorrect_arr.push(correct_answer);
        incorrect_arr = shuffleArray(incorrect_arr);
    }

    for (let i = 0; i < mediumArr.length; i++) {
        const correct_answer = mediumArr[i].correct_answer;
        let incorrect_arr = mediumArr[i].incorrect_answers;
        incorrect_arr.push(correct_answer);
        incorrect_arr = shuffleArray(incorrect_arr);
    }

    for (let i = 0; i < hardArr.length; i++) {
        const correct_answer = hardArr[i].correct_answer;
        let incorrect_arr = hardArr[i].incorrect_answers;
        incorrect_arr.push(correct_answer);
        incorrect_arr = shuffleArray(incorrect_arr);
    }
};

// Fisher-Yates shuffle algorithm

const shuffleArray = array => {
    let curId = array.length;
    // There remain elements to shuffle
    while (0 !== curId) {
        // Pick a remaining element
        let randId = Math.floor(Math.random() * curId);
        curId -= 1;
        // Swap it with the current element.
        let tmp = array[curId];
        array[curId] = array[randId];
        array[randId] = tmp;
    }
    return array;
};

export default appendAndShuffle;