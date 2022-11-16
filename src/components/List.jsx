import React, { useCallback } from "react";
import styles from "./List.module.css";
import { Link } from "react-router-dom";

import icon1 from "../assets/img/cha1.svg";
import icon2 from "../assets/img/cha2.svg";
import icon3 from "../assets/img/cha3.svg";
import icon4 from "../assets/img/cha4.svg";
import icon5 from "../assets/img/cha5.svg";
import icon6 from "../assets/img/cha6.svg";
import icon7 from "../assets/img/cha7.svg";
import icon8 from "../assets/img/cha8.svg";

export default function DayList() {
  const onClickIcon = useCallback((e) => {}, []);

  return (
    <React.Fragment>
      <ul className={styles.game__list}>
        <Link to={`games/gugudan`} className="icons">
          <li className={styles.category} onClick={onClickIcon}>
            <img src={icon1} alt="" />
            <span>01. 구구단 게임</span>
          </li>
        </Link>

        <Link to={`games/wordrelay`} className="icons">
          <li className={styles.category} onClick={onClickIcon}>
            <img src={icon2} alt="" />
            <span>02. 끝말잇기 게임</span>
          </li>
        </Link>

        <Link to={`games/numberbaseball`} className="icons">
          <li className={styles.category} onClick={onClickIcon}>
            <img src={icon3} alt="" />
            <span>03. 숫자야구 게임</span>
          </li>
        </Link>

        <Link to={`games/reactTest`} className="icons">
          <li className={styles.category} onClick={onClickIcon}>
            <img src={icon4} alt="" />
            <span>04. 반응속도 테스트 게임</span>
          </li>
        </Link>

        <Link to={`games/rsp`} className="icons">
          <li className={styles.category} onClick={onClickIcon}>
            <img src={icon5} alt="" />
            <span>05. 가위 바위 보 게임</span>
          </li>
        </Link>

        <Link to={`games/lotto`} className="icons">
          <li className={styles.category} onClick={onClickIcon}>
            <img src={icon6} alt="" />
            <span>06. 로또 추첨 게임</span>
          </li>
        </Link>

        <Link to={`games/tictactoe`} className="icons">
          <li className={styles.category} onClick={onClickIcon}>
            <img src={icon7} alt="" />
            <span>07. 틱택토 게임</span>
          </li>
        </Link>

        <Link to={`games/minesweeper`} className="icons">
          <li className={styles.category} onClick={onClickIcon}>
            <img src={icon8} alt="" />
            <span>08. 지뢰찾기 게임</span>
          </li>
        </Link>
      </ul>
    </React.Fragment>
  );
}
