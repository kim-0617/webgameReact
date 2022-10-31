import React, { Component, memo } from "react";
import styles from './NumberBaseball.module.css';

// class Try extends Component {
//     render() {
//         return (
//             <li key = {this.props.value.tries + this.props.value.result}>
//                 {this.props.index + 1}번째 시도 : {this.props.value.tries} // {this.props.value.result}
//             </li>
//         );
//     }
// }

const Try = memo((props) => {
    return (
        <li className={styles.item} key={props.value.tries + props.value.result}>
            {props.index + 1}번째 시도 : {props.value.tries} // {props.value.result}
        </li>
    );
});
Try.displayName = "Try"; // 메모를 씌우면 컴포넌트 이름이 바뀜
export default Try;