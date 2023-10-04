import {Modal, show, Button} from 'react-bootstrap';
import React, {useState} from 'react';
const API_IMG="https://image.tmdb.org/t/p/w500";

// Props
const MovieBox = ({title, poster_path, vote_average, release_date, overview, genre_ids, genres}) => {

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return(
        <div className="card text-center bg-secondary mb-3">
            <div className="card-body">
                <img className="card-img-top" src={API_IMG+poster_path}></img>
                <div className="card-body">
                    <button type="button" className="btn btn-dark" onClick={handleShow}>View Details</button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <img className="card-img-top" src={API_IMG+poster_path}></img>
                            <h3>{title}</h3>
                            <h4>IMDB: {vote_average}</h4>
                            <h5>Release Date: {release_date}</h5>
                            <h6>Genre: {genre_ids.map(id=>genres.find(genre => genre.id === id)?.name).join(", ")}</h6>
                            <h6>Overview:</h6>
                            <p>{overview}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default MovieBox;