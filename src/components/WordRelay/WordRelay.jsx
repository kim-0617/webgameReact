import styles from "./WordRelay.module.css";
const React = require("react");
// const { Component } = React;

// class WordRelay extends Component {
//     state = { // 바뀌는 부분을 state
//         word: "제로초",
//         value: '',
//         result: '',
//     };

//     input;
//     onRefInput = (c) => {
//         this.input = c;
//     }

//     onSubmit = (e) => {
//         e.preventDefault();
//         if (e.target[0].value.startsWith(this.state.word.at(-1))) { // input의 value의 첫글자가 word의 끝글자와 같으면
//             this.setState({
//                 word: e.target[0].value,
//                 value: '',
//                 result: '딩동댕!',
//             });
//             this.input.focus();
//         }
//         else {
//             this.setState({
//                 value: '',
//                 result: '땡!',
//             });
//             this.input.focus();
//         }
//     }

//     onChange = (e) => {
//         this.setState({ value: e.target.value });
//     }

//     render() {
//         return (
//             <>
//                 <p>{this.state.word}</p>
//                 <form onSubmit={this.onSubmit}>
//                     <input type="text" onChange={this.onChange} ref={this.onRefInput} value={this.state.value} />
//                     <input type="submit" value="입력" />
//                 </form>
//                 <p>{this.state.result}</p>
//             </>
//         );
//     }
// }

const { useState, useRef } = React;
const WordRelay = () => {
  const [word, setWord] = useState("리액트");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const inputRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!(e.target[0].value.length >= 2 && e.target[0].value.length <= 3)) {
      alert("2글자 혹은 3글자만 가능합니다.");
      setValue("");
      return;
    }
    if (e.target[0].value.startsWith(word.at(-1))) {
      // input의 value의 첫글자가 word의 끝글자와 같으면
      setWord(value);
      setValue("");
      setResult("딩동댕!");
      inputRef.current.focus();
    } else {
      setValue("");
      setResult("땡!");
      inputRef.current.focus();
    }
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.wrap}>
      <p className={styles.word}>{word}</p>
      <form onSubmit={onSubmit} className={styles.form}>
        <input
          className={styles.value}
          type="text"
          onChange={onChange}
          ref={inputRef}
          value={value}
        />
        <input className={styles.button} type="submit" value="입력" />
      </form>
      <p className={styles.result}>{result}</p>
    </div>
  );
};
export default WordRelay;
