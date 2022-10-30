import React from "react";
import styles from './List.module.css';
import { Link } from 'react-router-dom';

export default function DayList() {
    return (
        <React.Fragment>
            <ul className={styles.game__list}>
                <li className={styles.category}><Link to={`games/01`}>01. 구구단 게임</Link></li>
            </ul>
        </React.Fragment>
    );
}