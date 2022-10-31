import React, {memo} from 'react';
import Tr from './Tr';

const Table = memo(({ onClick, tableData, dispatch }) => {
    return (
        <table onClick={onClick}>
            <thead></thead>
            <tbody>
                {Array(tableData.length).fill().map((v, i) => {
                    return <Tr key={i} rowData={tableData[i]} rowIndex = {i} dispatch = {dispatch}>{''}</Tr>
                })}
            </tbody>
        </table>
    );
});

export default Table;