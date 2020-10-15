import React, { Component } from 'react';
import RatingForm from '../RatingForm/RatingForm';
import PropTypes from 'prop-types';
import './ShowPage.css';
import { singleMovieFetch, getAllRatings, deleteUserRating } from '../apiCalls.js';

class ShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
    }
  }

//iterate through App.userRatings to find the rating for the current movie??


// this will be run passing in props instead of running it on the promise.
  findUserRating = () => {
    let ratingObj = this.props.userInfo.userRatings.find(rating => {
      return rating.movie_id === this.state.movie.id;
    })
    if(!ratingObj) {
      this.setState({userMovieRating: 'Rate this movie!'});
    } else {
      this.setState({userMovieRating: ratingObj.rating});
    }
    // if(!props.userInfo.id) {
    //   return "log in please";
    // } else if(!ratingObj.rating) {
    //   return 'Rate this movie';
    //
    //   })
    //   return ratingObj.rating;
    // }
  }

  // iterate through props.userInfo.userRatings

  deleteRating = (event) => {
    event.preventDefault();
    let userID = this.props.userInfo.id;
    let ratingID = this.state.userRating.id;
    this.deleteFromApi(userID, ratingID);
  }

  deleteFromApi = (userID, ratingID) => {
    deleteUserRating(userID, ratingID)
    .then(data => this.setState({userRating: {}}))
    .catch(error => this.setState({error: error.message}))
  }


  componentDidMount() {
    singleMovieFetch(this.props.id)// HARD CODED ID
      .then(data => this.setState({movie: data.movie}))
      .then(data => this.findUserRating())
      .then(data => this.displayGenres())
      .catch(error => console.log({error: error.message}))
  }

  displayGenres = () => {
    let allGenres
    if(this.state.movie) {
      allGenres = this.state.movie.genres.map(genre => {
        return <li>{genre}</li>
      })
    }
    this.setState({genreElements: allGenres});
  }

  render() {
    const film = this.state.movie;
    return (
      <main>
        <section className='title-section'>
          <h1>{film.title}</h1>
          <h2>{film.tagline}</h2>
          <h2>{film.overview}</h2>
        </section>
        <section className='info-section'>
          <h2>{film.release_date}</h2>
          <h2>{film.budget}</h2>
          <h2>{film.revenue}</h2>
          <h2>{film.runtime}</h2>
          <h2>{film.average_rating}</h2>
          <ul>
            {this.state.genreElements}
          </ul>
        </section>
        <section> {this.props.userInfo.id && <h2>User Rating: 
          {this.state.userMovieRating}</h2>}
        </section>
        <section> {this.props.userInfo.id && <button onClick={this.deleteRating}>Delete Rating</button>}
        </section>
        <section>
        {this.props.userInfo.id && !this.state.userRating &&
          <RatingForm
          movieInfo={this.state.movie}
          userInfo={this.props.userInfo}
          />
        }
        </section>
      </main>
    )
  }
}

export default ShowPage;
//refactor film genres organization
