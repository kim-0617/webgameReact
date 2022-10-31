import React, {memo} from 'react';
import Td from './Td';

const Tr = memo(({ rowData, rowIndex, dispatch }) => {
    console.log("Tr rendering");
    return (
        <tr>
            {Array(rowData.length).fill().map((v, i) => {
                return <Td key={i} rowIndex={rowIndex} cellIndex={i} cellData = {rowData[i]} dispatch = {dispatch}>{''}</Td>
            })}
        </tr>
    );
});

export default Tr;