import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmptyPage from './components/EmptyPage';
import Header from './components/Header';
import Main from './components/Main';
import List from './components/List';

import GuGuDan from './components/GuGuDan/GuGuDan';
import WordRelay from './components/WordRelay/WordRelay';
import NumberBaseball from './components/NumberBaseball/NumberBaseball';
import ReactTest from './components/ReactTest/ReactTest';
import RSP from './components/RSP/RSP';
import Lotto from './components/Lotto/Lotto';
import TicTacToe from './components/TicTacToe/TicTacToe';
import MineSweeper from './components/MineSweeper/MineSweeper';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <List />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/games/gugudan' element={<GuGuDan />} />
          <Route path='/games/wordrelay' element={<WordRelay />} />
          <Route path='/games/numberBaseball' element={<NumberBaseball />} />
          <Route path='/games/reacttest' element={<ReactTest />} />
          <Route path='/games/rsp' element={<RSP />} />
          <Route path='/games/lotto' element={<Lotto />} />
          <Route path='/games/tictactoe' element={<TicTacToe />} />
          <Route path='/games/minesweeper' element={<MineSweeper />} />
          <Route path='*' element={<EmptyPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;