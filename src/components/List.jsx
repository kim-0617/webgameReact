import React from "react";
import styles from './List.module.css';
import { Link } from 'react-router-dom';

export default function DayList() {
    return (
        <React.Fragment>
            <ul className={styles.game__list}>
                <li className={styles.category}><Link to={`games/gugudan`}>01. 구구단 게임</Link></li>
                <li className={styles.category}><Link to={`games/wordrelay`}>02. 끝말잇기 게임</Link></li>
                <li className={styles.category}><Link to={`games/numberbaseball`}>03. 숫자야구 게임</Link></li>
                <li className={styles.category}><Link to={`games/reactTest`}>04. 반응속도 테스트 게임</Link></li>
                <li className={styles.category}><Link to={`games/rsp`}>05. 가위 바위 보 게임</Link></li>
                <li className={styles.category}><Link to={`games/lotto`}>06. 로또 추첨 게임</Link></li>
                <li className={styles.category}><Link to={`games/tictactoe`}>07. 틱택토 게임</Link></li>
                <li className={styles.category}><Link to={`games/minesweeper`}>08. 지뢰찾기 게임</Link></li>
            </ul>
        </React.Fragment>
    );
}