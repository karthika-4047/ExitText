import React from 'react'
import Home from './components/Home'
import { Routes, Route } from 'react-router-dom';
import TodoDash from './components/TodoDash';

const App = () => {
  return (
    <div>
     
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/dash' element={<TodoDash/>} />
      </Routes>
    </div>
  )
}

export default App