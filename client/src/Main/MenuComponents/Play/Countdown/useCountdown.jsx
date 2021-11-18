import { useState, useEffect } from 'react';
import wrongSound from "../sounds/wrong.wav";
import { buttonRef } from '../Options';

const wrong_audio = new Audio(wrongSound);

const useCountdown = (start, setTime, userClicked, setUserClicked) => {

  const [counter, setCounter] = useState(start);
  
  const buttonList = buttonRef.current.parentElement.childNodes;

  const addPointerEventsNone = () => {
    for (let i = 0; i < buttonList.length; i++) {
      buttonList[i].classList.add("pointer-events-none");
    }
  };

  useEffect(() => {

    if (userClicked) { // This will stop the timer once the user has clicked on an answer.
      return;
    }

    if (counter === 0) {
      setTime(0);
      addPointerEventsNone();
      wrong_audio.play();
      return;
    }

    setTimeout(() => {
      setCounter(counter - 1);
    }, 1000);

    return () => {
      setUserClicked(false);
      clearTimeout(counter);
    }

  }, [counter, setTime, userClicked, setUserClicked]);
    
  return counter;
};

export default useCountdown;
