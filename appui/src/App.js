import React, { Component } from 'react';
import './App.css';
import { ratingContract } from "./EthereumSetup";
import logo from './ethereum-logo.png';
import { ShowMovies } from "./ShowMovies";
import {Movies} from './Movies'

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      movies : 
          Movies.map(movie => { return {name: movie, rating:0} }) 
      // [{name:'Don',rating:0},{name:'race',rating:0}]
    }
    this.handleVoting=this.handleVoting.bind(this)
  }

strTohex(movie)  {
    for (var e = movie, a = "", t = 0; t < e.length; t++)
        a += "" + e.charCodeAt(t).toString(16);
    return '0x'+a;
}


componentWillMount() {
  this.setState({movies:this.state.movies.map(
    (el)=> Object.assign({},el,{hex: this.strTohex(el.name)}):el
  )});

}

// const movieNames = ["Don", "Race"].map(function (movie) { return strTohex(movie) }) ;

handleVoting(movie){
  debugger
    // movie = this.strTohex(movie)
    ratingContract.voteForMovie(movie)
    let votes=ratingContract.totalVotesFor(movie).toNumber()
    console.log('votes', votes)
    this.setState({movies:this.state.movies.map(
      (el)=>el.hex===movie? Object.assign({},el,{rating:votes}):el
    
    )});
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Ethereum</h1>
        </header>
        <p className="App-intro">
          Movie Rating Application in Ethereum and React
        </p>
        <div className="movie-table">
          <ShowMovies movies={this.state.movies} vote={this.handleVoting}/>
        </div>
      </div>
    );
  }
}

export default App;
