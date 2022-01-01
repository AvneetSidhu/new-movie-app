import React from 'react'
import Register from './components/registerPage';
import Landing from './components/landingPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './components/homePage';



function App() {

  
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route name="Landing" path="/" key="Landing" exact element={<Landing/>}/>
            <Route name="register" path="/register" key="register" element={<Register/>}/>
            <Route name="home" path="/home" key="home" element={<Homepage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;