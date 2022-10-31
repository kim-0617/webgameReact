import './Lotto.css';
import Ball from './Ball';
const React = require('react');
const { Component } = React;

function getWinNumbers() {
    console.log("getNumbers()");
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const winNumbers = shuffle.slice(0, 6).sort((a, b) => a - b);
    const bonusNumber = shuffle.at(-1); // 가장 마지막 원소를 보너스 숫자로
    return [...winNumbers, bonusNumber];
}

class Lotto extends Component {
    state = {
        winNumbers: getWinNumbers(),
        winBalls: [],
        bonus: null,
        redo: false,
    }

    timeouts = [];

    runTimeouts = () => {
        const { winNumbers } = this.state;
        for (let i = 0; i < winNumbers.length - 1; i++) {
            this.timeouts[i] = setTimeout(() => {
                this.setState((prevState) => {
                    return {
                        winBalls: [...prevState.winBalls, winNumbers[i]],
                    };
                });
            }, (i + 1) * 1000);
        }

        this.timeouts[6] = setTimeout(() => {
            this.setState({
                bonus: winNumbers[6],
                redo: true,
            });
        }, 7000);
    }

    componentDidMount() {
        this.runTimeouts();
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate");
        if (this.state.winBalls.length === 0 && this.timeouts.length === 0) {
            this.runTimeouts();
        }
    }

    componentWillUnmount() {
        this.timeouts.forEach(t => clearTimeout(t));
    }

    onClick = () => {
        this.setState({
            winNumbers: getWinNumbers(),
            winBalls: [],
            bonus: null,
            redo: false,
        });
        this.timeouts = [];
    }

    render() {
        const { winBalls, bonus, redo } = this.state;
        return (
            <div className='lotto__wrap'>
                <div className='title'>당첨 숫자</div>
                <div id='result'>
                    {winBalls.map((v) => <Ball key={v} number={v} />)}
                </div>
                <div className='bonus'>보너스!</div>
                {bonus && <Ball number={bonus} />}
                {redo ? <button className='button' onClick={this.onClick}>한 번 더!</button> : null}
            </div>
        );
    }
}

const { useState, useRef, useEffect, useMemo, useCallback } = React;
// const Lotto = () => {
//     const lottoNumbers = useMemo(() => getWinNumbers(), []);
//     const [winNumbers, setWinNumbers] = useState(lottoNumbers);
//     const [winBalls, setWinBalls] = useState([]);
//     const [bonus, setBonus] = useState(null);
//     const [redo, setRedo] = useState(false);
//     const timeouts = useRef([]);

//     const runTimeouts = () => {
//         for (let i = 0; i < winNumbers.length - 1; i++) {
//             timeouts.current[i] = setTimeout(() => { // 이건 timeouts 가 바뀌는게 아님
//                 setWinBalls((prevBalls) => {
//                     return [...prevBalls, winNumbers[i]]
//                 });
//             }, (i + 1) * 1000);
//         }

//         timeouts.current[6] = setTimeout(() => {
//             setBonus(winNumbers[6]);
//             setRedo(true);
//         }, 7000);
//     }

//     useEffect(() => { // componentDidMount, componentDidUpdate 역할 (1대1 대응은 아님)
//         runTimeouts();

//         return () => { // componentWillUnMount
//             timeouts.current.forEach((t) => {
//                 clearTimeout(t);
//             });
//         }
//     }, [timeouts.current]); // 빈 배열이면 state가 뭐가 바뀌던지 한번만 실행하겠다, state를 넣으면 그 state가 변하는걸 감지해서 계속적 실행

//     /*
//     useEffect(() => {
//         // ajax
//     }, []);

//     const mounted = useRef(false);
//     useEffect(() => {
//         if(!mounted.current) {
//             mounted.current = true;
//         }
//         else {
//             // ajax
//         }
//     }, [바뀌는 값]);
//     */

//     const onClick = useCallback(() => {
//         console.log(winNumbers);
//         setWinNumbers(getWinNumbers());
//         setWinBalls([]);
//         setBonus(null);
//         setRedo(false);
//         timeouts.current = []; // 이건 바뀌는거임 직접 넣어줬기 때문에
//     }, [winNumbers]);

//     return (
//         <>
//             <div>당첨 숫자</div>
//             <div id='result'>
//                 {winBalls.map((v) => <Ball key={v} number={v} />)}
//             </div>
//             <div>보너스!</div>
//             {bonus && <Ball number={bonus} />}
//             {redo ? <button onClick={onClick}>한 번 더!</button> : null}
//         </>
//     );
// }
export default Lotto