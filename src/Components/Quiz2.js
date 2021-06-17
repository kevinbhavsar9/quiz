import React, { PureComponent } from "react";
import { addDataToStore } from "../actions/data";

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
class Quiz2 extends PureComponent {
  getTime = () => {
    let data = localStorage.getItem("timeLeft");
    if (typeof data === undefined) {
      console.log("enter");
      return false;
    }
    // console.log(localStorage.getItem("timeLeft"));
    return data;
  };
  getData = () => {
    let data = JSON.parse(localStorage.getItem("data"));
    if (typeof data === undefined) {
      console.log("enter");
      return false;
    }
    // console.log(localStorage.getItem("timeLeft"));
    return data;
  };
  constructor() {
    super();

    this.state = {
      currentQues: 0,
      isSubmitted: false,
      userAns: this.getData() ? this.getData() : [],
      count: 0,
      time: {
        timeleft: this.getTime() ? this.getTime() : 60,
        h: "hh",
        m: "mm",
        s: "ss",
      },
    };
  }

  componentDidMount() {
    // console.log("mount");
    const { time, userAns } = this.state;
    let p = time.timeleft;
    this.interval = setInterval(() => {
      if (p > 0) {
        localStorage.setItem("timeLeft", p);
        p = p - 1;
        this.setState({
          ...this.state,
          time: {
            timeleft: p,
            h: Math.floor(p / 3600),
            m: Math.floor(p / 60),
            s: p % 60,
          },
        });
      } else {
        clearInterval(this.interval);
        localStorage.removeItem("timeLeft");
        addDataToStore(this.state);

        // console.log(temp);

        this.setState({
          ...this.state,
          count: this.check(),
          userAns: [],
          isSubmitted: true,
        });
      }
    }, 1000);
  }

  check = () => {
    const { userAns } = this.state;
    this.temp = 0;

    userAns.map((res) => {
      if (res.ans) {
        this.temp += 1;
      }
    });
    return this.temp;
  };
  componentDidUpdate(prevProps, prevState) {
    // console.log("update");
    const { userAns, isSubmitted } = this.state;
    if (!isSubmitted) {
      this.checkAnswer();
    }

    if (prevState.isSubmitted !== isSubmitted) {
      clearInterval(this.interval);
      this.setState({ ...this.state, userAns: [] });
    }
    localStorage.setItem("data", JSON.stringify(userAns));
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  checkAnswer = () => {
    const { currentQues, userAns } = this.state;
    // console.log(userAns);
    let ques = currentQues;
    for (let i = 0; i < 4; i++) {
      let element = document.getElementById(`${i}`);
      // console.log(element);
      if (element.classList.contains("correct")) {
        element.classList.remove("correct");
      }
    }
    userAns.map((res) => {
      if (res.ques == ques) {
        for (let i = 0; i < 4; i++) {
          let element = document.getElementById(`${i}`);
          if (element.classList.contains("correct")) {
            element.classList.remove("correct");
          }
        }
        document.getElementById(res.option).classList.add("correct");
      }
    });
  };

  handleAnsClick = (ques, ans, index) => {
    for (let i = 0; i < 4; i++) {
      let element = document.getElementById(`${i}`);
      if (element.classList.contains("correct")) {
        element.classList.remove("correct");
      }
    }
    document.getElementById(index).classList.add("correct");
    console.log(ans);
    const { userAns } = this.state;
    const obj = {};
    obj["ques"] = ques;
    obj["ans"] = ans;
    obj["option"] = index;
    // console.log(obj);
    for (let i = 0; i < userAns.length; i++) {
      if (userAns[i].ques === ques) {
        // console.log("milgaya");
        const arr = userAns;
        arr[i] = obj;
        return this.setState({ ...this.state, userAns: arr });
      }
    }
    // console.log("no for");
    this.setState({ ...this.state, userAns: [...userAns, obj] });
  };

  handleSubmitBtn = (data) => {
    // csomponentWillUnmount();
    addDataToStore(data);
    localStorage.removeItem("timeLeft");
    localStorage.removeItem("data");
    let { userAns, count } = this.state;
    let temp = 0;

    userAns.map((res) => {
      if (res.ans) {
        temp += 1;
      }
    });
    // console.log(temp);
    this.setState({ ...this.state, isSubmitted: true, count: temp });
    console.log(userAns);
  };
  handleNextBtn = () => {
    const { currentQues, userAns } = this.state;

    this.setState({ ...this.state, currentQues: currentQues + 1 });
  };
  handlePrevBtn = () => {
    const { currentQues, userAns } = this.state;

    this.setState({ ...this.state, currentQues: currentQues - 1 });
  };

  render() {
    console.log(this.state.count);
    const { userAns, count, time } = this.state;
    const { isSubmitted, currentQues } = this.state;
    return isSubmitted ? (
      <>
        <h1>Your score is {count}</h1>
        <h3>Refresh page to give retest</h3>
      </>
    ) : (
      <div id="quiz">
        <header>
          <div>
            {currentQues + 1}/{questions.length}
          </div>
          <div>
            {time.h}:{time.m}:{time.s}
          </div>
        </header>
        <main>
          <h2>{questions[currentQues].questionText}</h2>
          <div id="options">
            {questions[currentQues].answerOptions.map((option, index) => (
              <div className="option-container" key={index}>
                <label>{index + 1}</label>
                <button
                  id={index}
                  //   className={isActive ? "correct" : null}
                  onClick={() =>
                    this.handleAnsClick(currentQues, option.isCorrect, index)
                  }
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
            <button onClick={this.handlePrevBtn}>Previous</button>
          )}
          {currentQues == questions.length - 1 ? (
            <button onClick={() => this.handleSubmitBtn(this.state)}>
              Submit
            </button>
          ) : (
            <button onClick={this.handleNextBtn}>Next</button>
          )}
        </footer>
      </div>
    );
  }
}

export default Quiz2;
