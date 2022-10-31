import './MineSweeper.css';
import React from 'react';
import Table from './Table';
import Form from './Form'

const { useState, useRef, useEffect, useMemo, useCallback, useReducer, memo, createContext } = React;

export const TableContext = createContext({
    tableData: [],
    halted: true,
    dispatch: () => { },
});
export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICK_MINE: -6,
    OPENED: 0,
}
export const START_GAME = 'START_GAME';
export const FLAG_CELL = 'FLAG_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const OPEN_CELL = 'OPEN_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

const initialstate = {
    tableData: [],
    timer: 0,
    result: '',
    halted: true,
    data: {
        row: 0,
        col: 0,
        mine: 0,
    },
    openedCount: 0,
    timer: 0,
}

const reducer = (state, action) => {
    switch (action.type) {
        case START_GAME:
            return {
                ...state,
                data: {
                    row: action.row,
                    col: action.col,
                    mine: action.mine
                },
                halted: false,
                tableData: plateMine(action.row, action.col, action.mine),
                openedCount: 0,
                timer: 0,
            };
        case INCREMENT_TIMER:
            return {
                ...state,
                timer: state.timer + 1,
            }
        case OPEN_CELL: {
            const tableData = [...state.tableData];
            tableData.forEach((row, i) => {
                tableData[i] = [...row];
            });
            let winCheck = 0;

            const checked = [];
            const checkAround = (row, col) => {
                // 상하좌우 없는 칸은 안열기
                if (row < 0 || row >= tableData.length || col < 0 || col >= tableData[0].length) return;

                // 닫힌 칸만 열기
                if ([CODE.OPENED, CODE.QUESTION, CODE.QUESTION_MINE, CODE.FLAG, CODE.FLAG_MINE].includes(tableData[row][col])) return;

                // 체크한 칸은 안열기
                if (checked.includes(row + ',' + col)) return;
                else checked.push(row + ',' + col);

                // 주변칸 지뢰 갯수 표시
                let around = [];
                if (tableData[row - 1]) {
                    around = around.concat(
                        tableData[row - 1][col - 1],
                        tableData[row - 1][col],
                        tableData[row - 1][col + 1],
                    );
                }

                around = around.concat(
                    tableData[row][col - 1],
                    tableData[row][col + 1],
                );

                if (tableData[row + 1]) {
                    around = around.concat(
                        tableData[row + 1][col - 1],
                        tableData[row + 1][col],
                        tableData[row + 1][col + 1],
                    );
                }
                let count = around.filter(cell => [CODE.MINE, CODE.QUESTION_MINE, CODE.FLAG_MINE].includes(cell)).length;
                if (tableData[row][col] === CODE.NORMAL) winCheck += 1; // 열린칸이 아니면 카운트 증가
                tableData[row][col] = count;

                if (count === 0) { // 지뢰가 아니라는건 주변칸 오픈
                    if (row > -1) {
                        const near = [];
                        if (row - 1 > -1) { // 위칸이 있으면 data push
                            near.push([row - 1, col - 1]);
                            near.push([row - 1, col]);
                            near.push([row - 1, col + 1]);
                        }
                        near.push([row, col - 1]);
                        near.push([row, col + 1]);
                        if (row + 1 < tableData.length) {
                            near.push([row + 1, col - 1]);
                            near.push([row + 1, col]);
                            near.push([row + 1, col + 1]);
                        }
                        near.forEach((data) => {
                            if (tableData[data[0]][data[1]] !== CODE.OPENED) {
                                checkAround(data[0], data[1]);
                            };
                        });
                    }
                }
            }
            checkAround(action.row, action.col);
            let halted = false;
            let result = "";
            if (state.data.row * state.data.col - state.data.mine === state.openedCount + winCheck) {
                halted = true;
                result = `${state.timer}초 만에 승리하셨습니다.`;
            }
            return {
                ...state,
                tableData,
                openedCount: state.openedCount + winCheck,
                halted,
                result,
            };
        }
        case CLICK_MINE: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.col] = CODE.CLICK_MINE;
            return {
                ...state,
                tableData,
                halted: true,
            };
        }
        case FLAG_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.col] === CODE.MINE) {
                tableData[action.row][action.col] = CODE.FLAG_MINE;
            }
            else {
                tableData[action.row][action.col] = CODE.FLAG;
            }
            return {
                ...state,
                tableData,
            };
        }
        case QUESTION_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.col] === CODE.FLAG_MINE) {
                tableData[action.row][action.col] = CODE.QUESTION_MINE;
            }
            else {
                tableData[action.row][action.col] = CODE.QUESTION;
            }
            return {
                ...state,
                tableData,
            };
        }
        case NORMALIZE_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            console.log()
            if (tableData[action.row][action.col] === CODE.QUESTION_MINE) {
                tableData[action.row][action.col] = CODE.MINE;
            }
            else {
                tableData[action.row][action.col] = CODE.NORMAL;
            }
            return {
                ...state,
                tableData,
            };
        }
        default:
            return state;
    }
}

const plateMine = (row, col, mine) => {
    console.log(row, col, mine);
    const candidate = Array(row * col).fill().map((v, i) => i);
    const shuffle = [];
    while (candidate.length > row * col - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }

    const data = [];
    for (let i = 0; i < row; i++) {
        const rowData = [];
        data.push(rowData);
        for (let j = 0; j < col; j++) {
            rowData.push(CODE.NORMAL);
        }
    }
    for (let k = 0; k < shuffle.length; k++) {
        const split = shuffle[k].toString().split('');
        const ver = parseInt(split[0]) || 0;
        const hor = parseInt(split[1]) || 0;

        data[ver][hor] = CODE.MINE;
    }
    return data;
}

const MineSweeper = memo(() => {
    const [state, dispatch] = useReducer(reducer, initialstate);

    // context는 랜더링 될 때 마다 새로운 객체를 생성하므로 그 때 마다 자식 컴포넌트의 랜더링이 필연적이다.
    // 따라서 성능 최적화를 위해 useMemo로 값을 기억한다. 또한 dispatch는 바뀌는 값이 아니다.
    const value = useMemo(() => ({ tableData: state.tableData, halted: state.halted, dispatch }), [state.tableData, state.halted]);

    useEffect(() => {
        let timer = '';
        if (state.halted === false) {
            timer = setInterval(() => {
                dispatch({ type: INCREMENT_TIMER, });
            }, 1000);
        }
        return () => {
            clearInterval(timer);
        }
    }, [state.halted]);
    return (
        <TableContext.Provider value={value}>
            <div className='m__wrap'>
                <Form />
                <div className='timer'>{state.timer}</div>
                <Table />
                <div className='result'>{state.result}</div>
            </div>
        </TableContext.Provider>
    );
});
export default MineSweeper