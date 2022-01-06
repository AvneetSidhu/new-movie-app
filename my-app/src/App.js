import React from 'react'
import Register from './components/registerPage';
import Landing from './components/landingPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './components/homePage';
import MoviePage from './components/moviePage';
import Nav from './components/nav';
import Watchlist from './components/watchList';


function App() {


  return (
    <div className="App">

      <Router>
        <Nav />
        <Routes>
          <Route name="moviePage" path="/movie/:movieID" key={new Date().getTime()} exact element={<MoviePage />} />
          <Route name="Landing" path="/" key="Landing" exact element={<Landing />} />
          <Route name="register" path="/register" key="register" element={<Register />} />
          <Route name="home" exact path="/home" key="home" element={<Homepage />} />
          <Route name="watchlist" path="/watchlist" key="watchlist" element={<Watchlist />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
