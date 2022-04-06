import React, { Component } from 'react';
import { getMovies } from "../services/fakeMovieService";
import Like from './common/like';
import Pagination from './common/pagination';

class Movies extends Component {
    state = { 
        movies: getMovies(),
        pageSize: 4,
     } 

     handleDelete = movie => {
         const movies = this.state.movies.filter(m => m._id !== movie._id);
         this.setState({movies})
     };
     
     handleLike = movie => {
        const new_movies = [...this.state.movies]
        new_movies[new_movies.indexOf(movie)].liked = !new_movies[new_movies.indexOf(movie)].liked;
        this.setState({new_movies})
     };

     handlePageChange = (page) => {
         console.log(page);
     }

     renderMovies(){

        if (this.state.movies.length === 0) return


         return <React.Fragment>
             <table className='table'>
                 <thead>
                     <tr>
                         <th>Title</th>
                         <th>Genre</th>
                         <th>Stock</th>
                         <th>Rate</th>
                         <th></th>
                         <th></th>
                     </tr>
                 </thead>
                 <tbody>
                     {
                        this.state.movies.map(movie =>
                            <tr key={movie._id}>
                                <td>{movie.title}</td>
                                <td>{movie.genre.name}</td>
                                <td>{movie.numberInStock}</td>
                                <td>{movie.dailyRentalRate}</td>
                                <td>
                                    <Like liked={movie.liked} onClick={() => this.handleLike(movie)}/>
                                </td>
                                <td>
                                    <button onClick={() => this.handleDelete(movie)}
                                        className='btn btn-danger btn-sm'>
                                            Delete
                                    </button>
                                </td>
                            </tr>
                            )
                     }
                 </tbody>
             </table>
             <Pagination 
              itemCount = {this.state.movies.length} 
              pageSize = {this.state.pageSize}
              onPageChange={this.handlePageChange} />
         </React.Fragment>
     }

     renderSentence(){
        if (this.state.movies.length === 0) return "There are no movies in the database."

        return <p>Showing {this.state.movies.length} movies in the database.</p>;
     }



    render() { 
        return (
        <React.Fragment>
            {this.renderSentence()}
            {this.renderMovies()}
        </React.Fragment>
         );
    }


}
 
export default Movies;