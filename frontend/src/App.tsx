import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'

import './App.css'

function App() {

  return (
    <div className='selection:bg-green-200'>
        <BrowserRouter>
            <Routes>
                <Route path='/signup' element={<Signup />}> </Route>
                <Route path='/signin' element={<Signin />}> </Route>
                <Route path='/blog/:id' element={<Blog />}> </Route>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
