import React, { memo, useContext } from 'react';
import { TableContext } from './MineSweeper';
import Tr from './Tr';

const Table = memo(() => {
    const { tableData } = useContext(TableContext);
    return (
        <table>
            <thead></thead>
            <tbody>
                {Array(tableData.length).fill().map((tr, i) => {
                    return <Tr key={i} rowIndex = {i}/>
                })}
            </tbody>
        </table>
    );
});

export default Table;