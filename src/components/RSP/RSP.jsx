import "./RSP.css";
import rsp from "../../assets/img/rsp.png";
// import useInterval from './useinterval';
const React = require("react");
const { Component } = React;

// 라이프 사이클 : constructor => render => ref => componentDidMount => state / props 바뀔 때 shouldComponentUpdate => (reRendering)
// componentDidUpdate => componentWillUnmount => 소멸
const rspCoord = {
  rock: "0",
  scissor: "-142px",
  paper: "-296px",
};
const score = {
  rock: 1,
  scissor: 0,
  paper: -1,
};
const computerChoice = (imgCoord) => {
  let answer = "";
  Object.entries(rspCoord).forEach((Coord) => {
    if (Coord[1] === imgCoord) answer = Coord[0];
  });
  return answer;
};
class RSP extends Component {
  state = {
    result: "",
    imgCoord: "0",
    score: 0,
  };

  interval;

  clickable = true;

  changeHand = () => {
    if (rspCoord.rock === this.state.imgCoord) {
      this.setState({ imgCoord: rspCoord.scissor });
    } else if (rspCoord.scissor === this.state.imgCoord) {
      this.setState({ imgCoord: rspCoord.paper });
    } else if (rspCoord.paper === this.state.imgCoord) {
      this.setState({ imgCoord: rspCoord.rock });
    }
  };

  componentDidMount() {
    // 컴포넌트가 Dom에 붙었을 때 (첫 개시 때), 비동기 요청을 많이 함
    this.interval = setInterval(this.changeHand, 100);
  }

  onClickBtn = (e) => {
    if (!this.clickable) return;

    this.clickable = false;
    clearInterval(this.interval);
    const myChoice = score[e.target.id];
    const cpuChoice = score[computerChoice(this.state.imgCoord)];
    const diff = myChoice - cpuChoice;

    if (diff === 0) {
      this.setState({ result: "비겼습니다!" });
    } else if ([1, -2].includes(diff)) {
      this.setState((prevState) => {
        return { result: "이겼습니다!", score: prevState.score + 1 };
      });
    } else {
      this.setState((prevState) => {
        return { result: "졌습니다!", score: prevState.score - 1 };
      });
    }

    setTimeout(() => {
      this.interval = setInterval(this.changeHand, 100);
      this.clickable = true;
    }, 2000);
  };

  render() {
    return (
      <div className="rsp__wrap">
        <div
          id="computer"
          style={{
            background: `url(${rsp}) ${this.state.imgCoord} 0`,
          }}
        />
        <div>
          <button id="rock" className="button" onClick={this.onClickBtn}>
            바위
          </button>
          <button id="scissor" className="button" onClick={this.onClickBtn}>
            가위
          </button>
          <button id="paper" className="button" onClick={this.onClickBtn}>
            보
          </button>
        </div>
        <div className="rsp__result">{this.state.result}</div>
        <div className="rsp__score">현재 {this.state.score}점</div>
      </div>
    );
  }
}

// const { useState, useRef, useEffect } = React;
// const RSP = () => {
//     const [result, setResult] = useState('');
//     const [imgCoord, setImgCoord] = useState('0');
//     const [_score, setScore] = useState(0);
//     // const clickable = useRef(true);
//     // const interval = useRef();

//     // useEffect(() => { // componentDidMount, componentDidUpdate 역할 (1대1 대응은 아님)
//     //     interval.current = setInterval(changeHand, 100);

//     //     return () => { // componentWillUnMount
//     //         clearInterval(interval.current);
//     //     }
//     // }, [imgCoord]); // 빈 배열이면 state가 뭐가 바뀌던지 한번만 실행하겠다, state를 넣으면 그 state가 변하는걸 감지해서 계속적 실행

//     const [isRunning, setIsRunning] = useState(true);
//     const changeHand = () => {
//         if (rspCoord.rock === imgCoord) {
//             setImgCoord(rspCoord.scissor);
//         }
//         else if (rspCoord.scissor === imgCoord) {
//             setImgCoord(rspCoord.paper);
//         }
//         else if (rspCoord.paper === imgCoord) {
//             setImgCoord(rspCoord.rock);
//         }
//     }

//     useInterval(changeHand, isRunning ? 100 : null);

//     const onClickBtn = (choice) => () => {
//         if (isRunning) {
//             // clickable.current = false;
//             // clearInterval(interval.current);
//             setIsRunning(false);
//             const myChoice = score[choice];
//             const cpuChoice = score[computerChoice(imgCoord)];
//             const diff = myChoice - cpuChoice;
//             if (diff === 0) {
//                 setResult('비겼습니다!');
//             }
//             else if ([1, -2].includes(diff)) {
//                 setResult('이겼습니다!');
//                 setScore((prevScore) => {
//                     return prevScore + 1;
//                 });
//             }
//             else {
//                 setResult('졌습니다!');
//                 setScore((prevScore) => {
//                     return prevScore - 1;
//                 });
//             }

//             setTimeout(() => {
//                 // interval.current = setInterval(changeHand, 100);
//                 // clickable.current = true;
//                 setIsRunning(true);
//             }, 2000);
//         }
//     }

//     return (
//         <>
//             <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
//             <div>
//                 <button id="rock" className="btn" onClick={onClickBtn('rock')}>바위</button>
//                 <button id="scissor" className="btn" onClick={onClickBtn('scissor')}>가위</button>
//                 <button id="paper" className="btn" onClick={onClickBtn('paper')}>보</button>
//             </div>
//             <div>{result}</div>
//             <div>현재 {_score}점</div>
//         </>
//     );
// }
export default RSP;
