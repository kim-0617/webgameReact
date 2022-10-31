import React, { Component } from 'react';
import Try from './try';
import styles from './NumberBaseball.module.css';

function getNumbers() { // 숫자 4개를 랜덤하게 뽑는 함수
    console.log("함수실행")
    const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return Array.from(Array(4).keys(), x => x + 1).map((y) => {
        return candidate.splice(Math.floor(Math.random() * candidate.length), 1);
    });
}

class NumberBaseball extends Component {
    state = {
        result: '',
        value: '',
        tries: [],
        answer: getNumbers().join(''),
    };

    input;
    onInputRef = (c) => {
        this.input = c;
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.answer === e.target[0].value) {
            this.setState({
                result: '홈런!',
                tries: [...this.state.tries, { tries: this.state.value, result: "홈런!" },],
            });
            alert("홈런! 게임을 다시 시작합니다.");
            this.setState({
                value: '',
                tries: [],
                answer: getNumbers().join(''),
            });
            this.input.focus();
        }
        else {
            const myInput = this.state.value.split('').map(x => parseInt(x));
            let ball = 0, strike = 0;

            if (this.state.tries.length >= 9) { // 10번 이상 틀렸을 때
                this.setState({
                    result : '실패!',
                    value: '',
                    tries: [],
                    answer: getNumbers().join(''),
                });
                alert("기회가 소진 되었습니다. 다시 시작합니다.");
                this.input.focus();
            }
            else {
                this.state.answer.split('').map((x, idx) => {
                    if(parseInt(x) === myInput[idx]) strike++;
                    else if(myInput.includes(parseInt(x))) ball++;
                });
                this.setState({
                    result : '',
                    value: '',
                    tries: [...this.state.tries, { tries: this.state.value, result: `${ball}볼 ${strike}스트라이크` }],
                });
                this.input.focus();
            }
        }
    }

    onChange = (e) => {
        console.log(this.state.answer)
        this.setState({ value: e.target.value });
    }

    render() {
        return (
            <div className={styles.wrap}>
                <h1 className={styles.title}>{this.state.result}</h1>
                <form onSubmit={this.onSubmit} className={styles.form}>
                    <input className={styles.input} type="number" maxLength={4} ref={this.onInputRef} value={this.state.value} onChange={this.onChange} />
                    <input className={styles.button} type="submit" value="제출" />
                </form>
                <div className={styles.tries}>시도 : {this.state.tries.length}</div>
                <ul>
                    {
                        this.state.tries.map((v, i) => {
                            return <Try key={v.tries + v.result + i} value={v} index={i} />;
                        })
                    }
                </ul>
            </div>
        );
    }
}

// const { useState, useRef, memo } = React;
// import { useState, useRef } from 'react';
// const NumberBaseball = memo(() => {
//     const [result, setResult] = useState('');
//     const [value, setValue] = useState('');
//     const [tries, setTries] = useState([]);
//     const [answer, setAnswer] = useState(getNumbers); // 함수 자체를 넣으면 한번만 렌더링된다. (lazy-init)
//     const inputRef = useRef(null);

//     const onSubmit = (e) => {
//         e.preventDefault();
//         if (answer.join('') === e.target[0].value) {
//             setResult('홈런!');
//             setTries((prevState) => {
//                 return [...prevState, { tries: value, result: "홈런!" },]
//             });

//             setTimeout(() => {
//                 alert("홈런! 게임을 다시 시작합니다.");
//                 setValue('');
//                 setResult('');
//                 setTries([]);
//                 setAnswer(getNumbers()); // 이자리에는 함수의 return 값 넣어야 함
//                 inputRef.current.focus();
//             }, 500);
//         }
//         else {
//             const myInput = value.split('').map(x => parseInt(x));
//             let ball = 0, strike = 0;

//             if (tries.length >= 9) { // 10번 이상 틀렸을 때
//                 setResult('실패!');

