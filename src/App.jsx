import { Route, Routes } from 'react-router-dom'
import './App.css'
import CardDay from './Components/CardDay/CardDay'
import React, { Suspense } from 'react'

const Notes = React.lazy(()=>import("./Components/Notes/Notes"));

function App() {
  return (
    <div className='appWrapper'>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<CardDay />} />
          <Route path='/note/:id' element={<Notes />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
