import React, { useState, useEffect } from "react";

function Quiz(props) {
  const [currentQues, setCurrentQues] = useState(0);
  const [isActive, setActive] = useState(false);
  const [count, setCount] = useState(0);
  const [isSubmitted, setSubmit] = useState(false);
  const [userAns, setUserAns] = useState([]);
  const [timeLeft, setTime] = useState(60 * 30);
  useEffect(() => {
    // console.log(timeLeft);
    if (timeLeft > 0) {
      setInterval(() => {
        setTime(timeLeft - 1);
      }, 1000);
    }
  }, [timeLeft]);
  const questions = [
    {
      questionText: "What is the capital of France?",
      answerOptions: [
        { answerText: "New York", isCorrect: false },
        { answerText: "London", isCorrect: false },
        { answerText: "Paris", isCorrect: true },
        { answerText: "Dublin", isCorrect: false },
      ],
    },
    {
      questionText: "Who is CEO of Tesla?",
      answerOptions: [
        { answerText: "Jeff Bezos", isCorrect: false },
        { answerText: "Elon Musk", isCorrect: true },
        { answerText: "Bill Gates", isCorrect: false },
        { answerText: "Tony Stark", isCorrect: false },
      ],
    },
    {
      questionText: "The iPhone was created by which company?",
      answerOptions: [
        { answerText: "Apple", isCorrect: true },
        { answerText: "Intel", isCorrect: false },
        { answerText: "Amazon", isCorrect: false },
        { answerText: "Microsoft", isCorrect: false },
      ],
    },
    {
      questionText: "How many Harry Potter books are there?",
      answerOptions: [
        { answerText: "1", isCorrect: false },
        { answerText: "4", isCorrect: false },
        { answerText: "6", isCorrect: false },
        { answerText: "7", isCorrect: true },
      ],
    },
  ];
  const toggleClass = () => {
    setActive(!isActive);
  };
  const timer = () => {
    if (timeLeft > 0) {
      setInterval(() => {
        setTime(timeLeft - 1);
      }, 1000);
    }
  };

  const handleAnsClick = (ques, ans) => {
    const obj = {};
    obj["ques"] = ques;
    obj["ans"] = ans;
    console.log(obj);
    for (let i = 0; i < userAns.length; i++) {
      if (userAns[i].ques === ques) {
        console.log("milgaya");
      }
    }
    console.log("no for");
    setUserAns([...userAns, obj]);
    // console.log(userAns.length);

    // let index = userAns.indexOf({ ques: ans });

    // console.log(index);
    // if (index === -1) {
    //   console.log("hs");
    // } else {
    //   console.log("ps");
    //   userAns[index] = { ques: ans };
    // }
  };

  return isSubmitted ? (
    <h1>Your score is {count}</h1>
  ) : (
    <div id="quiz">
      <header>
        <div>
          {currentQues + 1}/{questions.length}
        </div>
        <div>
          {Math.floor(timeLeft / 3600)}:{Math.floor(timeLeft / 60)}:
          {timeLeft % 60}
        </div>
      </header>
      <main>
        <h2>{questions[currentQues].questionText}</h2>
        <div id="options">
          {questions[currentQues].answerOptions.map((option, index) => (
            <div className="option-container" key={index}>
              <label>{index + 1}</label>
              <button
                // className={isActive ? "correct" : null}
                onClick={() => handleAnsClick(currentQues, option.answerText)}
              >
                {option.answerText}
              </button>
            </div>
          ))}
        </div>
      </main>
      <footer>
        {currentQues == 0 ? (
          <button className="disabled" disabled>
            Previous
          </button>
        ) : (
          <button
            onClick={(e) => {
              setCurrentQues(currentQues - 1);
            }}
          >
            Previous
          </button>
        )}
        {currentQues == questions.length - 1 ? (
          <button
            onClick={(e) => {
              console.log(userAns);
              //   setSubmit(true);
            }}
          >
            Submit
          </button>
        ) : (
          <button
            onClick={(e) => {
              setCurrentQues(currentQues + 1);
            }}
          >
            Next
          </button>
        )}
      </footer>
    </div>
  );
}

export default Quiz;
