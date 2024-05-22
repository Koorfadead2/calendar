import { Route, Routes } from 'react-router-dom'
import './App.css'
import CardDay from './Components/CardDay/CardDay'
import React, { Suspense, useState } from 'react'
import Header from './Components/Header/Header';

const Notes = React.lazy(() => import("./Components/Notes/Notes"));

function App() {
  const [noteData, setNoteData] = useState([{
    id: null,
    title: null,
    description: null,
    startTime: null,
    endTime: null,
    importance: null
  }]);
  return (
    <div className='appWrapper'>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <div className='appWrapperContent'>
          <Routes>
            <Route path='/' element={<CardDay noteData={noteData} setNoteData={setNoteData}/>} />
            <Route path='/note/:id' element={<Notes noteData={noteData}/>} />
          </Routes>
        </div>
      </Suspense>
    </div>
  )
}

export default App
