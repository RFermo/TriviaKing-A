import Axios from "axios";
import { useState, useEffect } from "react";
import Header from "../Header";
import { FaChevronUp, FaChevronDown, FaChevronLeft, FaChevronRight, FaArrowRight } from "react-icons/fa";
import appendAndShuffle from "../../utils/shuffleArr";
import Options from "./Options";
import correctSound from "./sounds/correct.wav";
import wrongSound from "./sounds/wrong.wav";

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

    let correct_audio = new Audio(correctSound);
    let wrong_audio = new Audio(wrongSound);

    const correctClasses = ["bg-purple-800", "!text-gray-200", "pointer-events-none", "transition", "duration-200"];
    const incorrectClasses = ["bg-red-800", "!text-gray-200", "transition", "duration-200"];
    
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

        if (next && !gameOver) {
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

        if (answer === correct_answer && !gameOver) {

            if (currQuestion === 12) {
                console.log("You are the KING!");
            }

            else {
                button.add(...correctClasses);
                correct_audio.play();
                setNext(!next);
                setScore(score + 1);
            }
        }

        else {
            button.add(...incorrectClasses);
            wrong_audio.play();
            setGameOver(true);
            console.log("Game over!");
        }
    };
      
    return (

        <div className="h-screen flex flex-col bg-gradient-to-b from-purple-900 to-purple-700">

            <Header />

            <div className="h-screen flex justify-center items-center">

                <div className={`${loading ? "block" : "hidden"} animate-spin rounded-full h-32 w-32 md:h-64 md:w-64 border-b-4 md:border-b-8 border-yellow-500`}></div>

                <div className={`${playButton ? "hidden" : "block"} flex flex-col space-y-8`}>
                    <div>
                        <FaChevronDown className="text-gray-200 w-8 h-8 md:w-12 md:h-12 mx-auto animate-bounce" />
                    </div>

                    <div className="flex items-center space-x-8 md:space-x-12">
                        <div>
                            <FaChevronRight className="text-gray-200 w-8 h-8 md:w-12 md:h-12 mx-auto right-bounce" />
                        </div>

                        <button 
                            className="bg-yellow-500 group px-4 py-4 xl:hover:bg-gray-800 transition duration-300 md:px-6 md:py-6 lg:px-8 lg:py-8 xl:px-10 xl:py-10 rounded-xl"
                            onClick={() => {
                                setPlayButton(!playButton);
                                handleBegin();
                            }}
                        >
                            <h1 className="font-inter xl:group-hover:text-gray-200 text-3xl md:text-5xl 2xl:text-6xl text-gray-800 font-semibold">Start playing!</h1>
                        </button>

                        <div>
                            <FaChevronLeft className="text-gray-200 w-8 h-8 md:w-12 md:h-12 mx-auto left-bounce" />
                        </div>
                    </div>
                    
                    <div>
                        <FaChevronUp className="text-gray-200 w-8 h-8 md:w-12 md:h-12 mx-auto up-bounce" />
                    </div>
                </div>
                

                {startGame && 
                    <div id="slider" className="w-11/12 md:w-5/6 lg:w-3/4 xl:w-2/3 2xl:w-7/12 h-[600px] md:h-[680px] lg:h-[730px] xl:h-[670px] 2xl:h-[750px] bg-gray-300 rounded-xl relative slide-in">

                        <div className="w-11/12 mx-auto flex flex-col space-y-7 md:space-y-9 mt-4 md:mt-8 lg:mt-10">
                            <div className="bg-purple-900 w-max mx-auto px-4 py-3 rounded-xl shadow-xl">
                            <h3 className="font-inter text-lg md:text-xl lg:text-2xl 2xl:text-3xl text-gray-200">Question {currQuestion + 1}</h3>
                            </div>

                            <div>
                                <h1 className="font-inter text-center font-semibold text-lg md:text-xl lg:text-2xl 2xl:text-3xl">
                                    {decodeURIComponent(questions[currQuestion].question)}
                                </h1>
                            </div>

                            <div className="flex flex-col xl:w-4/5 xl:mx-auto space-y-4 md:space-y-6 lg:space-y-8">

                                {questions[currQuestion].incorrect_answers.map((option, id) => {

                                    return (
                                        <Options
                                            key={id}
                                            checkAnswer={checkAnswer}
                                            class="py-2 xl:hover:bg-gray-800 xl:hover:text-gray-200 transition duration-300 md:py-2.5 rounded-xl md:text-lg lg:text-xl 2xl:text-2xl shadow-lg border-2 border-purple-900 font-inter font-semibold text-gray-800"
                                            option={decodeURIComponent(option)}
                                            id={id}
                                            currQuestion={currQuestion}
                                            next={next}
                                        />
                                    );
                                })}
                            </div>

                            <h1 className="font-inter text-xl text-center font-bold">Current score: {score}</h1>
                        </div>

                        <button onClick={nextQuestion} className={`${next ? "opacity-100" : "opacity-60"} absolute transition duration-300 shadow-xl bottom-3 right-3`}>
                            <div className="bg-gray-800 px-3 py-2 rounded-xl flex items-center space-x-4">
                                <p className="font-inter text-gray-200 text-lg md:text-xl">NEXT</p>
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