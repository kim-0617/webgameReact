import React, { memo, useCallback, useContext, useMemo } from 'react';
import { TableContext, CODE, OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL } from './MineSweeper';

const getTdStyle = (code) => {
    switch (code) {
        case CODE.NORMAL:
        case CODE.MINE:
            return {
                background: '#555',
            }
        case CODE.CLICK_MINE:
        case CODE.OPENED:
            return {
                background: '#FFF',
            }
        case CODE.FLAG:
        case CODE.FLAG_MINE:
            return {
                background: 'red',
            }
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
            return {
                background: 'yellow',
            }
        default:
            return {
                background: '#FFF',
            }
    }
};

const getTdText = (code) => {
    console.log("getTdText");
    switch (code) {
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            return 'X';
        case CODE.CLICK_MINE:
            return '펑!';
        case CODE.FLAG:
        case CODE.FLAG_MINE:
            return '!';
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
            return '?';
        default:
            return code || '';
    }
}

const Td = memo(({ rowIndex, colIndex }) => {
    const { tableData, dispatch, halted } = useContext(TableContext);

    const onClickTd = useCallback(() => {
        console.log("onClickTd");
        if (halted) return;
        // console.log(tableData[rowIndex][colIndex])
        switch (tableData[rowIndex][colIndex]) {
            case CODE.OPENED:
            case CODE.FLAG:
            case CODE.FLAG_MINE:
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
                return;

            case CODE.NORMAL:
                dispatch({
                    type: OPEN_CELL,
                    row: rowIndex,
                    col: colIndex,
                }, []);
                return;
            case CODE.MINE:
                dispatch({
                    type: CLICK_MINE,
                    row: rowIndex,
                    col: colIndex,
                });
                return;
            default:
                return;
        }
    }, [tableData[rowIndex][colIndex], halted]);

    const onRightClickTd = useCallback((e) => {
        e.preventDefault();
        if (halted) return;
        switch (tableData[rowIndex][colIndex]) {
            case CODE.NORMAL:
            case CODE.MINE:
                dispatch({
                    type: FLAG_CELL,
                    row: rowIndex,
                    col: colIndex,
                });
                return;
            case CODE.FLAG:
            case CODE.FLAG_MINE:
                dispatch({
                    type: QUESTION_CELL,
                    row: rowIndex,
                    col: colIndex,
                });
                return;
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
                dispatch({
                    type: NORMALIZE_CELL,
                    row: rowIndex,
                    col: colIndex,
                });
                return;
            default:
                return;
        }
    }, [tableData[rowIndex][colIndex], halted]);

    return useMemo(() => (
        <td style={getTdStyle(tableData[rowIndex][colIndex])} onClick={onClickTd} onContextMenu={onRightClickTd}>{getTdText(tableData[rowIndex][colIndex])}</td>
    ), [tableData[rowIndex][colIndex]]);
});

export default Td;