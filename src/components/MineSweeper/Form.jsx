import React, { useState, useCallback, useContext, memo } from "react";
import { TableContext, START_GAME } from "./MineSweeper";

const Form = memo(() => {
    const [row, setRow] = useState(10);
    const [col, setCol] = useState(10);
    const [mine, setMine] = useState(10);
    const { dispatch } = useContext(TableContext);

    const onChangeRow = useCallback((e) => {
        setRow(e.target.value);
    }, []);

    const onChangeCol = useCallback((e) => {
        setCol(e.target.value);
    }, []);

    const onChangeMine = useCallback((e) => {
        setMine(e.target.value);
    }, []);

    const onClickBtn = useCallback(() => {
        dispatch({
            type: START_GAME,
            row,
            col,
            mine,
        });
    }, [row, col, mine]);

    return (
        <div className="form">
            <div className="input__wrap">
                <label htmlFor="row">가로 : </label>
                <input id="row" type="number" placeholder="가로" value={row} onChange={onChangeRow} />
            </div>

            <div className="input__wrap">
                <label htmlFor="col">세로 : </label>
                <input id="col" type="number" placeholder="세로" value={col} onChange={onChangeCol} />
            </div>

            <div className="input__wrap">
                <label htmlFor="mine">지뢰갯수 : </label>
                <input id="mine" type="number" placeholder="지뢰갯수" value={mine} onChange={onChangeMine} />
            </div>
            <button className="button" onClick={onClickBtn}>시작</button>
        </div>
    );
});

export default Form;