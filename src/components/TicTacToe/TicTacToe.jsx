import './TicTacToe.css';
import React from 'react';
import Table from './Table';

// class TicTacToe extends Component {
//     state = {

//     }

//     render() {
//         return (
//             <>
//                 HelloWorld
//             </>
//         );
//     }
// }

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

const { useState, useRef, useEffect, useMemo, useCallback, useReducer, memo } = React;
const TicTacToe = memo(() => {
    // const [winner, setWinner] = useState('');
    // const [turn, setTurn] = useState('O');
    // const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', ''],]);
    const initialState = {
        winner: '',
        turn: 'O',
        tableData: [['', '', ''], ['', '', ''], ['', '', ''],],
        recentCell: [-1, -1],
    };

    const reducer = (state, action) => { // action 객체를 어떻게 바꿀지 여기서 써준다.
        switch (action.type) {
            // winner = action.winner 이렇게 직접 바꾸면 안됨, 새로 객체를 만들어서 바뀐값만
            case SET_WINNER:
                return { // state를 어떻게 바꿀지 기술
                    ...state,
                    winner: action.winner,
                };
            case CLICK_CELL:
                const tableData = [...state.tableData];
                tableData[action.row] = [...tableData[action.row]];
                tableData[action.row][action.cell] = state.turn;
                return {
                    ...state,
                    tableData,
                    recentCell: [action.row, action.cell],
                };
            case CHANGE_TURN:
                return {
                    ...state,
                    turn: state.turn === 'O' ? 'X' : 'O',
                };
            case RESET_GAME:
                return {
                    ...state,
                    winner: '',
                    turn: 'O',
                    tableData: [['', '', ''], ['', '', ''], ['', '', ''],],
                    recentCell: [-1, -1],
                };
            default:
                return state;
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState);
    const { winner, turn, tableData, recentCell } = state;

    useEffect(() => {
        let [row, cell] = recentCell;
        if (row < 0) return;
        let win = false;

        if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) win = true;
        if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) win = true;
        if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) win = true;
        if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) win = true;

        if (win) {
            dispatch({ // action 객체
                type: SET_WINNER,
                winner: turn,
            });
            setTimeout(() => {
                dispatch({ // action 객체
                    type: RESET_GAME,
                });
            }, 1000);
        }
        else { // 무승부 검사
            let filled = true;
            tableData.forEach((tr) => {
                tr.forEach((td) => {
                    if (!td) filled = false;
                });
            });
            if (filled) { // 무승부
                dispatch({ // action 객체
                    type: SET_WINNER,
                    winner: 'draw',
                });
                setTimeout(() => {
                    dispatch({ // action 객체
                        type: RESET_GAME,
                    });
                }, 1000);
            }

            dispatch({ // action 객체
                type: CHANGE_TURN,
            });
        }
    }, [recentCell]);

    return (
        <div className='t__wrap'>
            <Table tableData={tableData} dispatch={dispatch} />
            {winner && (winner === 'draw' ? <div className='result'>무승부</div> : <div>{winner}님의 승리!</div>)}
        </div>
    );
});
export default TicTacToe