//                 setTimeout(() => {
//                     alert("기회가 소진 되었습니다. 다시 시작합니다.");
//                     setResult('');
//                     setValue('');
//                     setTries([]);
//                     setAnswer(getNumbers());
//                     inputRef.current.focus();
//                 }, 500);
//             }
//             else {
//                 answer.map((x, idx) => {
//                     if (parseInt(x) === myInput[idx]) strike++;
//                     else if (myInput.includes(parseInt(x))) ball++;
//                 });
//                 setResult('');
//                 setValue('');
//                 setTries((prevState) => {
//                     return [...prevState, { tries: value, result: `${ball}볼 ${strike}스트라이크` },]
//                 });
//                 inputRef.current.focus();
//             }
//         }
//     }

//     const onChange = (e) => {
//         console.log(answer)
//         setValue(e.target.value);
//     }

//     return (
//         <>
//             <h1>{result}</h1>
//             <form onSubmit={onSubmit}>
//                 <input type="text" maxLength={4} ref={inputRef} value={value} onChange={onChange} />
//                 <input type="submit" value="제출" style={{ marginLeft: "20px" }} />
//             </form>
//             <div>시도 : {tries.length}</div>
//             <ul>
//                 {
//                     tries.map((v, i) => {
//                         return <Try key={v.tries + v.result + i} value={v} index={i} />;
//                     })
//                 }
//             </ul>
//         </>
//     );
// });

// const NumberBaseball = () => {
//     const [answer, setAnswer] = useState(getNumbers());
//     const [value, setValue] = useState('');
//     const [result, setResult] = useState('');
//     const [tries, setTries] = useState([]);
//     const inputEl = useRef(null);

//     const onSubmitForm = (e) => {
//         e.preventDefault();
//         if (value === answer.join('')) {
//             setTries((t) => ([
//                 ...t,
//                 {
//                     try: value,
//                     result: '홈런!',
//                 }
//             ]));
//             setResult('홈런!');
//             alert('게임을 다시 실행합니다.');
//             setValue('');
//             setAnswer(getNumbers());
//             setTries([]);
//             inputEl.current.focus();
//         } else {
//             const answerArray = value.split('').map((v) => parseInt(v));
//             let strike = 0;
//             let ball = 0;
//             if (tries.length >= 9) {
//                 setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`); // state set은 비동기
//                 alert('게임을 다시 시작합니다.');
//                 setValue('');
//                 setAnswer(getNumbers());
//                 setTries([]);
//                 inputEl.current.focus();
//             } else {
//                 console.log('답은', answer.join(''));
//                 for (let i = 0; i < 4; i += 1) {
//                     if (answerArray[i] === Number(answer[i])) {
//                         console.log('strike', answerArray[i], answer[i]);
//                         strike += 1;
//                     } else if (answer.join('').split('').includes(String([answerArray[i]]))) {
//                         console.log('ball', answerArray[i], answer.indexOf(answerArray[i]));
//                         ball += 1;
//                     }
//                 }
//                 setTries(t => ([
//                     ...t,
//                     {
//                         try: value,
//                         result: `${strike} 스트라이크, ${ball} 볼입니다.`,
//                     }
//                 ]));
//                 setValue('');
//                 inputEl.current.focus();
//             }
//         }
//     };

//     const onChangeInput = (e) => setValue(e.target.value);

//     return (
//         <>
//             <h1>{result}</h1>
//             <form onSubmit={onSubmitForm}>
//                 <input
//                     ref={inputEl}
//                     maxLength={4}
//                     value={value}
//                     onChange={onChangeInput}
//                 />
//                 <button>입력!</button>
//             </form>
//             <div>시도: {tries.length}</div>
//             <ul>
//                 {tries.map((v, i) => (
//                     <Try key={v.try + v.result + i} value = {v} index = {i}/>
//                 ))}
//             </ul>
//         </>
//     );
// };

export default NumberBaseball;