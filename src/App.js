import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmptyPage from './components/EmptyPage';
import Header from './components/Header';
import List from './components/List';
import GuGuDan from './components/GuGuDan/GuGuDan';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<List />} />
          <Route path='/games/:games' element={<GuGuDan />} />
          <Route path='*' element={<EmptyPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
