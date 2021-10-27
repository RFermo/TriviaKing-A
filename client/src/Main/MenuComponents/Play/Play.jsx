import Axios from "axios";
import { useState } from "react";
import Header from "../Header";
import { FaChevronUp, FaChevronDown, FaChevronLeft, FaChevronRight, FaArrowRight } from "react-icons/fa";
import appendAndShuffle from "../../utils/shuffleArr";
import Options from "./Options";

const Play = () => {

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currQuestion, setCurrQuestion] = useState(0);
    const [startGame, setStartGame] = useState(false);
    const [playButton, setPlayButton] = useState(false);
    const [next, setNext] = useState(false);
    const [score, setScore] = useState(0);
    const [btnClicked, setBtnClicked] = useState(null);
    const [btnArray, setBtnArray] = useState([]);
    const [gameOver, setGameOver] = useState(false);

    const correctClasses = ["bg-purple-800", "!text-gray-200", "pointer-events-none", "transition", "duration-300"];
    const incorrectClasses = ["bg-red-800", "!text-gray-200", "transition", "duration-300"];
    
    const handleBegin = async () => {

        setLoading(true);

        try {
            const easyResponse = await Axios.get("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple&encode=url3986");
            const mediumResponse = await Axios.get("https://opentdb.com/api.php?amount=4&difficulty=medium&type=multiple&encode=url3986");
            const hardResponse = await Axios.get("https://opentdb.com/api.php?amount=4&difficulty=hard&type=multiple&encode=url3986");

            let [easyArr, mediumArr, hardArr] = [easyResponse.data.results, mediumResponse.data.results, hardResponse.data.results];
            appendAndShuffle(easyArr, mediumArr, hardArr);
            
            setQuestions([...easyArr, ...mediumArr, ...hardArr]);
            setLoading(false);
            setStartGame(true);
        }

        catch (err) {
            console.error(err);
        }
    };

    const makeUnclickable = (btnList, correct_answer) => {
        for (let i = 0; i < btnList.length; i++) {

            const childClasses = btnList[i].classList;
            if (btnList[i].value === correct_answer) {
                childClasses.add(...correctClasses);
            }

            childClasses.add("pointer-events-none");
        }
    };

    const makeClickable = () => {
        for (let i = 0; i < btnArray.length; i++) {
            const childClasses = btnArray[i].classList;
            childClasses.remove("pointer-events-none");
        }
    }

    const nextQuestion = () => {
        if (next) {
            setCurrQuestion(currQuestion + 1);
            setNext(!next);
            setBtnClicked(btnClicked.remove(...correctClasses));

            makeClickable(); // make all buttons clickable when user moves on to next question
        }
    };

    const checkAnswer = (e, id) => {

        const answer = e.target.value;
        const correct_answer = decodeURIComponent(questions[currQuestion].correct_answer);

        const btnList = e.target.parentNode.childNodes; // array of all buttons
        makeUnclickable(btnList, correct_answer); // make buttons unclickable after choosing answer on current question

        const button = e.target.classList;
        setBtnClicked(button);
        setBtnArray(btnList); // helps to remove pointer-events-none when moving on to next question

        if (answer === correct_answer) {

            if (currQuestion === 12) {
                console.log("You are the KING!");
            }

            else {
                button.add(...correctClasses);
                setNext(!next);
                setScore(score + 1);
            }
        }

        else {
            button.add(...incorrectClasses);
            setGameOver(!gameOver);
            console.log("Game over!");
        }
    };
      
    return (

        <div className="h-screen flex flex-col bg-gradient-to-b from-purple-900 to-purple-700">

            <Header />

            <div className="h-screen flex justify-center items-center">

                <div className={`${loading ? "block" : "hidden"} animate-spin rounded-full h-32 w-32 border-b-4 border-yellow-500`}></div>

                <div className={`${playButton ? "hidden" : "block"} flex flex-col space-y-8`}>
                    <div>
                        <FaChevronDown className="text-gray-200 w-8 h-8 mx-auto animate-bounce" />
                    </div>

                    <div className="flex items-center space-x-8">
                        <div>
                            <FaChevronRight className="text-gray-200 w-8 h-8 mx-auto right-bounce" />
                        </div>

                        <button 
                            className="bg-yellow-500 px-4 py-4 rounded-xl"
                            onClick={() => {
                                setPlayButton(!playButton);
                                handleBegin();
                            }}
                        >
                            <h1 className="font-inter text-3xl text-gray-800 font-semibold">Start playing!</h1>
                        </button>

                        <div>
                            <FaChevronLeft className="text-gray-200 w-8 h-8 mx-auto left-bounce" />
                        </div>
                    </div>
                    
                    <div>
                        <FaChevronUp className="text-gray-200 w-8 h-8 mx-auto up-bounce" />
                    </div>
                </div>
                

                {startGame && 
                    <div id="slider" className="w-11/12 h-[600px] bg-gray-300 rounded-xl relative slide-in">

                        <div className="w-11/12 mx-auto flex flex-col space-y-7 mt-4">
                            <div className="bg-purple-900 w-max mx-auto px-4 py-3 rounded-xl shadow-xl">
                            <h3 className="font-inter text-lg text-gray-200">Question {currQuestion + 1}</h3>
                            </div>

                            <div>
                                <h1 className="font-inter text-center font-semibold text-lg">
                                    {decodeURIComponent(questions[currQuestion].question)}
                                </h1>
                            </div>

                            <div className="flex flex-col space-y-4">

                                {questions[currQuestion].incorrect_answers.map((option, id) => {

                                    return (
                                        <Options
                                            key={id}
                                            checkAnswer={checkAnswer}
                                            class="py-2 rounded-xl shadow-lg border-2 border-purple-900 font-inter font-semibold text-gray-800"
                                            option={decodeURIComponent(option)}
                                            id={id}
                                            currQuestion={currQuestion}
                                            next={next}
                                        />
                                    );
                                })}
                            </div>

                            <h1 className="font-inter text-xl text-center">Current score: {score}</h1>
                        </div>

                        <button onClick={nextQuestion} className={`${next ? "opacity-100" : "opacity-60"} absolute transition duration-300 shadow-xl bottom-3 right-3`}>
                            <div className="bg-gray-800 px-3 py-2 rounded-xl flex items-center space-x-4">
                                <p className="font-inter text-gray-200 text-lg">NEXT</p>
                                <FaArrowRight className="text-gray-200" />
                            </div>
                        </button>
                    </div>
                }
            </div>
        </div>
    );
};
 
export default Play;