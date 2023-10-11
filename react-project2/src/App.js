import './App.css';
import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Homepage, MoreGenre, Main, Tournament, Winner, Loginpage, Likemovie, Account } from './pages'

class App extends Component {
  homeMenu = [
    {url: '/home', name: 'Homepage'},
    {url: '/more', name: 'MoreGenre'},
  ]

  state = {
    open: false
  }


  render(){
    return (
      <div className="App">
        <Routes>
          <Route exact path='/' element={<Main/>}/>
          <Route exact path='/account' element={<Account/>}/>
          <Route exact path='/tournament' element={<Tournament/>}/>
          <Route exact path='/result' element={<Winner/>}/>
          <Route exact path='/home' element={<Homepage/>}/>
          <Route exact path='/more' element={<MoreGenre/>}/>
          <Route exact path='/login' element={<Loginpage/>}/>
          <Route exact path='/like' element={<Likemovie/>}/>
        </Routes>
      </div>
    );

  }
}

export default App;
