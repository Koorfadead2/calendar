import { Route, Routes } from 'react-router-dom'
import './App.css'
import {CardDay} from './Components/CardDay/CardDay'
import {Notes} from './Components/Notes/Notes'
import React, { Suspense, useState } from 'react'
import Header from './Components/Header/Header';

function App() {
  return (
    <div className='appWrapper'>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <div className='appWrapperContent'>
          <Routes>
            <Route path='/' element={<CardDay />} />
            <Route path='/note/:id' element={<Notes />} />
          </Routes>
        </div>
      </Suspense>
    </div>
  )
}

export default App
