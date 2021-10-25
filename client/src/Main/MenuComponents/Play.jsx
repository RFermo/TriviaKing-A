import Axios from "axios";
import { useState, useEffect } from "react";
import appendAndShuffle from "../utils/shuffleArr";

const Play = () => {

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currQuestion, setCurrQuestion] = useState(0);
    const [startGame, setStartGame] = useState(false);

    const handleBegin = async () => {

        setLoading(true);

        try {
            const easyResponse = await Axios.get("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple&encode=url3986");
            const mediumResponse = await Axios.get("https://opentdb.com/api.php?amount=4&difficulty=medium&type=multiple&encode=url3986");
            const hardResponse = await Axios.get("https://opentdb.com/api.php?amount=4&difficulty=hard&type=multiple&encode=url3986");

            let [easyArr, mediumArr, hardArr] = [easyResponse.data.results, mediumResponse.data.results, hardResponse.data.results];
            appendAndShuffle(easyArr, mediumArr, hardArr);
            console.log(easyArr, mediumArr, hardArr);
            
            setQuestions([...easyArr, ...mediumArr, ...hardArr]);
            setLoading(false);
            setStartGame(true);
        }

        catch(err) {
            console.error(err);
        }
    };

    const checkAnswer = (e) => {
        const answer = e.target.value;
        const correctAnswer = decodeURIComponent(questions[currQuestion].correct_answer);

        if (answer === correctAnswer) {

            if (currQuestion === 12) {
                console.log("You are the KING!");
            }

            else {
                setCurrQuestion(currQuestion + 1);
            }
        }

        else {
            console.log("Game over!");
        }
    };
      
    return (
        <div className="w-3/4">
            <button onClick={handleBegin} className="flex mt-20 mx-auto bg-yellow-500 px-4 py-2 rounded-xl ">
                <h1 className="text-4xl text-gray-800 font-inter">Play!</h1>
            </button>

            <div className={`${loading ? "block" : "hidden"}`}>
                Loading...
            </div>

            {startGame && 
                <div className="mt-10">
                    <div className="text-white text-2xl">
                        {decodeURIComponent(questions[currQuestion].question)}
                    </div>

                    <div className="mt-10 flex space-x-4">
                        <button 
                            value={decodeURIComponent(questions[currQuestion].incorrect_answers[0])} 
                            onClick={(e) => checkAnswer(e)}>{decodeURIComponent(questions[currQuestion].incorrect_answers[0])}
                        </button>

                        <button 
                            value={decodeURIComponent(questions[currQuestion].incorrect_answers[1])} 
                            onClick={(e) => checkAnswer(e)}>{decodeURIComponent(questions[currQuestion].incorrect_answers[1])}
                        </button>

                        <button 
                            value={decodeURIComponent(questions[currQuestion].incorrect_answers[2])} 
                            onClick={(e) => checkAnswer(e)}>{decodeURIComponent(questions[currQuestion].incorrect_answers[2])}
                        </button>

                        <button 
                            value={decodeURIComponent(questions[currQuestion].incorrect_answers[3])} 
                            onClick={(e) => checkAnswer(e)}>{decodeURIComponent(questions[currQuestion].incorrect_answers[3])}
                        </button>
                    </div>
                </div>
            }
        </div>
    );
};
 
export default Play;