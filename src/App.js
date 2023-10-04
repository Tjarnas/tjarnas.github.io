import React, {useState, useEffect} from 'react';
import './App.css';
import MovieBox from './MovieBox';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, Form, FormControl, Button, Dropdown, DropdownToggle } from 'react-bootstrap';

// API Nycklar samt basURL

const BASE_URL = 'https://api.themoviedb.org/3';

const DISCOVER_MOVIE_URL = `${BASE_URL}/discover/movie`;
const SEARCH_URL = `${BASE_URL}/search/movie`;
const GENRE_URL = `${BASE_URL}/genre/movie/list`;


function App() {

  // Grundvärde vid uppdatering renderar om kompenent

  const [movies, setMovies]=useState([]);
  const [query, setQuery]=useState('');
  const [genres, setGenres]=useState([]);
  const [darkTheme, setDarkTheme]=useState(true);

  // API Hooks, urspungsdata vid första "inladdning" vilket lagras i minnet.

  useEffect(() => {
    fetch(`${DISCOVER_MOVIE_URL}?api_key=f6fce0842dd3c31d0dcf27233bd0633e`)
    .then((res)=>res.json())
    .then(data=>{
      console.log(data);
      setMovies(data.results);
    })
    fetch(`${GENRE_URL}?api_key=f6fce0842dd3c31d0dcf27233bd0633e`)
    .then((res)=>res.json())
    .then(data=>{
      console.log(data);
      setGenres(data.genres);
    })
  }, [])

  // Sökfunktionen är kopplad till formcontrol på rad 125

  const searchMovie = async(e)=>{
    e.preventDefault();
    console.log("Searching");
    try{
      const url = `${SEARCH_URL}?api_key=f6fce0842dd3c31d0dcf27233bd0633e&query=${query}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setMovies(data.results);
    }
    catch(e){
      console.log(e);
    }
  } 

  // Filterfunktionen som är kopplad till eventlistner 

  const filterByGenre = async(genreId) => {
    try{
      const url = `${DISCOVER_MOVIE_URL}?api_key=f6fce0842dd3c31d0dcf27233bd0633e&with_genres=${genreId}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setMovies(data.results);
    }
    catch(e){
      console.log(e);
    }
  }

  // sorteringsfunktion kopplad mot eventlistener

  const sortBy = async(type, direction) => {
    try{
      const url = `${DISCOVER_MOVIE_URL}?api_key=f6fce0842dd3c31d0dcf27233bd0633e&sort_by=${type}.${direction}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setMovies(data.results);
    }
    catch(e){
      console.log(e);
    }
  }

  // Sparar inputfältet i state

  const changeHandler=(e)=> {
    setQuery(e.target.value)
  }

  return (
    <>
    <Navbar bg={darkTheme ? "dark" : "light"} expand="lg" variant={darkTheme ? "dark" : "light"}>
      <Container fluid>
        <Navbar.Brand href="/home">PopcornPix</Navbar.Brand>
        <Navbar.Brand href="/home">Trending</Navbar.Brand>
        <Dropdown>
          <DropdownToggle variant="secondary">
            Filter
          </DropdownToggle>
          <Dropdown.Menu>
            {genres.map(genre => <Dropdown.Item key={genre.id} onClick={()=>filterByGenre(genre.id)}>{genre.name}</Dropdown.Item>)}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <DropdownToggle variant="secondary">
            Sort
          </DropdownToggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={()=>sortBy("primary_release_date", "asc")}>Release Date Ascending</Dropdown.Item>
            <Dropdown.Item onClick={()=>sortBy("primary_release_date", "desc")}>Release Date Descending</Dropdown.Item>
            <Dropdown.Item onClick={()=>sortBy("vote_average", "asc")}>Rating Ascending</Dropdown.Item>
            <Dropdown.Item onClick={()=>sortBy("vote_average", "desc")}>Rating Descending</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Navbar.Toggle aria-controls="navbarScroll"></Navbar.Toggle>
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-3" style={{maxHeight:'100px'}} navbarScroll></Nav>
            <Form className="d-flex" onSubmit={searchMovie}>
            <Form.Check
                type={"switch"}
                id={`default-${"switch"}`}
                label={`Dark/Light Theme`}
                style={{color: darkTheme ? "white" : "black"}}
                checked={darkTheme}
                onChange={(e)=> setDarkTheme(e.target.checked)}
              />
              <FormControl type="search" placeholder="Movie Search" className="me-2" aria-label="search" name="query" value={query} onChange={changeHandler}></FormControl>
              <Button variant="secondary" type="submit">Search</Button>
            </Form>
          </Navbar.Collapse>
      </Container>
    </Navbar>
    <div>
      {movies.length > 0 ? (
        <div className="container">
          <div className="grid">
            {movies.map((movieReq) =>
            <MovieBox key={movieReq.id} genres={genres} {...movieReq} />)}
          </div>
        </div>):(
          <h2>Sorry! This movie could not be found</h2>
        )}
    </div>
    </>
  );
}

export default App;