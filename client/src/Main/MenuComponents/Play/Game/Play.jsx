import Axios from "axios";
import { useState } from "react";
import { FaChevronUp, FaChevronDown, FaChevronLeft, FaChevronRight, FaArrowRight, FaHome } from "react-icons/fa";
import appendAndShuffle from "../../../utils/shuffleArr";
import { giveCorrectClasses, handleChopping, determineDifficulty } from "../../../utils/playUtils";
import Options from "../Options/Options";
import Countdown from "../Countdown/Countdown";
import Lifelines from "../Lifelines/Lifelines";
import Gameover from "../Gameover/Gameover";
import correctSound from "../sounds/correct.wav";
import wrongSound from "../sounds/wrong.wav";
import playSound from "../sounds/play.wav";
import { Link } from "react-router-dom";


/* 
    Create states to hold the number of 50:50s that the user has and the number of questions that they
    can change. 
*/

const Play = () => {

    const [questions, setQuestions] = useState([]);
    const [choiceList, setChoiceList] = useState([]);
    const [fifty, setFifty] = useState(false);
    const [changeQuestion, setChangeQuestion] = useState(false);
    const [disableLifeline, setDisableLifeline] = useState(false);
    const [amount50Used, setAmount50Used] = useState(0);
    const [amountChangeUsed, setAmountChangeUsed] = useState(0);
    const [choppedAnswers, setChoppedAnswers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currQuestion, setCurrQuestion] = useState(0);
    const [showTimer, setShowTimer] = useState(false);
    const [currentTime, setCurrentTime] = useState(10);
    const [startGame, setStartGame] = useState(false);
    const [playButton, setPlayButton] = useState(false);
    const [userClicked, setUserClicked] = useState(false);
    const [next, setNext] = useState(false);
    const [score, setScore] = useState(0);
    const [btnClicked, setBtnClicked] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [error, setError] = useState(null);

    const correct_audio = new Audio(correctSound);
    const wrong_audio = new Audio(wrongSound);
    const play_audio = new Audio(playSound);

    const correctClasses = ["bg-purple-800", "!text-gray-200", "transition", "duration-200"];
    const incorrectClasses = ["bg-red-800", "!text-gray-200", "transition", "duration-200"];
    
    const handleBegin = async () => {

        setLoading(true);

        try {
            const easyResponse = await Axios.get("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple&encode=url3986");
            const mediumResponse = await Axios.get("https://opentdb.com/api.php?amount=4&difficulty=medium&type=multiple&encode=url3986");
            const hardResponse = await Axios.get("https://opentdb.com/api.php?amount=4&difficulty=hard&type=multiple&encode=url3986");

            // Fetch lifelines that user has and set the states. Then, pass those states as props to the Lifelines component.

            let [easyArr, mediumArr, hardArr] = [easyResponse.data.results, mediumResponse.data.results, hardResponse.data.results];
            appendAndShuffle(easyArr, mediumArr, hardArr);
            
            setQuestions([...easyArr, ...mediumArr, ...hardArr]);
            setLoading(false);
            setStartGame(true);
            setShowTimer(true);
        }

        catch (err) {
            setError("Something went wrong! Please try again later.");
            setLoading(false);
            console.error(err);
        }
    };

    const hoverEffect = () => {
        for (let i = 0; i < choiceList.length; i++) {
            const childClasses = choiceList[i].classList;
            childClasses.add("xl:hover:bg-gray-800");
            childClasses.add("xl:hover:text-gray-200");
        }
    };

    const nextQuestion = () => {

        if (next && !gameOver) {
            hoverEffect(); // Give hover effects to answer choices when moving to next question
            setCurrQuestion(currQuestion + 1);
            setNext(!next);
            setBtnClicked(btnClicked.remove(...correctClasses));
            setFifty(false);
            setChangeQuestion(false);
            setDisableLifeline(false);
            setCurrentTime(10);
            setShowTimer(true);
        }
    };

    const checkAnswer = (e) => {

        const answer = e.target.value;
        setShowTimer(false);
        const correct_answer = decodeURIComponent(questions[currQuestion].correct_answer);

        const btnList = e.target.parentNode.childNodes; // array of all buttons
        setChoiceList(btnList);
        giveCorrectClasses(btnList, correct_answer, correctClasses);

        const button = e.target.classList;
        setBtnClicked(button);

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
            button.remove("xl:hover:bg-gray-800");
            button.remove("xl:hover:text-gray-200");
            wrong_audio.play();
            setGameOver(true);
        }
    };

    const fiftyFifty = () => {
        setFifty(true);
        let choices = questions[currQuestion].incorrect_answers;
        const correct_answer = questions[currQuestion].correct_answer;
        const incorrect_choices = choices.filter((choice) => {return choice !== correct_answer});
        choices = handleChopping(correct_answer, incorrect_choices);
        setChoppedAnswers(choices);
    };

    const changeQuestionHandler = async () => {

        const difficulty = determineDifficulty(currQuestion);
        setChangeQuestion(true);

        try {
            const response = await Axios.get(`https://opentdb.com/api.php?amount=1&difficulty=${difficulty}&type=multiple&encode=url3986`);
            const new_question = response.data.results;
            appendAndShuffle(new_question);
            questions.splice(currQuestion, 1, new_question[0]);
            setQuestions(questions);
        }

        catch (err) {
            console.error(err);
        }
    };

    const renderOptions = (option, id) => {

        return (
            <Options
                key={id}
                userClicked={userClicked}
                setUserClicked={setUserClicked}
                checkAnswer={checkAnswer}
                class="py-2 xl:hover:bg-gray-800 xl:hover:text-gray-200 transition duration-300 md:py-2.5 rounded-xl md:text-lg lg:text-xl 2xl:text-2xl shadow-lg border-2 border-purple-900 font-inter font-semibold text-gray-800"
                option={decodeURIComponent(option)}
                id={id}
                currTime={currentTime}
                currQuestion={currQuestion}
                next={next}
            />
        );
    };
      
    return (

        <div className="h-screen flex flex-col bg-gradient-to-b from-purple-900 to-purple-700 relative">

            <div className="h-screen flex justify-center items-center">

                <div className={`${loading ? "block" : "hidden"} animate-spin rounded-full h-32 w-32 md:h-64 md:w-64 border-b-4 md:border-b-8 border-yellow-500`}></div>
                <div className={`${error ? `block` : `hidden`} text-gray-200 font-inter text-xl md:text-3xl xl:text-5xl`}>
                    {error}
                    <Link to="/dashboard" className="flex mt-10 w-max mx-auto bg-gray-800 items-center justify-center space-x-4 rounded-xl px-4 py-2">
                        <FaHome className="text-gray-200 w-5 h-5" />
                        <p className="text-2xl text-gray-200">Home</p>
                    </Link>
                </div>

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
                                play_audio.play();
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
                    <div className="w-11/12 md:w-5/6 lg:w-3/4 xl:w-2/3 2xl:w-7/12 h-[660px] md:h-[680px] lg:h-[750px] xl:h-[633px] 2xl:h-[750px] bg-gray-300 rounded-xl relative">

                        <div className="absolute top-3 right-3 xl:top-8 xl:right-8">
                            { showTimer && <Countdown curr={currentTime} setCurr={setCurrentTime} userClicked={userClicked} setUserClicked={setUserClicked} /> }
                        </div>

                        <div className="w-11/12 mx-auto flex flex-col space-y-7 md:space-y-9 xl:space-y-6 2xl:space-y-9 mt-4 md:mt-8 lg:mt-10">
                            
                            <div className="bg-purple-900 w-max mx-auto px-4 py-3 rounded-xl shadow-xl">
                                <h3 className="font-inter text-lg md:text-xl lg:text-2xl 2xl:text-3xl text-gray-200">Question {currQuestion + 1}</h3>
                            </div>
                                
                            <div>
                                <h1 className="font-inter text-center font-semibold !leading-normal text-lg md:text-xl lg:text-2xl 2xl:text-3xl">
                                    {decodeURIComponent(questions[currQuestion].question)}
                                </h1>
                            </div>

                            <div className="flex flex-col xl:w-4/5 xl:mx-auto space-y-4 md:space-y-6 lg:space-y-8">

                                { !fifty && !changeQuestion ? questions[currQuestion].incorrect_answers.map((option, id) => {

                                    return (renderOptions(option, id));
                                }) : 

                                    fifty ?
                                    choppedAnswers.map((option, id) => {
                                        return (renderOptions(option, id));
                                    }) :

                                    // At this point, the user has decided to change the question.
                                    questions[currQuestion].incorrect_answers.map((choice, key) => {
                                        return (renderOptions(choice, key));
                                    })
                                }

                            </div>

                            <Lifelines 
                                fiftyFifty={fiftyFifty} 
                                changeQuestionHandler={changeQuestionHandler} 
                                disableLifeline={disableLifeline} 
                                setDisableLifeline={setDisableLifeline}
                                currTime={currentTime}
                                userClicked={userClicked}
                                amount50Used={amount50Used}
                                setAmount50Used={setAmount50Used}
                                amountChangeUsed={amountChangeUsed}
                                setAmountChangeUsed={setAmountChangeUsed}
                            />
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

            { gameOver || currentTime === 0 ? <Gameover score={score} amountChangeUsed={amountChangeUsed} amount50Used={amount50Used} /> : null}
        </div>
    );
};
 
export default Play;