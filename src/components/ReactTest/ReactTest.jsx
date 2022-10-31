import './ReactTest.css';
const React = require('react');
const { Component } = React;

class ReactTest extends Component {
    state = {
        state : "waiting",
        message : "클릭해서 시작하세요!",
        result : [],
    }

    timeout;
    time;
    onClick = (e) => {
        const { state, message, result } = this.state;

        if(state === 'waiting') {
            this.setState({state : 'ready', message : "초록색이 되면 클릭하세요!"});
            this.timeout = setTimeout(() => {
                this.setState({state : 'now', message : "지금 클릭하세요!"});
                this.time = new Date();
            }, Math.random() * 1000 + 1000); // 1 ~ 2 초 사이
        }
        else if(state === 'ready') {
            this.setState({state : 'waiting', message : "성급한 클릭! 다시시작하세요",});
            clearTimeout(this.timeout);
        }
        else if(state === 'now') {
            this.time = Math.floor(new Date() - this.time);
            this.setState((prevState) => {
                return {state : 'waiting', message : "클릭해서 시작하세요!", result : [...prevState.result, this.time]}
            });
        }
    }

    render() {
        return (
            <div className='wrap'>
                <div id='screen' className={this.state.state} onClick={this.onClick}>{this.state.message}</div>
                {this.state.result.length === 0 ? null : <p className='time'>평균시간 : {Math.floor(this.state.result.reduce((prev, curr) => prev += curr, 0) / this.state.result.length) || 0}ms</p>}
            </div>
        );
    }
}

// const { useState, useRef } = React;
// const ReactTest = () => {
//     const [state, setState] = useState("waiting");
//     const [message, setMessage] = useState("클릭해서 시작하세요!");
//     const [result, setResult] = useState([]);
//     const timeout = useRef(null);
//     const startTime = useRef();

//     const onClick = (e) => {
//         if (state === 'waiting') {
//             setState('ready');
//             setMessage("초록색이 되면 클릭하세요!");
//             timeout.current = setTimeout(() => {
//                 setState('now');
//                 setMessage("지금 클릭하세요!");
//                 startTime.current = new Date();
//             }, Math.random() * 1000 + 1000); // 1 ~ 2 초 사이
//         }
//         else if (state === 'ready') {
//             setState('waiting');
//             setMessage("성급한 클릭! 다시시작하세요");
//             clearTimeout(timeout.current);
//         }
//         else if (state === 'now') {
//             setState('waiting');
//             setMessage("클릭해서 시작하세요!");
//             setResult((prevResult) => {
//                 return [...prevResult, Math.floor(new Date() - startTime.current)];
//             });
//         }
//     }

//     return (
//         <div id='wrap'>
//             <div id='screen' className={state} onClick={onClick}>{message}</div>
//             {result.length === 0 ? null : <p>평균시간 : {Math.floor(result.reduce((prev, curr) => prev += curr, 0) / result.length) || 0}ms</p>}
//         </div>
//     );
// }
export default ReactTest