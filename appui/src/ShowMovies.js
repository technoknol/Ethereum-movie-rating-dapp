import React, { Component } from 'react';
import './ShowMovies.css'

export class ShowMovies extends Component{
    handleChange=(movie)=>{
        let _movie=movie;
        this.props.vote(_movie)
    }

    render(){
        let movieList=this.props.movies.map((movie,i)=>
        <tr key={i}>
            <td >{movie.name}</td>
            <td>{movie.rating}</td>
            <td><button onClick={this.handleChange.bind(this,movie.hex)}>Vote up</button></td>
        </tr>)

        return(
            <div>
            <h3> Movies</h3>
            <hr />
            <table >
                <tbody>
                    <tr>
                        <th>Movie</th>
                        <th>Rating</th> 
                        <th>Vote</th> 
                    </tr>
                    {movieList}
                </tbody>
            </table>
          </div>
        )
    } 
}

export default ShowMovies;